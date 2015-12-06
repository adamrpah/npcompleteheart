<!-- 
.. title: A little something extra for managing PyMongo
.. slug: a-little-something-extra-for-managing-pymongo
.. date: 2013-12-17 07:46:48 UTC-05:00
.. tags: python, mongodb, pymongo, code
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
I really dislike boilerplate code, it drives me a little bit crazy. Starting database connections falls squarely into that realm. So in the vein of "sharing is caring" here is what I'm currently using with pymongo. It's pretty simple, but why code it twice right?
</p>

<!-- TEASER_END -->

<p>
It's  pretty simple script that only contains one class: MongoConnection. It needs to be initialized with a dictionary containing the connection parameters (preferably stored in a config file that you're just feeding in) like so.
<br/>
<pre>
settings = {
  'user' : 'username',
  'pasword' : 'password',
  'host' : 'hostname',
  'port' : 'port',
  'db': 'db_name',
  'collection': 'collection_name'
}

import MongoConnect as mcxn
dbConnection = mcxn.MongoConnection(settings)
</pre>
</p>

<p>
With that it will have already initialized the specific database and collection needed, right away you can:
<br/>
<pre>
#Insert a document
dbConnection.collection.insert({"body": "I am a sample document body", "name": "FunnyBunny"})
#Find that document!
dbConnection.collection.find({"name" : "FunnyBunny"})
#Close the connection to the database!
dbConnection.tearDown()
#Reopen it after closing it! Just go wild!
dbConnection.connect()
</pre>
</p>

<p>
So that's about it.  There is some basic error handling, which is to say don't push it.
</p>

<p>
The previous code is scratched, a new better version can be found in a <a href="https://gist.github.com/adamrpah/18f67498daf8fb8573a3">gist</a> that I will regularly update. Alternatively, you can just copy this <a href="https://gist.githubusercontent.com/adamrpah/18f67498daf8fb8573a3/raw/15b11b9db449cf72b3e6870ddc7dbc3f0dd74b45/mongoConnect.py">url</a> and use wget to download the script :)
<p>
