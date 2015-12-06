<!-- 
.. title: Starting with Mongo, some Dos and Don'ts
.. slug: starting-with-mongo-some-dos-and-donts
.. date: 2013-05-02 07:38:44 UTC-05:00
.. tags: mongodb, tutorial
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
Some backstory.  I think I first started talking about MongoDB in earnest maybe five months ago in my research lab. After having one person convert with a big project and some successful presentations (which weren't even done by me!) research has finally peaked.  Now that everyone is converting, people are going through the same growing pains I had when I first started. Instead of forgetting these nuggets of information again I wanted to put them done in text.
</p>

<!-- TEASER_END -->

<h2>Wait, why MongoDB? I heard about (blank)! ...or Something new? Bah... Screw it.</h2>
<p>
I'm just going to be blunt, I am not the person to have an argument about SQL versus NoSQL or NoSQL option a vs NoSQL option b. There are tons of software technologies, both old and new, and I think that whatever fits your specific use case for a single problem is what you should do. To me, that means that if you are trying to run a High Frequency Trading firm you have a really expensive SQL server, if you are maintaining secondary indices you have Redis, or if you have tons of database document records you use MongoDB or something close to it. My vote is for using whatever software best fits the problem at hand.  With that said though, I am going to approach the basics of MongoDB coming from a comparison to SQL.
</p>

<h2>Some Mongo Basics</h2>
<p>
A mongo install will/can have many databases inside of it. Each database will/can in turn host many collections. Each collection hosts a number of records which are termed BSONs (Binary JSON) which are similar to JSONs (JavaScript Object Notation) which are similar to dictionaries in a programming language like Python. Like every other dictionary, a BSON will be composed of keys and values. To put this in SQL terms, the column headings would be keys and the values in a single row would be the values. Each row would be a separate record.
</p>

<p>
At this point, you may have already noticed something. "But wait, aren't you duplicating the entry for those keys? Isn't that a waste of space?'
<br/>
The answer is yes, that is inefficient in terms of disk space.  However, it is not inefficient in terms of querying.  Every time I launch a search for a record I will want to know what are the fields that the record has and access them. This is especially true because each record doesn't need to have the same schema. The real answer in all of this, is to not worry about space inefficiencies. Horizontal scaling of MongoDB (spreading it over multiple computers to increase space) is easily done.  It's a little bit of a paradigm shift, but let's just roll with it.
</p>

<p>
For the rest of this walkthrough, when I talk about interacting with the database I'll be referring to it as if we are using python with PyMongo to access the database. You could just execute commands with the Mongo shell but we'll work with it this way.
</p>

<h2>What is my MongoDB workflow?</h2>
<p>
First off, databases and collections in MongoDB are lazily created.  That means that when you tell mongo that you are going to put something into a database or collection that doesn't exist, it creates it! It also means that just telling it to open a database doesn't create it.  MongoDB won't actually create the database until there is a BSON in there.
</p>

<p>
So let's make the worst address book as an example.  We'll assume that we have MongoDB running on the computer where we are typing this code. From the interactive python shell, it will look something like this;

<pre class="prettyprint lang-python">
import pymongo
client = pymongo.MongoClient()
db = client.address_book
db.friends.insert({'name': 'John'})
> ObjectId('5183fb1aacc1453c8e5258f4')
</pre>
<br/>

What we have done here is:
<ul>
<li> Imported pymongo </li>
<li> Established a connection to MongoDB</li>
<li> Created a database called 'address_book'.  After this first time, we will not be creating but just calling it because it will already exist</li>
<li> Inserted an entry for our friend 'John' into the collection 'friends' inside the database 'address_book'.  Mongo responds by telling us what the ObjectId it has assigned to it is. </li>
</ul>
</p>

<p>
This ObjectId is uniquely created for each document and this is how Mongo keeps track of the documents on its own. It is actually quite important too. Let's find our document in the database and look at how Mongo keeps it.

<pre class="prettyprint lang-python">
db.friends.find_one()
> {u'_id': ObjectId('5183fb1aacc1453c8e5258f4'), u'name': u'John'}
</pre>
<br/>

We see here that the ObjectId is the value of the field '_id'.  This is actually important: <b>Mongo reserves the value 'id'/'_id' to itself.</b>  You can actually create an 'id' field of your own, but you won't be able to index it (see the next section for why that is important).  It's best to be more expressive in your key naming anyways, given that we can have tons of documents of any type in a collection.  In this example, we will give our documents a 'friend_id' to uniquely identify them.
</p>

<p>
Adding our friend_id is relatively easy.  We just get the corresponding record, modify it, and then save it back in the database.  This is done as:

<pre class="prettyprint lang-python">
friend_bson = db.friends.find({'name': 'John'})[0]
friend_bson['friend_id'] = 1
db.friends.save(friend_bson)
db.friends.find_one()
> {u'friend_id': 1, u'_id': ObjectId('5183fb1aacc1453c8e5258f4'), u'name': u'John'}
</pre>
<br/>

We find the document we want (note that we put an index on the find because without it friend_bson would be the cursor to the database query), add the new field, and then save it.  MongoDB sees that it has an ObjectId already and matches it to the document in the database. Pretty simple right?  Now just make sure not to mess with an ObjectId. 
</p>

<h2>Why is MongoDB so slow after I put in a bunch of records?</h2>
<p>
So let's continue with our example and say that you have created a database and populated it with thousands of BSONs that catalog your friends' information (we all have thousands of friends after Facebook right?). But now you want to find a specific friend and view their information.  We would launch a query like (note that 'find_one()' is a pymongo specific query):

<pre class="prettyprint lang-python">
friend = db.friends.find({'name': 'John'})
print friend
> {'_id': ObjectId(88719352718910), 'name': 'John'}
</pre>
<br/>

This will return the document of information that we have for our friend John. Now this request may take a bit of time, if we haven't touched our database at all.  That is because without telling Mongo additional fields that we want it to index, it will only index the "_id" field. This means that a query on any other field will send Mongo searching through all of the records one by one until it finds yours.
</p>

<p>
This is actually a pretty easy problem to fix.  All we have to do is tell Mongo to index on the field that we want to query on.  We do this in pymongo as:

<pre class="prettyprint lang-python">
db.friends.ensure_index('name')
</pre>
<br/>

I like to actually put this line of code at the end of my initial data import script.  That way I don't forget to do it and have slow query times.
</p>

<p>
Now you might ask why not just index all of the fields then?  The way that indexing in Mongo works is that it keeps a tree of all the values for an indexed field in memory. That way when you query it only has to traverse the tree to find your document.  If you index all of the fields you run the risk of having so many trees that are so large that exceeds the available memory of the computer.  That will send your performance right back down. So it's best to only index the fields that you will need to use.
</p>

<h2>Many-to-Many Relationships</h2>
<p>
One of the questions coming from SQL is how do I manage one-to-many or many-to-many relationships without tables? This is a good question and I don't believe that there is a set in stone answer yet.  Really it will come down to your use case. There are three ways that we can handle this: (1) document mapping, (2) embedded lists, and (3) embedded documents.
</p>

<p>
In this example, we will say that we want to start adding where our friends work.  We will also assume that our friends are industrious and have more than one job.  So for example, we'll say that John works at both Northwestern University and MegaCorp. In this instance, we already have our friend John in the database.  Let's assume that we have already added a document for Northwestern University and MegaCorp into the database also.
</p>

<h3>Document Mapping</h3>
<p>
This is the most SQL-like manner.  We will create another document that has two fields, one that corresponds to John and another that corresponds to the corporation. That means we would do this:

<pre class="prettyprint lang-python">
relationship1 = {'person_name' : 'John', 'corporation_name' : 'Northwestern University', 'type': 'relationship'})
relationship2 = {'person_name': 'John', 'corporation_name': 'MegaCorp', 'type':'relationship'})
db.friends.insert(relationship1)
db.friends.insert(relationship2)
</pre>
<br/>

Now for a random document to find their workplace we need to do:
<pre class="prettyprint lang-python">
for document in db.friends.find('friend_id': {'$exists' : 'true'}}):
    corporations = []
    for relationship_record in db.friends.find({'type': 'relationship', 'person_name': document['name']}):
        corporations.append(relationship_record['corporation_name'])
print corporations
> ['Northwestern University', 'MegaCorp']
</pre>
<br/>

This method will require two queries to the database and multiple indices to ensure speed. If we didn't put the descriptive variable we want in the relationship record (which will be likely) then it would be three queries because we have to make another request to get the company record.  This will be the slowest option.
</p>

<h3>Embedded Lists</h3>
<p>
Using this method we create a field in the person document called 'corporations' that is a list.  We then populate the list with the identifiers for our corporations. We will also do this to our corporation documents but in reverse, adding a field 'employees' that is a list of the people that work there. Given this set up our workflow would be:

<pre class="prettyprint lang-python">
for document in db.friends.find('friend_id': {'$exists' : 'true'}}):
    print document['corporations']
> ['Northwestern University', 'MegaCorp']
</pre>
<br/>

In this set up, we only need one query.  If we didn't store the name of the corporation but instead the ObjectId we would have to query twice, once to get people and a second time to get corporations.  In any case, it would still be faster than the relationship mapping method.
</p>

<h3>Embedded Documents</h3>
<p>
This method is an alternative take on embedded lists.  The only difference is, instead of storing a value to identify the associated company with we have the entire company document in the person document. This means that there is no need to have company records at all.  However, that means that the company information will be replicated separately in each one of the person documents (remember how I told you to not worry about disk space? This is the time).
</p>

<h3>Choosing between them</h3>
<p>
The Embedded Documents method can be a boon to speed or it can be a real pain and it really comes down to our usage.  For something like our address book, it makes more sense to use embedded lists.  That is because if we need to change a corporation (or person record) all we have is a pointer stored to it so there's no need to change it in more than one place.  If we use the embedded documents method, this would be a real pain.  Say for example that we added the address to a corporation, we would have to go through every person, see if they have that corporation listed, and change the address.  It's a time waste and overly redundant.
</p>

<p>
However, on this blog I have each post as a document and any comments on that post are embedded into that post document. This makes sense, because whenever I want to load a blog post I also want the associated comments.  This makes it so that all the information I need is in one query.  Even better, a comment on one post doesn't apply to another so there isn't any real duplication.
</p>

<p>
As a quick rule, I would say that the method that you use should be based on a specific use case.  If you have unique documents and a one-to-many relationship (like this blog and comments) then the Embedded Documents method makes sense.  If you have non-unique documents and relationships or many-to-many relationships then the Embedded Lists method will work better.  I honestly can't think of a situation where you would want to map the relationships in a SQL-like manner, but I reserve the right to be proven wrong.
</p>

<p>
...and with that, good luck and happy Mongo'ing!
</p>


