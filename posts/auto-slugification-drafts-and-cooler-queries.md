<!-- 
.. title: Auto-slugification, drafts, and cooler queries
.. slug: auto-slugification-drafts-and-cooler-queries
.. date: 2013-03-19 14:01:25 UTC-05:00
.. tags: django, web
.. category: 
.. link: 
.. description: 
.. type: text
-->

Or more accurately, the list of things that I did last night to spiffy up the site. So what did I do in reality?

<!-- TEASER_END -->

##Making slugs is boring, having slugs made is awesome

If you follow the MongoDB Tumblelog post you'll be starting with a website that is pretty functional. 
One of the things that it does do is it has you enter the slug field for each post in the admin section when you create it. 
What is a slug? It's the string in the url bar you see after "/post/" and it identifies the post location in the website. 
For me, and most of the time, we have the slug modelled after the post title so it is easily tracked. 
It's annoying though to re-enter the title normalized for slug usage.

The first thing I tried was adding the prepopulated fields line to the `admin.py` file. 
This was supposed to prepopulate a slug field for a Post model using this code:

    class PostAdmin(admin.ModelAdmin):
         prepopulated_fields = {"slug": ("title",)}

but the admin section wasn't happy with this. 
Posts entered without a slug would be flagged as having an error (due to omission of the slug field). 
Quick googling suggests that there could be a problem with using django 1.3, and maybe django non-rel, but I didn't dwell on it too long.
Instead I found django-autoslug. Installation is simple

    pip install django-autoslug
    pip freeze > requirements.txt

and using it in the blog model is as easy as

    from autoslug import AutoSlugField
    #Other imports
    class Post(models.Model):
        slug = AutoSlugField(populate_from='title')
        #Other model attributes

after that the slug field is removed from the admin section, slugs are automatically populated upon post addition, and the slugs are normalized to the title of the post. 
Awesome!

##But I'm going to want to save partial work on the web content and query the heck out of the DB!

For the next part I just wanted to add a draft field to the Post model so I could write posts on the admin section, 
leave them half-finished but saved to the database so I could pick them up and finish them from anywhere. 
That's a really simple change to the model of course, just:

    class Post(models.Model):
        #Other model fields
        draft = models.BooleanField(blank=False, help_text="Save as a draft on the server")

Now what we could do is just handle the display of this in the template if need be. 
All posts are queried for when we want to display the list of available posts on the homepage. 
This is the 'ListView' from the Tumblelog tutorial and we could solve it in the template easily like this

    {% if not post.draft %}
      <--- Display post code -->
    {% endif %}

but this doesn't really seem that great. We're still loading the data from the database, it's just not being displayed using the template. 
It feels like we should really go the extra step here.

So what do you do? We should change the query in the url of course! Even better, let's get some real mongo access. 
In the blog models.py we can actually open up the ability to do a raw query using django_mongodb_engine by:

    from django_mongodb_engine.contrib import MongoDBManager

    class Post(models.Model):
        #Other attributes
        objects = MongoDBManager()

and we can change our queryset in urls.py for the list view to be:

        url(r'^$', PostListView.as_view(
            queryset=Post.objects.raw_query({'draft': False}).order_by('created_at').reverse(),
            context_object_name="posts_list"),
            name="home"
        ),

Whereas before it was:

    url(r'^$', PostListView.as_view(
        queryset=Post.objects.all().order_by('created_at').reverse(),
        context_object_name="posts_list"),
        name="home"
    ),

What we've done is open up the raw_query field on objects. Now we can actually issue more complicated queries to the database. 
While not essential now, this will be very useful for more complicated models/data types in the future.

And that was it, pretty fun, pretty simple, and fairly functional. As always this has been cribbed from the work of others and googling, 
I just didn't keep track of my sources that well last night.
