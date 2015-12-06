<!-- 
.. title: Working with Windows
.. slug: working-with-windows
.. date: 2013-06-10 07:41:33 UTC-05:00
.. tags: windows, tutorial, productivity
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
So, you're working with windows, either by choice (wait. what?) or force (gah, somebody else making computer purchase decisions), and you're a programmer. Not just any programmer, a terminal acolyte that's chosen sides on the great vi/emacs holy war. I'll be blunt, that first sign-on is <strong>painful</strong>. But hey, the world keeps turning and it's best to stay on top of technology. Here's how I've adjusted, with the all the steps (minus getting vim happy) coming from my Windows trailblazing amigo <a href="https://twitter.com/dan_mcclary‎">Dan McClary</a>.
</p>

<!-- TEASER_END -->

<h3>First things, get a dang terminal</h3>
<p>
And not just powershell, in no way does that even come close to being correct.  What you'll need to get is <a href="www.cygwin.com">Cygwin</a>.  It will download and you'll be left with a setup.exe file that will install it for you.  Now here is where things get weird coming from a Linux standpoint, that setup.exe file combined with the folder it makes for the source from a mirror is (essentially) the package manager for Cygwin. <strong>Weird</strong>. So if you are like me and like clean folders, don't delete either of them.  You'll just have to download them again later when you need to change what packages to install.
</p>

<p>
Now, let's pick what to install.  I went through this process maybe three times, each time missing packages that I needed.  So I did this really dumbly, I installed everything <strong>except</strong> for python. Whatever you do, don't install python (for our purposes). We're going to get python from a different source later and this one will actually play nicely outside of Cygwin.  That's important just to hedge our bets really.  A lot of IDEs and other software will expect that if we have python it came from a general installation and not Cygwin, so they will not find anything if they go looking for it.  Why not just install both?  Because less headaches are good.
</p>

<h3>Now let's get a prettier terminal</h3>
<p>
Why are we getting a different terminal? Because Cygwin is about as feature rich as a a piece of coal (no tabs, no nothing, but at least it exists!).
With windows there is essentially only one option, <a href="http://sourceforge.net/projects/console/">Console2</a>.  I'm not about to say I'm in love with it, because I'm really not (you'll see why in the vim section), but it's much better than Cygwin. It has tabs, you can change what it looks, all the important basics.  Just download and place the exe somewhere, it doesn't even install. Open it up and don't be afraid, by default it goes directly to the windows command line. Just follow <a href="http://blog.quibb.org/2011/11/configuring-console2-with-cygwin/">this</a> to set up a shell with cygwin.
</p>

<h3>Finally, let's get la lingua python</h3>
<p>
So we didn't get python from Cygwin so that it can be used all over Windows, so now let's get the official installer from <a href="http://www.python.org/getit/windows/">Python</a>. If we were on LInux or OS X we would start using pip to install the rest of the packages (highly recommended instead of using ports on OS X), but that really isn't the way to go on WIndows with the scientific packages that are very dependent on being compiled correctly. We can easily get all of those packages from this <a href="http://www.lfd.uci.edu/~gohlke/pythonlibs/">site</a>. My unofficial list of packages is: numpy, scipy, sympy pandas, pandasql, and pip. All good gets. The rest can be pretty easily installed with pip.
</p>

<h3>Can we edit things yet?</h3>
<p>
In vim. Of course, because everyone <strong>loves</strong> to edit in vim. Vim is of course in Cygwin, which means that it'll also be Console2 and it can be used their right away. It even takes in the vimrc and .vim/ from our default user directory in Cygwin. But there's just one massive problem.
</p>

<p>
You use NERDTree, have multiple buffers open in a single window, and use multiple tabs, right? It starts with the key command <CTRL + W> then the directional letter of the buffer to move to. In Windows, <CTRL + W> closes the window and both Cygwin and Console2 respect that. So every time I tried to move between buffers my entire tab full of work was unceremoniously and immediately closed. Big damn problem, but not enough to tell anyone else I knew and get derided for not using emacs.
</p>

<p>
We have to look deeper and there is a really simple answer. Install <a href="http://www.vim.org/download.php#pc">gVim</a>.  Yes, it's not on the command line, but Console2 isn't perfect anyways. We'l actually even want to use gVim instead of the Vim app because gVim can be fully maximized and Vim can't be for some reason. Now, here was the weird thing that shook me up. These apps use your Windows home directory ("C:/Users/[USERNAME]/") instead of the Cygwin home directory, which is easy enough to solve. Just copy over our configuration from the Cygwin home directory and start the app back up again. But gVim still wouldn't load modules using pathogen for me. Turns out that in windows the .vim/ directory isn't called that, but is instead called vimfiles/.  Just renaming the directory takes care of everything and we have an awesome working Vim!
</p>


<h3>Now let's get spoiled</h3>
<p>
Task launcher and multiple desktops. The task launcher is essential, I'm using <a href="www.launchy.net/‎">Launchy</a>. It really only does applications (so it won't pick up Console2) but it is responsive.  I tried others but they brought my underpowered desktop to its knees. I also used Dexpot to get multiple workspaces, but it is really just a hack in Windows.  It's nice to have, but it still doesn't feel like it does on OS X
</p>

<strong>Well, that's it.</strong> Hope that's enough to get you going and happy Windows'ing.
