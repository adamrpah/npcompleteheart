<!-- 
.. title: Things keep a-changing
.. slug: things-keep-a-changing
.. date: 2015-05-01 08:50:41 UTC-05:00
.. tags: web, django, mongodb
.. category: 
.. link: 
.. description: 
.. type: text
-->

<div class="row" >
<div class="col-md-4">
    <img src='/images/tesla_time_travel.jpg'></img>
</div>
<div class="col-md-8">
I guess my post on <a src='www.npcompleteheart.com/posts/django-and-mongodb-in-2015'>Django and MongoDB in 2015</a> 
was prophetic, because I just changed my website over last week. It seemed that everytime I wanted to post 
a blog it was from an IPython notebook, which either meant reconfiguring the site to display IPython notebooks 
and get the css right or keep on with the semi-arduous process of converting the notebook to html (writing 
out `pre` blocks and all that). At this point it made me feel like that barrier was keeping me from blogging. 
Since producing at least a blog per month is on my New Year's resolutions list I decided to change up the 
site to hopefully make it more conducive to me blogging.
<br/><br/>
</div>

<!-- TEASER_END -->
<div class='col-md-12'>
This time around, I really just wanted something simple that had IPython notebook support baked in
from the start. I wanted it to be lightweight, support markdown input (since it seemed like I'm the
last human alive writing in html and I could never remember the damn markdown symbols for that
reason), and I guess be a little bit anachronistic. For these reasons I just decided to go with
(Nikola)[www.getnikola.org]. It looked cool, sounded simple (loved the part in the tutorial that
just said, `don't read this tutorial, just start using`), and it seems like the darkhorse in the
race against Pelican. In any case, that was enough to persuade me to start using it.
<br/><br/>
The switch was pretty simple with the exception of the fact that I had to edit all my old posts to
make them appear like I wanted on this website. I would write more, but there really wasn't much
more to it than what's contained in teh basic introduction. The only thing that really held me up
was getting Git Pages to work. Most of the methods written on the internet weren't working for me
so I just did the lazy thing and made a separate repository for Github to serve as my website.
<br/><br/>

Most things made it over okay, with the only real holdovers being the D3 visualizations with
javascript. I know that it's possible to move them over using an IPython notebook I just haven't had
the time yet. Through this process I also found out that someone limited the Folium mapping package
to only 6 colors again for apparently no fucking reason! Yay open source! Oh, and I killed some
high-traffic pages that I hated just because, like how to make a volcano plot. It was just too old
and out of date.
<br/><br/>

Otherwise, the website isn't completely up yet (I need to add the projects back in, maybe give the
detail pages on individual publications) and figure out how to get some more javascript working (I know
completely against the whole starting premise). 
</div>
</div>
