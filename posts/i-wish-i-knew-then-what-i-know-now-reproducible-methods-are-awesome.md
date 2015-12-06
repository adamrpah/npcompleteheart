<!-- 
.. title: I wish I knew then what I know now (reproducible methods are awesome!)
.. slug: i-wish-i-knew-then-what-i-know-now-reproducible-methods-are-awesome
.. date: 2014-04-17 08:01:36 UTC-05:00
.. tags: development, code, python, productivity
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>I started working in computational research with no meaningful experience. I spent two years in high school &#8220;programming&#8221; in C++ on a Windows 98 machine with an <span class="caps">IDE</span> that made the programs run (sometimes) through what must have been magic. The past five years have been a constant refinement of the computational research process for me and I've been wanting to write it all down for awhile now so others could learn from it (for those that are curious, I've learned most of my tricks from blogs written by others). </p>

<p>There are a number of points that I want to hit on in the future but for now  I want to focus on:</p>

<ul>
        <li>Creating a standard library</li>
        <li>Record-keeping and on the fly analysis</li>
</ul>

<h3>A standard library</h3>

<p>When I first started programming libraries were so <strong>damn</strong> impressive. The capabilities and sheer amount of code obfuscated from me made them seem as monolithic as the programming language itself. After a little while it becomes obvious that libraries put on their coding pants one leg at a time just like we do (spoiler to newbies). What&#8217;s the point of this interlude? To convince you to start buidling your own general purpose &#8220;library&#8221;.</p>

<!-- TEASER_END -->

<p>There are many repetitive tasks, many that only take a line or two of code, such as parsing certain types of files that we willing type whenever the need arises. This isn&#8217;t really bad behavior, but it would be better to put these helper functions in a single place so that they can be called from anywhere (such as an interactive terminal or notebook session) and so that when we encounter a new feature we can add it into our code. Even more important is when we write more complicated functions or process data. With a standard function it&#8217;s easier to justify putting more time into testing the function and we never have to worry about slightly different processing based on fuzzy memory.</p>

<p>So what does this look like in practice? I made myself a &#8220;library&#8221; called <span class="caps">GALE</span> (&#8220;General Analytical Library Extensions&#8221; for the curious) and the structure is:</p>

<pre><code>| GALE/
|-&#62; .hg/
|-&#62; gale/
|--&#62; __init__.py
|--&#62; functional_domain/
|---&#62; __init__.py
|---&#62; function.py
</code></pre>

<p>Why the double naming convention? Because I wanted to import with the gale name and have the name preserved in the repository so that it&#8217;s consistent even if I forget to name it properly when I clone it on a new machine. Otherwise, the structure is simple&#8212;-inside gale there are folders for a domain of code and then appropriately named python files containing functions are stored within those folders (and the <i>init</i>.py files so that it&#8217;s all importable). As an example, since I&#8217;m  working with patient Electronic Health Records now I have inside gale a folder like so:</p>

<pre><code>|-&#62; gale/
|--&#62; medical/
|---&#62; icd9Formatter.py
</code></pre>

<p>The icd9Formatter file has all of the functions I use to translate ICD-9 codes to different ontologies or parse/clean the codes into a consistently readable format that my other modules will know how to use.</p>

<p>To make these code files useful everywhere we just need to add the library to our python path, which is easily accomplished by adding:</p>

<pre><code>export PYTHONPATH=$PYTHONPATH:/Your/Path/To/GALE
</code></pre>

<p>to our .bashrc file. After opening a new terminal or typing `source ~/.bashrc` this code will be accessible in any other program or interactive interpreter just by typing:</p>

<pre><code>import gale.medical.icd9Formatter as icdf
</code></pre>

<p>To help paint the picture a little more completely this is the list of domains that I currently have in my library:</p>

<pre><code>drwxr-xr-x  7 adampah  staff   238B Apr  3 10:39 databases
drwxr-xr-x  8 adampah  staff   272B Apr  3 10:39 fileIO
drwxr-xr-x  5 adampah  staff   170B Mar 16 21:52 general
drwxr-xr-x  4 adampah  staff   136B Mar 16 21:52 graphMaths
drwxr-xr-x  3 adampah  staff   102B Mar 16 21:52 graphs
drwxr-xr-x  6 adampah  staff   204B Apr  8 10:42 medical
drwxr-xr-x  4 adampah  staff   136B Apr  8 10:42 networks
drwxr-xr-x  3 adampah  staff   102B Mar 16 21:52 settings
drwxr-xr-x  6 adampah  staff   204B Apr  7 20:33 stats
drwxr-xr-x  4 adampah  staff   136B Mar 16 21:52 timeseries
</code></pre>

<p>But this should all change based upon the type of research that you do. The key here is to not worry about writing a perfect function that will be as useful today as it will be in 20 years. The real value lies in just starting quickly and getting something down. After starting it&#8217;s much easier to get into the habit of adding simple helper functions to this central library than to keep building it into individual code pieces. <span class="caps">DRY</span> principles are great, letting ourselves be lazier while simultaneously being more productive is best (even better now this code can travel with you everywhere, on any computer, and always be accessible). </p>

<h3>Record-keeping and on-the-fly analysis</h3>

<p>Why on god&#8217;s green earth would these two subjects go together you ask? Because, as pythonistas, we will use the same damn tool for both, that&#8217;s why. Enter iPython Notebooks.</p>

<p>iPython Notebooks are finally ready for primetime in general usage I think. Why?</p>

<ul>
        <li>It has the ability to traverse directory structures now (iPython notebooks can be put in with</li>
</ul>
a repository now without starting up multiple notebook servers)
<ul>
        <li>Interactive features are compelling</li>
        <li>Accessibility and easy to show others</li>
</ul>

<p>iPython Notebook can come with iPython, or you might have to install it as a separate install  (all depends on how you decide to install it and your operating system. In any case you can start it up just by going `ipython notebook` on the command line. The service will start up and if you navigate your browser to http://localhost:8888 you will find the directory page. Here you can start a new notebook in any folder and it will open in a new browser. You can do just about anything that you want in these  active notebooks and some great examples can be found at the [github](https://github.com/ipython/ipython/wiki/A-gallery-of-interesting-IPython-Notebooks) page for ipython.  Next you can set up iPython notebooks on a desktop to be accessible (and password protected! make sure to do that part too!) from anywhere following this tutorial from [Thomas Sileo](http://thomassileo.com/blog/2012/11/19/setup-a-remote-ipython-notebook-server-with-numpyscipymaltplotlibpandas-in-a-virtualenv-on-ubuntu-server/). If you want to use a virtual environment you can follow the instructions exactly, or you can just skip that part and just let ipython notebook to use the system installed packages.</p>

<p>One last thing. I have been a real believer of using “in-line” images with the notebooks instead of having it pop up an interactive plot of the graph (the way matplotlib does typically from the command line). The primary reason is that after the graph is generated once it will remain in the notebook, even if it is shut down. That way you can close/shut down a notebook and when you open it again the graph will still be there. This makes it much more like a “real” lab notebook and allows for quick reference.  To do this we need to generate a notebook configuration file, from the command line we do this as:</p>

<pre><code>$ ipython profile create
</code></pre>

<p>In the output of this command it will tell you where it is storing your configuration files (changes based on operating system). Now edit the ‘ipython_notebook_config.py’ file which should be located at:</p>

<pre><code>~/.ipython/profile_default/
</code></pre>

<p>Then change line 258 from </p>

<pre><code># c.IPKernelApp.matplotlib = ‘’
</code></pre>

<p>to </p>

<pre><code>c.IPKernelApp.matplotlib = ‘inline’
</code></pre>

<p>Voila!</p>

<p>Now, why is an iPython notebook so great? There&#8217;s a few reasons:</p>

<ul>
        <li>Access your workstation from anywhere, with the same installed packages</li>
        <li>In-line plotting/analysis of data without having to run an X session (interactive X will frequently time out on me over long sessions, so I&#8217;ll need to start up a new connection to re-enable it)</li>
        <li>Ability to use bash commands, python, R, and many other languages simultaneously if configured properly</li>
        <li>Easy to show work to others</li>
        <li>Switch between code blocks and markdown blocks. This is important, in markdown blocks you should be ideally writing <strong>why</strong> you are doing this research and what the analysis is. You can also include the commands or code used to generate the data that you are manipulating quickly.</li>
        <li>Embed images just like on any other web page. So even if you don&#8217;t generate images with matplotlib you can embed them in the notebook just using regular html. This makes it easy to keep track of results and important files from your analysis.</li>
        <li>Ability to very quickly do analysis, especially when you import functions from your standard library to quickly handle data manipulation!</li>
</ul>

<p>All in all, iPython notebook has really come of age. The only thing it&#8217;s really missing at this point is robust support for multiple users on a single notebook instance.</p>
