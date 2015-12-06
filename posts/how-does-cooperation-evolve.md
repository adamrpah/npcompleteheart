<!-- 
.. title: How does cooperation evolve?
.. slug: how-does-cooperation-evolve
.. date: 2015-01-25 09:47:41 UTC-05:00
.. tags: rationality, science, book, review
.. category: 
.. link: 
.. description: 
.. type: text
-->

<div class='row'>
<div class='col-md-8'>
I just finished reading Axelrod's <strong>The Complexity of Cooperation</strong> and I have to say, it's one of the better scientific books that I can remember reading (period). This is surprising (for me), since it's really just a collection of seven of his published papers along with some commentary. However, his papers are so well written and the commentary is brilliant, especially for someone pursuing research as a career, since it not only provides insight into the genesis of the work but also how it was regarded by journals.
</div>
<div class='col-md-4'>
<img src='/images/prisoners_dilemma.jpg'></img>
</div>

<!-- TEASER_END -->

<div class='col-md-12'>
<p>
This case is especially so for Chapters 4/5/7, which are concerned with his use of Landscape theory to predict alliances between nations and companies and the diffusion of culture. For all of these papers, he discusses the difficulties in publishing these pieces and then their lack of acceptance in the field at the time. For the landscape theories the lack of acceptance was primarily due to the nonexistence of rational agents and decision-making, while in the culture diffusion model it centered on the absence of "politics of any kind", as so succinctly stated by one reviewer.
</p>


<p>
In a hilarious twist, or maybe it's based solely on my anti-authoritarian leanings, these three papers were far and away my favorites of the entire compilation. The two landscape theory papers were concerned with predicting the formation of alliances, with Chapter 4 being focused on predicting the split of countries in World War II and Chapter 5 consortium alliances in setting Unix standards in the late 1980s. He describes the distaste that game theorists and (probably) economists had for this work since it didn't have a true "game" or rational decision agents, and instead was inspired by research on spin glass models and is, in reality, a method to find the energy landscape of possible group formations. In a somewhat hilarious turn, despite knowing more than a few people who have done research on spin glass models, this is probably the first piece of work that really made me appreciate the value that is in this model (which, honestly, was lacking in me before). 
</p>

<p>
But the two run away chapters in my mind were 6 and 7. Chapter 6 was focused on the evolution of new political actors that are superstructures of smaller actors (think the formation of a nation from colonies a la the United States) which was investigated with what he called the tribute model. This was a relatively simple model where an actor in the game is selected at random and then is given the opportunity to attack another actor, which it will do so long as any other actor has less wealth than it does (otherwise it would be trounced in a fight). The opposing actor in this confrontation has the choice between fighting or paying tribute, and it simply selects whichever option costs less. Whenever an actor pays a tribute to another actor this builds a bond between the two and this bond comes into play when one of the actors is attacked by an outsider. What happens then is any actor in an alliance with the attacked country has this obligation to defend its ally, which further reinforces the bond between the two initial actors. Through simulation results results Axelrod showed that these simple behaviors were able to cause the formation of essentially new political actors, namely superstructures of actors with typically one dominant actor that was the caretaker of several minor actors. Furthermore, despite the simplicity of this model there is considerable complexity in the dynamics, namely that it there are many, distinctly different scenarios that can play out at random at 10,000 or more steps into the simulation.
</p>

<p>
Chapter 7 was an, almost unbelievably simple model that focused on cultural diffusion. Each agent in a 2-dimensional grid was initialized with a vector of cultural traits for <i>n</i> cultural features. The play of this model was very simple, at random an agent within the grid was selected and with some probability, based on homophily with a neighbor, a dissimilar trait is diffused. There were four major results from this model, with two being relatively intuitive and the other two being momentary head-scratchers.
</p>

<p>
First, there is the concern of geography. A relatively intuitive result is that the number of stable groups in the population decreases as each agent has more neighbors. This is similar to the first question that comes to mind now, which is what about the internet. What it basically says is that as we have the ability to contact more people, it is more likely we will find a similar person to share traits with. This helps the system reach a relatively smaller number of overall groups. The other was with the size of the grid. In this case there are relatively few cultural groups when the grid is small (say a 5x5 grid) and more as the grid grows into moderate sizes (about 20x20), so far so good in terms of making sense. However, after this point the number of stable final groups starts to decrease, now why is that? Based on the simulations we find out that in a very large grid most of the time is actually just spent with two competing dialects (i.e. a majority with a dialect vector of <1,1,1,1,2> and a minority with <1,1,1,1,1>) fighting each other. However, while this process is like a random walk, there is a twist that there is a boundary, basically change in the size of the populations can only occur at the border were a majority agent and a minority agent meet. This means that it is most likely that the majority will subsume the minority, it is just that it will take a longer time than in a smaller grid. In the larger population grid, this border is larger which means that while it seems like there will be <b>more</b> cultural regions to (which is true), there ends up being <b>less</b> distinct cultural regions because of the overlap in beliefs and this establishment of cultural zones. Basically in any case where two agent share one feature there is the chance that they will assimilate.
</p>

<p>
Second, is the concern of cultural traits and features, which is slightly more straightforward. The greater the number of cultural traits for a given feature, the more cultural regions that can be expected to form. This is fairly simple, as the number of opinions/options on a distinct issue grow, the easier it is to be surrounded by someone who does not share a similar viewpoint on any of the cultural features. This is something that made me immediately think back to high school, with music and the cliques that formed around them. As each musical genre continued to subdivide (I myself was in the skacore clique), the smaller and more numerous the groups became. What is mildly surprising is the result for cultural features, which shows that as the number of features <b>increases</b> the number of groups <b>decreases</b>. After a hot minute this makes sense though, the more issues that exits the easier it is to find <b>at least one</b> that I agree on with a neighbor. After this initial icebreaker of an agreement it's much easier to open the lines of communication, so to speak, and begin transferring ideas and opinions.
</p>

<p>
However, the main question that I still have of this model is one of cultural drift. Axelrod addressed this (and the reviewers requested) but the simulation results proved too thorny to unpack easily. I haven't had the time to do a literature search yet so this may be an answered question (the book is 17 years old), but it seems to be a fundamental one. This is especially so with my research interest on the diffusion of innovations within a system What is necessary for new "traits" that are introduced to survive, especially after a system has already reach a steady state? Is it necessary for a system to be in a dynamic state for these traits to survive? I think that these are interesting questions that may be out of reach for the model but that's never stopped me from wasting a week of work....
</p>

<p>
In any case this is wonderful book that only takes about a night and a glass of whiskey to finish, which means that you really can't go wrong.
</p>
</div>
</div>
