<!-- 
.. title: First times at RoR and how I got up and running
.. slug: first-times-at-ror-and-how-i-got-up-and-running
.. date: 2012-01-23 13:07:14 UTC-05:00
.. tags: web, rails, tutorial
.. category: 
.. link: 
.. description: 
.. type: text
-->

This blog is my first time starting a web page (for real at least) and using Ruby on Rails. Despite
having some prior experience with Django I chose Ruby on Rails for two main reasons: (1) it
integrates seamlessly with Heroku, which is an amazing service (for free! at least for my needs)
that provides basic app hosting and is not replicated on the Django side of web development and (2)
it's something I haven't done yet and I would rather learn something new. I'm not a massive fan of
Django, so even though my primary programming experience is in python it didn't deter me from
switching over for this. At a later point, I may detail what I feel are the differences between the
platforms and which one excels in what area, but there's plenty on the web that goes on about the
differences already.

<!-- TEASER_END -->
 
So the real meat of this post is to detail how I went from absolutely nothing to a working blog, the
actual resources I used and in what order (clear up conflicting suggestions from just mindlessly
following google links which is how this got going), and to give credit where credit is due (if you
go through any of these tutorials you can see how liberally I used the default CSS templates they
generate, the CSS/HTML is my definitive weak point).

##Installing Ruby

When I first went to go use Ruby there were some initial conflicts, since the newest version of
Rails wasn't compatible with the version of Ruby that came stock on my computer (OS X 10.6 Snow
Leopard). What I thought was the obvious answer from my python experience was to open up MacPorts
and download the newest version of Ruby and Rails, not thinking that there were better solutions
available (MacPorts is as good as it gets). I actually did get it up and running but not before
spending a lot of time resolving the issue with rake (v0.9.0 was giving problems with the gemfile)
and then mucking it all up by using a different version to check out and play with an app that was
already written but with an earlier rails version.

The hilarious thing is, that there is a solution for this with RoR and it's great (despite the
problems it's giving me now in checking out a head version of Ruby to use), it's RVM--Ruby Version
Manager . It actually does work exactly as the tutorial shows (a real rarity) and it's simple,
making it a terrible idea to try and manage Ruby yourself through MacPorts. The only hacky thing I
did was to actually put a single line in my bash_profile to automatically use the default ruby
because at some point it stopped initializing properly. This subsequently caused me to curse
frequently when Rails would error out on starting a server. If that effects you then just execute:

    $echo 'rvm use default' >> ~/.bashrc

and it will resolve the problem, indefinitely. It does require that it executes every time you open
a new terminal tab, so if that bothers you then you are properly warned.
At this point you should also go ahead and sign up for GitHub and Heroku (if you plan on actually
putting it on the web, otherwise just Git. Version control is a lifesaver when you don't entirely
understand what you are doing).

##Starting your Rails App

I started by using the Ruby on Rails tutorial to get the basic sauce of the website working. I also
heavily used another resource to get the basic CSS and html of the website working, but I
unfortunately cannot find it to save my life. At the same time I also immediately set up users and
user authentication, I would highly recommend NOT doing this. Trying to do everything at once was
not a seamless process when I was still grappling with the basics of getting the website up and
running. Play around with Rails and get all the basic functionality that you want along with the
styling that makes you happy enough to proceed and then start mucking it all up by adding
authentication.

For user adding and authentication I decided on using Devise and CanCan, since it didn't require
nearly as much work on my part and seemed to be a fairly easy set up and go process. That didn't
turn out to be entirely true, but that was more my own fault. Instead of sitting down and getting it
running in one go I pecked at it in bits and pieces, forgetting where I was when I last ran out of
time trying to set it up. The tutorial that I used the most (and should be sufficient to create the
entire process) can be found here and the follow up here. Although to be honest, my real problems
occurred when I forgot the password to the user I created and subsequently tried creating a new user
to supercede the old one when I had, effectively, locked myself out of my own app. If you make this
same boneheaded mistake, I'll tell you now that it's just easier to go straight into the database
and correct, so long as you are comfortable with basic SQL.

##How does this CSS thing work?

This by far my weakest point. I really don't entirely understand how to use HTML and CSS although
even initially I understood the reasons for using both and it makes sense (HTML for content, CSS for
design). Even using the tutorial from the Rails app and the stock CSS it came with to start I still
had lots of trouble modifying it to give me a look that I was at least semi satisfied with. One
night I just bit the bullet and went all the way through the tutorials at HTMLDog. This didn't
resolve my problems, it didn't make me like CSS or HTML any more (or less), than I already did, but
it gave me enough of a basic understanding of the languages and what terms were used for what that I
could actually start googling for what I wanted to do and get results. If you are coming at this
from a programming starting point instead of a design standpoint this is by far the hardest part.
HTML and CSS don't give stack traces and errors like real code does, it just takes what you give it
and then does whatever the hell it wants with it, with no real indication as to why what you told it
isn't going to be sufficient. Annoying to say the least.

##Getting it onto the web

This part is by far the easiest, just buy a domain and set it up. There's a video in the Heroku
articles section that explains how to set it up with GoDaddy and after that you're done! The video
is only outdated on one aspect, setting up a CNAME with domainname.com. to refer to the site without
the 'www' doesn't work anymore. GoDaddy wants you to do that using their domain forwarding, which
can be set up from the dashboard page for your domain. 
Now breathe a sigh of relief when everything works.

That's it! From start to finish of how I got going and a rundown of the tutorials that can be used.
If you want to stray go for it (this website obviously isn't perfect and I'll be heavily modifying
it as I get a better grip on using all of these things) but just be careful about what you start
following. There are lots of Rails tutorials still kicking around from earlier versions and the
techniques and code used don't all work in Rails 3. Reading first to make sure it's applicable saves
you the pain of implementing and then banging your head against the screen as you get nothing but
errors.
