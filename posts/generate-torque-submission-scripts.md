<!-- 
.. title: Generate torque submission scripts
.. slug: generate-torque-submission-scripts
.. date: 2014-06-07 09:34:11 UTC-05:00
.. tags: code, hpc, python, tutorial
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
Most of us use some form of Torque in an academic environment to run scripts on a cluster. Typically I would have some form of script to generate the necessary qsub scripts for submission, but it wasn't ever generic enough. So this has been my working stab at making that happen. 
</p>

<!-- TEASER_END -->

<p>
Here is how it works, say that you have a program called "cure_cancer.py" that you want to run on the cluster that takes no arguments. All you would do is type:

<pre>
$ generate_qsub cure_cancer.py
</pre>

and then it will generate some file like:

<pre>
$ ls
qsub_cure_cancer_897234.sh
</pre>

that can be submitted on a cluster normally like:

<pre>
$ qsub qsub_cure_cancer_897234.sh
</pre>
<p>

<h4>
Basic submission with arguments
</h4>
<p>
But what if your script needs an argument, like the filename it should read in?  Simple enough actually.

<pre>
$ generate_qsub cure_cancer.py whole_lotta_cancer.csv
</pre>

The script supports an arbitrary number of command arguments, they just have to follow after the program name, be in the correct order for your script, and not contain spaces (REPEAT, NO SPACES IN FILENAMES). Pretty simple. 
</p>

<h4>
Basic submission with keyword arguments
</h4>
<p>
Sometimes we write a program with options to make something more flexible. So we could add to our cancer program to change the parameters of the model like so:
<pre>
$ python cure_cancer.py --alpha 0.5 --beta 0.3
</pre>
The qsub generation script supports that too! You just have to tell it so, like:
<pre>
$ generate_qsub cure_cancer.py --kwargs '{"alpha": 0.5, "beta":0.3}'
</pre>
It just needs to be the name that is given with the '--' option (so no single letters). Also, you can of course use the additional keyword arguments with command line arguments like so:
<pre>
$ generate_qsub cure_cancer.py whole_lotta_cancer.csv --kwargs '{"alpha": 0.5, "beta":0.3}'
</pre>
That's the end of the basic usage. The generation script automatically recognizes the script type and can differentiate between python and bash.
<p>

<h4>
Advanced (Options usage)
</h4>
<p>
There are three additional options to the script that are slightly more advanced. They are: 
<ul>
<li>"--home_repl"</li>
<li>"--execute"</li>
<li>"--temporary"</li>
</ul>
</p>

<p>
How to use them:
<ul>
<li>--home_repl<br/>
Allows you to do a custom replacement of the "home" address when specifying where the qsub script should say it executes/errors should be placed.
This is great when you're creating the qsub script on a computer that doesn't share the same structure as the cluster (i.e. if you're like me and create the qsub on your laptop or you have a different cluster that you'll execute the file on). Its usage is pretty simple:
<pre>
$ generate_qsub cure_cancer.py --home_repl /home/visitors/adampah/
</pre>
</li>

<li>--execute
<br/>
After generating the file it will automatically add the job to the queue. This option can only be used when you generate the file on the cluster. Also, please run it dry at least once if you're planning to batch submit a large number of jobs
</li>

<li>
--temporary
<br/>
Deletes the generated qsub file, can only be used with the execute option. For those that don't want file cruft.
</li>
</ul>
</p>


<p>
So here is the code!

<pre>
#!/usr/bin/env python

'''
File: qsub_generator.py
Author: Adam Pah
Description: 
Generates a qsub file for a program to aid in job submission to 
a torque scheduler.

Usage is:
    qsub_generator.py program_file optional_arg1 optional_arg2 --kwargs '{"string":"dictionary","on":"command_line"}'
'''

#Standard path imports
from optparse import OptionParser
import os
import sys
import json
import random

#Non-standard imports

#Global directories and variables

qsub_text='''
#! /bin/bash
#PBS -d %s/
#PBS -e %s/%s.error
#PBS -o %s/%s.out
#PBS -N %s
#PBS -q low

%s
'''

def write_qsub_file(current_dir, wfname, wfpartial, commandLine, opt):
    '''
    Writes a qsub file given the generated contents and makes it executable
    '''
    wfile = open(wfname, 'w')
    print >> wfile, qsub_text % (current_dir,
                                 current_dir,
                                 wfpartial,
                                 current_dir,
                                 wfpartial,
                                 wfpartial,
                                 commandLine)
    wfile.close()
    #Change the permissions  
    os.chmod(wfname, 0755)
    #Do the hacking, execute and possibly delete the file
    if opt.execute:
        os.system('qsub %s' % wfname)
        if opt.temporary:
            os.system('rm %s' % wfname)

def generate_command_line(fname, fext, cmd_args, cmd_kwargs):
    '''
    Generates the bash script
    '''
    commandLine = '' 
    #Get the correct starting command
    if fext:
        if fext=='.py':
            commandLine += 'python '
        elif fext=='.sh':
            commandLine += 'bash '
        else:
            commandLine += './'
        #append the program name
        commandLine += fname + fext
    else:
        commandLine += './' + fname
    #Add the program arguments
    if cmd_args:
        commandLine += ' ' + ' '.join(cmd_args)
    if cmd_kwargs:
        for k,v in cmd_kwargs.items():
            commandLine += ' --'+str(k)+' '+str(v)
    return commandLine

def pull_current(opt):
    '''
    Pulls the current directory with home path substition if one is given in as opt.home_repl
    '''
    current_dir = os.getcwd()
    if opt.home_repl:
        if opt.home_repl != current_dir[:len(opt.home_repl)]:
            current_dir = os.path.join(opt.home_repl, current_dir.lstrip(os.environ['HOME']))
    return current_dir

def generate_savename(fname, fext):
    '''
    Generates the filename to save the qsub script to
    '''
    obstructed_filename = True
    while obstructed_filename:
        wfpartial = '%s_%d' % (fname, random.randint(0, 9999999))
        wfname = 'qsub_%s.sh' % wfpartial
        if not os.path.exists(wfname):
            obstructed_filename = False
    return wfname, wfpartial

def main(args, opt):
    '''
    Main function for calling.
    '''
    #Separate the program arguments from the input arguments
    cmd_args, cmd_kwargs = [], []
    if len(args)>1:
        cmd_args = args[1:]
    if opt.kwargs:
        cmd_kwargs = json.loads(opt.kwargs)
    #Get the current directory, modify it if a different home is set
    current_dir = pull_current(opt)
    #The executing scripts name
    fname, fext = os.path.splitext(os.path.basename(args[0]))
    wfname, wfpartial = generate_savename(fname, fext)
    commandLine = generate_command_line(fname, fext, cmd_args, cmd_kwargs)
    write_qsub_file(current_dir, wfname, wfpartial, commandLine, opt)

if __name__ == '__main__':
    usage = '''%prog qsub_generator.py program_file optional_arg1 optional_arg2 --kwargs '{"string":"dictionary","on":"command_line"}' '''
    parser = OptionParser(usage = usage)
    parser.add_option('--kwargs', action='store', default=None,
                      help="String dictionary of keyword arguments to submit to program")
    parser.add_option('--home_repl', action='store', default=None,
                      help="path to replace up to the user directory with")
    parser.add_option('--execute', action='store_true', default=False,
                      help="Submits qsub script immediately after creation. Only use if on cluster")
    parser.add_option('--temporary', action='store_true', default=False,
                      help="Removes the qsub script immediately after submitting with the --execute option")
    (opt, args) = parser.parse_args()
    #Check that temporary isn't used without execute
    if opt.temporary and not opt.execute:
        print >> sys.stderr, "--temporary option is meant to be used with --execute option.\n" + \
                             "Otherwise I would just generate and then delete files immediately, doing nothing.\n" + \
                             "Continuing, but not respecting your choice and deleting the file."
    #There must be an initial argument or else this ship is sunk
    if len(args)<1:
        m='''Must have a program name to use as the argument for the qsub file.\n''' + \
          '''If the file has no extension then it will be submitted as an executable.'''
        print >> sys.stderr, m
        sys.exit()
    main(args, opt)
</pre>
</p>
