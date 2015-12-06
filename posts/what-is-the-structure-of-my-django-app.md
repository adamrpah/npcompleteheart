<!-- 
.. title: What is the structure of my Django app?
.. slug: what-is-the-structure-of-my-django-app
.. date: 2013-03-20 07:27:44 UTC-05:00
.. tags: django, web, mongodb, tutorial
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
This post is supposed to carry on from <a href="http://www.npcompleteheart.com/post/django-nonrel-mongodb-mongohq-heroku/"> setting up a Django app on Heroku with MongoDB </a> and help fill in a hole from the MongoDB <a href="http://docs.mongodb.org/manual/tutorial/write-a-tumblelog-application-with-django-mongodb-engine/"> Tumblelog </a> tutorial.  The biggest question is, what is my directory structure?  The tutorial jumps around a lot, assuming that you already know where everything should go.  So let's tackle that first.
</p>

<!-- TEASER_END -->

<h2>What is the structure of my Django project?</h2>
<p>
This is probably the only part that most people starting out that are familiar with programming but not Django or the web will need.  Here is what your directory structure for a Tumblelog should look like:

<pre class="prettyprint lang-bash">
djangoapp/
|- .git/
|- .gitignore
|- venv/
|- requirements.txt
|- Procfile
|- djangoapp/
    |- __init__.py
    |- urls.py
    |- settings.py
    |- manage.py
    |- tumblelog/
        |- models.py
        |- views.py
        |- tests.py
        |- forms.py
|- media/
    |- robots.txt
    |- js/
    |- img/
    |- css/
|- templates/
    |- base.html
    |- _form.html
    |- tumblelog/
        |- post_detail.html
        |- post_list.html
</pre>

If you fit that first description then this is all you probably wanted, so happy web app'ing!
</p>


<h2>How do I configure it?</h2>
<p>
So the only two directories really left are the media and template directories.  Media contains pictures (in the img/ folder), javascript (I would suggest that would be applied on every page, in the js/ folder), and site-wide css to style it (you guessed it, in the css/ folder).  You can make a directory in here and use it in an ad-hoc fashion too, before I added a javascript field in my Post model I had a folder in "media/" called "d3-files/". In that "d3-files/" folder I put javascript to execute visualizations, supporting data and css, and I could call it on a post page like this:

<pre class="prettyprint lang-html">
script type="text/javascript" src="/media/d3-files/time_series.js"
</pre>

And to get the right path for media working, in settings.py we do:

<pre class="prettyprint lang-python">
2 import os
3 #Tons of Code
49 # Absolute filesystem path to the directory that will hold user-uploaded files.
50 # Example: "/home/media/media.lawrence.com/media/"
51 MEDIA_ROOT = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../media/')
52 
53 # URL that handles the media served from MEDIA_ROOT. Make sure to use a
54 # trailing slash.
55 # Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
56 MEDIA_URL = '/media/'
</pre>

and that's it.  Media to serve for all!  Just watch out, there's not a lot of space on Heroku for something like images. So you'll be better off hosting images elsewhere (photobucket, flickr, picasa, etc.) and embedding the tags in your posts.
</p>

<p>
Hopefully that helps in some fashion!
</p>
