<!-- 
.. title: MongoDB is for researchers
.. slug: mongodb-is-for-researchers
.. date: 2015-03-31 13:49:20 UTC-05:00
.. tags: mongodb, research
.. category: 
.. link: 
.. description: 
.. type: text
-->

<div class='row'>
<div class='col-md-4'>
<img src='/images/mongodb.jpeg'></img>
</div>
<div class='col-md-8'>
Over the past three years I’ve been something of an evangelist for using MongoDB. This stance has
drawn derision from some outside the lab, which frequently forces me to clarify in what
circumstances I think MongoDB (or NoSQL in general) is so great. Unfortunately, I’ve been too lazy
to put those thoughts into writing, so this is my long overdue explanation and the first in a series
of posts describing how I use MongoDB daily.
</div>

<!-- TEASER_END -->

<div class='col-md-12'>
<h2>MongoDB is for <strike>lovers</strike> researchers and scientists</h2>

So I think the first question to tackle is why use a database at all? Here are the three basic
reasons that caused me to make a switch.
<br/><br/>

<li><strong>Speed.</strong> If you’ve ever explored the parameter landscape of a model then you’ve likely
experienced the point when typing `ls *` in your results folder can bring your system to its knees.
While there are ways to work around this problem (creating subfolders, smart naming conventions to
get groups of files), you can also just switch to storing the results in a database. Databases are
designed for storing millions of records easily.</li>
<li><strong>Queries.</strong> How many runs with parameters (rho, mu, sigma) have finished? Okay, now how many
of those runs have a final value of y? Not nearly as easy to answer is it? At best it would require
looking at the final line of every file. At worst, with some odd encoding scheme or additional forms
of output in the same file this could require parsing every file. Databases make answering these
types of questions quick and easy.</li>
<li><strong>Portability.</strong> Your data files need to be in a specified directory for your code to read
it. A folder for all your results needs to be in the right place too. Any time you want to test your
code those parts all need to be there and hopefully the ‘there’ isn’t in the same folder as your
code (I am an unabashed proponent of separating code, data, and results). For me, switching between
a laptop, workstation, and two different clusters, this can lead to some annoying inconsistencies
with file availability (specifically with large data files). Storing your data in a database with a
static IP address makes it easy to access anywhere.</li>
<br/><br/>

This is the start to why I think it’s a good idea to use a database, with another lurking reason
being that working knowledge of databases is required outside academia. If none of those reasons
resonate with you to explore these options then don’t worry, not everyone has the same research
problems as me.
<br/><br/>

<h2>So why X technology over Y technology?</h2>

If you wade too far into the internet you’ll find out that MongoDB is a type of NoSQL database and
that other types of databases are SQL databases. If you wade even a little bit further then a
torrent of flame wars will come pouring out of your monitor and you should just shut your eyes,
cover your ears, and pull your computer’s power plug out. Hopefully the following reasons will make
it slightly clear what the differences are without having to go dive into the recesses of the
internet. 
<br/><br/>

Ease of use - i.e. Schemaless. What does schemaless really mean?
When you use a SQL database you need to first create a database and then a table. Then once you
create a table you must give commands or use a GUI to establish the number of columns, the names of
columns, and, most importantly, the data type that each column can hold. When a record is entered
into the database it must have all those fields. If you decide to change your code and need to store
additional data fields then you must alter the table first (or else suffer an error!).
<br/><br/>

With MongoDB you create a database and then insert a document into it. It will even lazily create
the collection that you told it to use. It can have any number of fields (or keys in Mongo/document
speak) and each key can be named however you want. The twist is when you go to insert a second
document. The second document doesn’t need the same number of keys, or key names, or even the
datatypes of the values associated with each key name. It allows you to do whatever at any time,
with any document in the database.
<br/><br/>

Now this freedom is considered to be a flaw in some minds, but all I see is that the onus of
consistency is on the programmer (i.e. you). In the context of a single person, a small group, or a
research lab I don’t think that it’s much to expect that everyone act responsibly and document what
they’re doing (either in the README for the project and/or with explicit key names). The most
important thing to remember is that just about any technology can be detrimental to the workings of
a project if in the hands of an irresponsible idiot.
<br/><br/>

<h3>Dictionaries!</h3>

So this stems from being a pythonista, but when  I code I store things as dictionaries or classes
typically. MongoDB lets me shove that directly into the database since it works with natively with
dictionaries (Mongo’s data store is a BSON, which is more or less a JSON, which is almost a
dictionary). This isn’t so when working with a SQL database, since each record is stored in a row
(think of a CSV file), and for me this is a huge differentiation and selling point. 
<br/><br/>

Complex data structures can be natively stored in MongoDB and they are directly returned when I
query them.  So for me, when I run a simulation and there is a class keeping track of the time
evolution of the system at the end of the run I can just calculate whatever additional metrics are
necessary and save the dictionary into the database. When I need to analyze the results I can either
roll directly with the dictionary and start analyzing, it’s pretty simple.
<br/><br/>

<h3>Complex values.</h3>
I have stored datetime as a value, which isn’t really that special. What is special is when I store
a networkx graph object. Mongo will let you shove a fair number of things into it without requiring
you to convert them to a string. This is not only handy, but it cuts out code and processing steps
on file loading.
<br/><br/>

<h3>MapReduce.</h3>
This is more of a footnote but MapReduce is a great feature and can turn 24 hours of computation
time into one fairly quickly. 
<br/><br/>

These are the basic reasons why I use MongoDB, both in comparison to a file system and a SQL
database. I will never say that it’s the fastest or the best solution from a technical standpoint,
but it is the quickest and easiest solution in regards to my time, which is the most important thing
in my mind. I’m a researcher, not someone setting up production databases or something soul crushing
like that ;)
</div>
</div>
