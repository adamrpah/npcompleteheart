<!-- 
.. title: Django and MongoDB in 2015
.. slug: django-and-mongodb-in-2015
.. date: 2015-01-02 09:46:17 UTC-05:00
.. tags: django, mongodb, web
.. category: 
.. link: 
.. description: 
.. type: text
-->

<div class='row'>
<div class='col-md-4'>
<img src='/images/django.jpg'></img>
</div>
<div class='col-md-8'>
<p>
So believe it or not my post from 2013 on setting up a Django website with a MongoDB back-end is still one of my most visited pages. Actually that's not hard to believe, it's not like this site is a trove of content (but it's a goal for 2015 to get content more consistently up here!), but 2013 is more than ancient in technology times so I just wanted to do a quick revisit.
</p>
</div>

<!-- TEASER_END -->
<div class='col-md-12'>
<h4>Should I follow that blog post and set up a Django app with MongoDB?</h4>
<h4>Hell no, definitely not now</h4>

<p>
Admittedly, my website still uses it but that is out of pure laziness and a lack of desire to migrate/work up something new. As is, I'm pretty sure that I have another year and a half before there's a catastrophic problem or a new feature that I absolutely have to have before I need to redo it all. And therein lies the biggest problem with trying to go down this path.
</p>

<p>
The reason that I wanted to use MongoDB so much was its native usage of JSON (well, BSON) so that I could quickly and easily store data or javascript code for quick on-the-fly visualizations. I wanted Django for its robust admin backend (still why I love it! Nothing else that I've used has anything quite as good). However, now with the newest version of PostgreSQL and its support of JSON as a column type it's possible to get everything I want out of a website using a traditional SQL database (actually the one that Heroku has always wanted you to use anyways). Granted, this means going back to the world of migrations will be a pain but it's easy enough concession to be back on the main branch of Django development.
</p>

<h4>But what if I really want to put the two together still?</h4>
<p>
There could still be a pretty valid reason why you want an easy admin interface and a NoSQL backend, but in that case I don't think any of the old instructions may still apply with all of the time that has passed. In all honesty, if you're not making a blog site (or you won't be blogging consistently like me, womp womp) I would suggest not using Django at all and using a custom flask app (which would be simple enough) instead and provide lots of flexibility. If you were tr Buying to make a site as a product, then I wouldn't recommend python at all then and recommend node.js due to the performance benefits. 
</p>

<p>
All in all, it's hard to say what to do in this new world where static site generators are the new hot thing. I still like having the ability to write and save drafts on my website instead of being stuck to a checked out instance of my website (I switch computers and locations...too often still). But in any case, I still like using Heroku even if it is apart of the giant SalesForce conglomerate.
</p>
</div>
</div>
