<!-- 
.. title: Computers are not magical things, but at times they are beyond temperamental creatures
.. slug: computers-are-not-magical-things-but-at-times-they-are-beyond-temperamental-creatures
.. date: 2013-01-23 13:26:13 UTC-05:00
.. tags: osx
.. category: 
.. link: 
.. description: 
.. type: text
-->

I upgraded to OSX Lion over winter break (a post about which was supposed to be written forever
ago), but I finally have come back to it. Upgrading has been completely obnoxious. If it weren't for
how much I really need effective password management software (1Password, for what it is worth), I
would have downgraded to Snow Leopard immediately. This is just a short collection of the fixes that
I've done since switching (or what I can remember of them).

<!-- TEASER_END -->

**Adobe and the lack of printing** This is the simplest fix, do you use CS3 and it now will not print
(and it crashes when it does)? This is actually easily fixed. All you have to do is delete the Adobe
PPDs from the following folders:

    /Library/Printers/PPDs/contents/Resources/en.lproj/
    /Library/Printers/PPDs/contents/Resources/ko.lproj/
    /Library/Printers/PPDs/contents/Resources/Ja.lproj/
    /Library/Printers/PPDs/contents/Resources/Zh_CN.lproj/
    /Library/Printers/PPDs/contents/Resources/Zh_TW.lproj/

[Credit Where Credit is Due](http://forums.adobe.com/message/3870055)

**MacFuse/MacFusion and the lack of 64-bit support** I've been using MacFuse with MacFusion for a long
time now in order to do file system mounting over ssh (if you're not familiar with this concept it's
awesome, you mount a remote directory over ssh and it's just like it was there locally). Now at some
point MacFuse, as it was, was no longer developed for the newer versions of OS X. There are two ways
around this, the first I found on a forum and required downloading 3 files to 'fix' Fuse. This is
not the optimal solution, because there is some odd behavior in file management when not using the
command line (GUI programs would be unable to save to anything but a new file handle). The better
solution is to download the new OS X Fuse . It works awesome, just as MacFuse used to.

**RVM and X Code** Using Ruby version manager is wonderful; however, it and the packages definitely did
not agree with the lion upgrade. The biggest reason is because of the switch to llvm-gcc instead of
gcc. This was actually a pretty easy (and completely awesome to learn fix), somebody actually went
and got plain old gcc for OS X. This actually makes it so that you don't need to install X Code to
get everything working (Saving 1GB of downloading) but you will probably have to download it
anyways. They're hosting it on GitHub . So far, I consider this the best thing ever. You just need
to set it now as the default gcc compiler and now packages will magically install again.

**MacPorts, X Code, and so many head bashing moments** Now this was the worst part of the process (and
what I put off for 3 months). MacPorts needs to be completely redone and upgraded to work in Lion.
This wouldn't be nearly as bad, if it didn't involve uninstalling everything that was installed to
begin with. Absolutely, make sure that you have the time to do this. The basic steps are all outline
on the MacPorts Migration page. The even better part is that the automatically reinstall script does
work, so don't bother doing this again by hand. However......

This all relies on X code working (ah ha, you know how I said you'll have to download anyway?). So
now that X Code is at version 4.3 in the Mac App Store, which is the only place to get it now, it
actually installs when you 'purchase' it there (it used to not prior to version 4.3). But installing
it isn't good enough, you have to also download the command line tools. This is found in the
'Download' pane of the X Code Preferences. Now is the time to try and see if you can install
programs from MacPorts. If a program installs, Congratulations! It's all over. However, if it says
something like 'A new version of X Code must be installed version 3.2 is too old' then we have to do
one more thing.

X Code 4.3 installs in a different location than before. For some reason, instead of being in:

    /Developer/Applications/

it's now in:

    /Applications/

just like every other application. However, for some inexplicable reason, MacPorts doesn't auto
recognize and you have to tell it where to look for the new X Code install (this is the head-bashing
part to figure out). Now the way to tell it how to do that is:

    $ sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer

and now that it knows where to look, we have total utter success. Now I just hope that you planned
for approximately the 1 day install time to get back to where you were before.
Hope it helps and enjoy!
