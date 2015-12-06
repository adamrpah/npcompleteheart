<!-- 
.. title: Wild unsupportable claims about how Product X sucks!
.. slug: wild-unsupportable-claims-about-how-product-x-sucks
.. date: 2013-12-11 07:45:46 UTC-05:00
.. tags: soapbox, databases, mongodb
.. category: 
.. link: 
.. description: 
.. type: text
-->

I read an article in the last month that really rubbed me raw, it was this one:
<br/><br/>
<a href='http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/'>Why you should never use MongoDB</a>
<br/><br/>
Why does it bother me so much? Mostly because it’s bullshit, but I also feel that NoSQL solutions (and MongoDB specifically) are getting an undue bad reputation due to “MongoDB/NoSQL is bad” articles making great link-bait. Even more than that, people present themselves as experts when in reality they just make extremely broad claims about a lack of suitability without properly defining what their REAL needs are that make a technology so poor. 
</p>

<!-- TEASER_END -->

<p>
Why do I say that? Well this quote makes the point really well (emphasis mine):

 <blockquote>
Well, that’s the million dollar question. But I’ve already answered the billion-dollar question. In this post I’ve talked about how we used MongoDB vs. how it was designed to be used. I’ve talked about it as though all that information were obvious, and <strong>the Diaspora team just failed to research adequately before choosing</strong>.
<br/>
But this stuff wasn’t obvious at all. The MongoDB docs tell you what it’s good at, without emphasizing what it’s not good at. That’s natural. All projects do that. But as a result, it took us about six months, a lot of user complaints, and a lot of investigation to figure out that we were using MongoDB the wrong way.
</blockquote>

Is it really the fault of the database that a team didn’t research a solution they implemented first? I don’t think so. Especially when the crux of their problem was the fact that no one thought of how to model relationships within a document database before even beginning.
</p>

<p>
Modelling relationships within MongoDB actually isn’t that hard, there’s a few options available and even I’ve been able to write about them <a href=”http://www.npcompleteheart.com/post/starting-with-mongo-some-dos-and-donts/”>before</a>. The problem is that the team didn’t want  to bake this part into the code (understandable, but that’s another unstated project need that isn’t a fault of NoSQL) and maintain in light of their familiarity with a traditional SQL backend. Again, that’s a personal choice based on project needs, not a major failing in a database backend.
</p>

<p>
So let’s look at the real needs again:
<ul>
<li>Needs to be a solution that integrates with some type of ORM for database interaction so relational joining is not in application code</li>
<li>Not duplicating data in the database (because hard disk space is precious? because it’s 1999 again?)</li>
<li>Needs to be familiar enough that team members have prior experience in optimization and usage</li>
</ul>

Given that criteria, MongoDB was a horrible solution. The reality is that anything but a traditional SQL backend would have been a terrible decision. But none of those are valid reasons as to <strong>”Why you should never use MongoDB”</strong>.
</p>

<p>
The real lesson is that you should never decide on which technologies a new project will use without discussing your possible needs beforehand. This goes not only for new technologies, but also continuing to use existing technologies. Just like NoSQL isn’t for everything, neither is SQL. It’s just that either one can be forced to work as a solution and be painful to work with for the entire project lifespan.
</p>

<p>
You reap what you sow, so don’t be lazy. That’s the entire take-away, pretty damn simple right?
</p>

