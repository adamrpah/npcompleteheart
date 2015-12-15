<!-- 
.. title: Big seeds and viral marketing
.. slug: big-seeds-and-viral-marketing
.. date: 2015-12-14 14:44:56 UTC-06:00
.. tags: socialdna, viral marketing, virality
.. category: 
.. link: 
.. description: 
.. type: text
-->

<div class="row" >
<div class="col-md-8">
Having a product or campaign go viral is no small feat. As someone who has made a number of software
tools that no one else on Earth has used (whether I've published the code to the world or not!), I can promise you that 
non-virality is a common state for a product to be in.
</div>
<div class="col-md-4">
<img src = '/images/socialdna/virality.png'/>
</div>
</div>

<!-- TEASER_END -->

This lack of virality goes beyond my own failed efforts at helping the world with my code though, and extends to most products 
and campaigns. While there are [numerous](http://socialtriggers.com/craft-contagious-content/) 
[pieces](http://www.sparringmind.com/viral-content/)
[written](http://www.amazon.com/gp/product/1591840929/ref=as_li_ss_tl?ie=UTF8&tag=ciotti-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1591840929)
[about](http://neilpatel.com/2015/06/23/how-to-create-viral-content-that-will-drive-2500-visitors-per-day/)
[how](http://www.inc.com/minda-zetlin/yes-you-can-create-viral-content-here-s-how.html)
[to](https://blog.kissmetrics.com/creating-viral-content/)
[create](http://backlinko.com/viral-content)
[viral](http://www.forbes.com/sites/dorieclark/2013/06/23/how-to-create-viral-content/)
[content](http://www.amazon.com/exec/obidos/ASIN/1451686579/simonsayscom),
the simple truth is that not every ad gets watched a billion times on Youtube (and **please** don't
click all those links, I was just trying to make a point). 

To be certain there are some similarities between pieces of content that do go viral. They are fun
or funny and they do resonate with their audiences. Some people have even created multiple campaigns
that have all gone viral. 


However, even if you integrate all of the advice that you find on how to create viral content, 
you **still wouldn't** be guaranteed of making a viral hit every time (life's unfair, I know). We know this
scientifically from the [great
work](http://snap.stanford.edu/class/cs224w-readings/bakshy11influencers.pdf) that Bakshy, Hofman,
Mason, and Watts did quantifying influence on Twitter. In this work there are two main take-aways:

<ul>
<li>Users that had started cascades in the past were likely to start another cascade
(Unsurprising)</li>
<li>Features of the content do not improve predictions (Suprising)</li>
</ul>

So let's tackle these two points.

<h3>Some users are better at starting cascades than others</h3>

This is the part where you say "HA! THERE IS A KEY TO GOING VIRAL! YOU LIED TO ME!" and I say "Hold
on, let's explain some boring stats". 

In the paper, they construct a model to predict the influence that a single user will have. They
feed into this model the following features for each user:

<ul>
<li> Number of followers </li>
<li> Number of friends </li>
<li> Number of tweets </li>
<li> Date of joining </li>
<li> Past total influence</li>
<li> Past local influence</li>
</ul>

where local influence is the number of reposts by immediate followers and total influence refers to
the total cascade size. Once that model is fit to the data there are only two features that end up
mattering:

<ul>
<li> Number of followers </li>
<li> Past local influence</li>
</ul>

All this points to the fact that paying someone that has a large number of followers and frequently
posts content that its immediate followers repost is a solid strategy to go viral. And it is.

But that model (which is the best fitting one!) only explains 31% of the variation in the data. That
means that 69% of the variance in the data is unexplained by the model. It also means that if you try to predict
how big of a cascade your piece of content will get, you will have a huge error associated with the prediction.

<h3>So how does content not matter???</h3>

What the authors did is had a sample of the content labelled by Mechanical Turkers (a cheap way to
have humans do simple tasks on Amazon). The turkers rated the content on a few different categories,
specifically these ones:

<ul>
<li>Rated interestingness</li>
<li>Perceived interestingness to an average person</li>
<li>Rated positive feeling</li>
<li>Willingness to share</li>
<li>Type of URL (Social Media, Blog, Other, News)</li>
<li>Category of content (Sports, Business, Gaming, etc.)</li>
</ul>

When these different categories were analyzed there were differences in the average cascade size
given the different types of URLs or the category of the content (See Figures 8 and 9). However, when these features were added 
to the existing model, none of the content features improved the predictive ability of the model.
That point is where we derive the sensational headline that content does not matter.


<h3>Oh geez, what do these points mean?</h3>

These points inherently makes sense if we think about all of the data at our disposal. If you engage in tweeting, 
you know that some of your tweets are positive and engage with your audience but very few of them are
retweeted broadly. Even if you had successes before, most of the content that you author doesn't go
viral either. However, if you have created a cascade before I'd much rather have you tweet about
something than an egg (a twitter egg is someone who hasn't even added a profile picture to their
account).

And that is the really important point that this paper drove home. Most of the articles that you've
read about creating viral content really only examined observed successes. The reality is that there
are hundreds of thousands more pieces of content that have all of the same features as those success
that went nowhere!

<h2>So how can we combat this? (Back to the post name)</h2>

Watts mentions this insight in the manuscript, but I feel like the
[HBR](https://hbr.org/2007/05/viral-marketing-for-the-real-world) article is a more accessible way
to read about it. 
The key when trying to conduct a successful 'viral' (note the quotes!) is to not plan on going
viral, but trying to achieve as much reach as possible. 

Typically when creating advertising content you would plan on just creating an ad that you show to specific people. 
But if you make that ad worth sharing (either through an explicit call to action to your viewers or through 
creating shareable content, like a gif of a cat using your product) then you will get your viewers
to share your content for you. This sharing is what leads to increased reach for your content, even
if it doesn't go viral. 

<h2>What do you take away from this?</h2>

<ul>
<li>Don't build your campaign around the expectation that it will go viral. That's a fool's
errand.</li>
<li>Do use viral features to increase your reach beyond your built-in audience. Hopefully this will
lead to more subscriptions and a bigger audience for you to seed in future rounds (i.e. ever
expanding reach until saturation)</li>
<li>Don't spend large amounts of money to seed a single user (i.e. paying for a promotional tweet
from a celebrity) unless your acquisition costs are extravagant and that user is relevant to your
product sector.</li>
<li>Do spend that same budget to seed hundreds or thousands of users. Expect most of those tweets to
not travel very far, but at least you've gotten some decent reach for your budget.</li>
</ul>
