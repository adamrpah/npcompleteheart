<!-- 
.. title: Django nonrel, MongoDB, MongoHQ, and Heroku
.. slug: django-nonrel-mongodb-mongohq-and-heroku
.. date: 2013-03-14 07:21:25 UTC-05:00
.. tags: django, mongodb, web, tutorial
.. category: 
.. link: 
.. description: 
.. type: text
-->

So you want to make a Django app with a MongoDB backend? 

Better yet do you want to deploy to Heroku and use MongoHQ so there's minimal set up on your end and a free testing sandbox?

That's what I've done with this site (which is why it can be unresponsive also, I'm using all free at the moment).  
After doing it once I thought I had it down pat in terms of my online sources and thought that I could replicate 
that success with minimal fuss.  I was just proven wrong when I went too far, too fast and borked my app into a 
state that I didn't know how to fix it out of.  So here is an actual step by step, both for myself and others.

<!-- TEASER_END -->

##Update

This post survived for almost two months on the internet being correct about technology. Not too shabby. However, the wheels turn and things get outdated, namely that MongoDB was updated to 2.4 and changed behavior. By default all collections are capped and pymongo with the django fork wasn't handling that properly. If you follow the requirements list *exactly* this will not work.  You need to update the version of PyMongo to version>2.5 for it to work. Happy Coding!

**Resume Old Post**

**--------------**

So you want to make a Django app with a MongoDB backend? 
 
Better yet do you want to deploy to Heroku and use MongoHQ so there's minimal set up on your end and a free testing sandbox?
 
That's what I've done with this site (which is why it can be unresponsive also, I'm using all free at the moment).  After doing it once I thought I had it down pat in terms of my online sources and thought that I could replicate that success with minimal fuss.  I was just proven wrong when I went too far, too fast and borked my app into a state that I didn't know how to fix it out of.  So here is an actual step by step, both for myself and others.
 

But as with all my posts, I want to put out the relevant sites that I've used and am cribbing heavily from (I'm nothing without the google).  So these are where my references are from:
 
* [Heroku Guide to a Vanilla Django App]('https://devcenter.heroku.com/articles/django')
* [G. Dovicak's awesome stub on configuring MongoHQ settings]('http://www.gdovicak.com/2012/02/Django-Nonrel-and-MongoDB-on-Heroku')
* [MongoDB's How to make a tumblelog tutorial]('http://docs.mongodb.org/manual/tutorial/write-a-tumblelog-application-with-django-mongodb-engine/')


##Installing python, django-nonrel, and mongo support

 
Okay, so let's START!  First assumptions, you have python 2.7 with virtual environment installed as well as the <a href='https://devcenter.heroku.com/articles/quickstart'>heroku dev toolbelt</a>. Okay, now that that is done we're going to taketh from the Heroku tutorial first and get the app started.
 

    mkdir djangoapp && cd djangoapp
    virtualenv venv --distribute
    source venv/bin/activate
    vi requirements.txt
    pip install -r requirements.txt

where you edit your requirements.txt file in vim and it then looks like:

    distribute==0.6.24
    wsgiref==0.1.2
    git+git://github.com/django-nonrel/django-nonrel.git@master
    git+git://github.com/django-nonrel/django-permission-backend-nonrel.git@master
    git+https://github.com/adamrpah/mongodb-engine.git
    djangotoolbox==0.9.2
    pymongo==2.4

I took the advice in G. Dovicak's post and forked/cloned mongodb-engine as a git repository just so it was locked.  I don't feel that this step is entirely necessary, but you can feel free to use that fork if you want (it's public).
Now we have Django nonrel and its supporting packages installed inside a virtual environment.  
 
 
 


<h2>Starting a Django App and deploying it to Heroku</h2>

Next we start the app:
 
 
<pre class='prettyprint lang-bash'>
django-admin.py startproject djangoapp
</pre>

and let's check that it runs locally (checking at every step is how you make sure you haven't gone too far while borking something instrumental up).

<pre class='prettyprint lang-bash'>
python djangoapp/manage.py runserver
</pre>

Navigate to localhost:8000 in your web browser.  You should see a "It Works!" page.  Wooo! We have a Django app sans database now.
 
 

So now let's get this app ready to ship out to Heroku.  To do that we need to create a Procfile that contains the process that Heroku should run. so we do:
 
<pre class='prettyprint lang-bash'>
vi Procfile
</pre>
 

and then insert into the file:
 

<pre class='prettyprint lang-bash'>
web python djangoapp/manage.py runserver 0.0.0.0:$PORT --noreload
</pre>
 

Next set up git with a proper gitignore, initialize the repository, add the files, and commit it.  Afterwards we work with heroku, creating a heroku app and pushing our django app repository to heroku.
 

<pre class='prettyprint lang-bash'>
vi .gitignore
git init
git add .
git commit -m 'initial django app'
heroku create
git push heroku master
</pre>
  

.gitignore file contents
 

<pre class='prettyprint lang-bash'>
*.pyc
venv
*.swp
</pre>
 

Now let's start up the process so that there's a dyno serving the website, check the activity on the heroku app to make sure it works, and view the 'It Works!' Django page in a browser to confirm.
 

<pre class='prettyprint lang-bash'>
heroku ps:scale web=1
heroku ps 
-> Scaling web processes... done, now running 1
heroku open
</pre>
 

Perfect!  We've launched our app in Heroku now.  
 
 
 


<h2>Configuring MongoHQ settings with Django</h2>
Let's get that Mongo database working as a complement to our django app.  We do that by enabling the MongoHQ add-on.
 

<pre class='prettyprint lang-bash'>
heroku addons:add mongohq:sandbox
</pre>
 

Now we actually have to figure out *WHERE* and *HOW* to connect to our MongoHQ database.  We do that by running
 


<pre class='prettyprint lang-bash'>
heroku config| grep "MONGOHQ"
-> MONGOHQ_URL:                  mongodb://USER:PASSWORD@linus.mongohq.com:PORT/APP_ID
</pre>
 

We see that the heroku config command gives us all of the pertinent connection information for our instance. Or as an even more explicit example, your where should look like:
 

<pre class='prettyprint lang-bash'>
heroku config| grep "MONGOHQ"
-> MONGOHQ_URL:                  mongodb://heroku:aaaaaaaaaaaaaaaaaaaaaaaaaa@linus.mongohq.com:10000/app55555
</pre>
 

Now we have to populate our django settings file with it.  Initially the database connection settings for your django app will look like this:
 

<pre class='prettyprint lang-bash'>
 12 DATABASES = {
 13     'default': {
 14         'ENGINE': 'django.db.backends.', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
 15         'NAME': '',                      # Or path to database file if using sqlite3.
 16         'USER': '',                      # Not used with sqlite3.
 17         'PASSWORD': '',                  # Not used with sqlite3.
 18         'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
 19         'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
 20     }
 21 }
</pre>
 

We will change that to look like this using our heroku config settings:
 

<pre class='prettyprint lang-bash'>
 12 DATABASES = {
 13     'default': {
 14         'ENGINE': 'django_mongodb_engine', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
 15         'NAME': 'APPID',                      # Or path to database file if using sqlite3.
 16         'USER': 'USER',                      # Not used with sqlite3.
 17         'PASSWORD': 'PASSWORD',                  # Not used with sqlite3.
 18         'HOST': 'mongodb://linus.mongohq.com/APPID',                      # Set to empty string for localhost. Not used with sqlite3.
 19         'PORT': PORT,                      # Set to empty string for default. Not used with sqlite3.
 20     }
 21 }
</pre>
 

Or using our super explicit example:
 

<pre class='prettyprint lang-bash'>
 12 DATABASES = {
 13     'default': {
 14         'ENGINE': 'django_mongodb_engine', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
 15         'NAME': 'app55555',                      # Or path to database file if using sqlite3.
 16         'USER': 'heroku',                      # Not used with sqlite3.
 17         'PASSWORD': 'aaaaaaaaaaaaaaaaaaaaaaaaaa',                  # Not used with sqlite3.
 18         'HOST': 'mongodb://linus.mongohq.com/app55555',                      # Set to empty string for localhost. Not used with sqlite3.
 19         'PORT': 10000,                      # Set to empty string for default. Not used with sqlite3.
 20     }
 21 }
</pre>
 

Here are some important things to note, to make sure everyone is on the same page.  The USER will always be prepopulated as 'heroku', that's why I'm using it in our super explicit example.  So on line 16 it will look like
 

<pre class='prettyprint lang-bash'>
16         'USER': 'heroku',                      # Not used with sqlite3.
</pre>
 

even in your own settings. PASSWORD is a long string of numbers and digits, PORT is a 5 digit number, and APPID is app[0-9]{8} (app followed by 8 numbers). There is one important point to note and I screwed this up twice in a row on two different projects.
 
 

<strong>
To connect to the MongoDB database it needs a port number that is an integer. 
By default there are string quotes in the field.  
DO NOT USE THE STRING QUOTES.  PUT IT IN AS AN INTEGER.
</strong>
 
 

I have forgotten this both times, hopefully I (and who reads this) will not make the same mistake anymore. The last step is to comment out one line (line 115, 'django.contrib.sites') in the settings file to remove a default django behavior.
 

<pre class='prettyprint lang-bash'>
111 INSTALLED_APPS = (
112     'django.contrib.auth',
113     'django.contrib.contenttypes',
114     'django.contrib.sessions',
115     #'django.contrib.sites',
116     'django.contrib.messages',
117     'django.contrib.staticfiles',
118     # Uncomment the next line to enable the admin:
119     # 'django.contrib.admin',
120     # Uncomment the next line to enable admin documentation:
121     # 'django.contrib.admindocs',
122 )
</pre>
 

If we don't do this django will try to enter a site document into the Mongo database with a primary key of '1', which Mongo will not like and will stop your database sync.  Now we just have to package up these settings changes and push to heroku as
 

<pre class='prettyprint lang-bash'>
git add .
git commit -m 'Configured settings file to work with MongoHQ'
git push heroku master
</pre>
 

and now we very simply start up the database using the remote heroku machine with
 

<pre class='prettyprint lang-bash'>
heroku run python djangoapp/manage.py syncdb
</pre>
 

And we're there! Making a database user with a password finishes this round out.
 
 
 

<h2>Next Steps</h2>

Making models, templates, and so on as in the Mongo Tumblelog or do whatever you want!  You now have the base configuration to make a website.
