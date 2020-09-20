.. title: Gephi on OS X
.. slug: gephi-osx
.. date: 2015-12-01 21:49:55 UTC-06:00
.. tags: gephi
.. category: 
.. link: 
.. description: 
.. type: text

# So you're having some minor issues with Gephi on OS X?

Well thankfully it's not just me then. Most of you probably have a PC, in which case you won't have
any issues running Gephi at all. But if you "think different" like me (remember that ad campaign)
and have a Mac with an operating system of OS X 10.9, 10.10, or 10.11 Gephi won't start for you. The
fix is the same no matter what your operating system version is, so you won't even need to check.

The reason why this doesn't work is because the Mac operating system has moved to a more recent
version of Java (which is a programming language) and Gephi expects an older version. Fortunately,
it's a pretty easy, generally foolproof, fix if you follow the instructions
[here](http://sumnous.github.io/blog/2014/07/24/gephi-on-mac/).

**Step 1** Download [Gephi 0.8.2-beta](http://gephi.github.io)

**Step 2** Download and install Java 1.6 [here](http://support.apple.com/kb/DL1572)

**Step 3** Open the terminal application. If you navigate to `Applications` and then `Utilities` you
will see it there.

**Step 4** Delete the settings directory by copying, pasting, and executing this command in terminal. <br/>
`rm -r ~/Library/Application\ Support/gephi`

**Step 5** Find your java home location by copying, pasting, and executing this command in terminal.  <br/>
`/usr/libexec/java_home -v 1.6`

**Step 6** Now execute this command in terminal, it will add this new java home location to the
gephi configuration file. <br/>
`echo "jdkhome=\"$(/usr/libexec/java_home -v 1.6)\"" >> /Applications/Gephi.app/Contents/Resources/gephi/etc/gephi.conf`

**Step 7** Start Gephi and open the Les Miserables sample file. In the top toolbar of the program
there is a button called `Overview`, if you click it you should see a network.

**Step 8** Next click the button in the top toolbar labelled `Preview`. On the Preview screen at the
bottom there is a button labelled `Refresh`, click it. You should see a very nicely drawn network on
the screen now. 
