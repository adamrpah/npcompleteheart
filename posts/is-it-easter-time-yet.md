<!-- 
.. title: Is it Easter time yet?
.. slug: is-it-easter-time-yet
.. date: 2013-10-05 07:44:44 UTC-05:00
.. tags: artesque, random
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
I'm developing an node.js application with a friend and after a few weeks of actual coding we decided to change the name of one of the models from "Organization" to "Board". Pretty simple change actually, the design of the app had changed slightly enough that the rewording would make more mental sense for us.
</p>

<p>
So as I'm on the call I change the initial model details in the file and then change it in the router file where I know it's been used so far. Before I add the changes and commit though, I just run a quick check to make sure that it doesn't appear anywhere else like so:
<br/>
<pre>
$ grep -R organization .
</pre>
</p>

<p>
...and then I got this fun little surprise.
</p>

<!-- TEASER_END -->

<p>
lola:company-dumps adampah$ grep -r organization .
./node_modules/handlebars/node_modules/optimist/node_modules/wordwrap/test/idleness.txt:Modern technique has made it possible to diminish enormously the amount of labor required to secure the necessaries of life for everyone. This was made obvious during the war. At that time all the men in the armed forces, and all the men and women engaged in the production of munitions, all the men and women engaged in spying, war propaganda, or Government offices connected with the war, were withdrawn from productive occupations. In spite of this, the general level of well-being among unskilled wage-earners on the side of the Allies was higher than before or since. The significance of this fact was concealed by finance: borrowing made it appear as if the future was nourishing the present. But that, of course, would have been impossible; a man cannot eat a loaf of bread that does not yet exist. The war showed conclusively that, by the scientific organization of production, it is possible to keep modern populations in fair comfort on a small part of the working capacity of the modern world. If, at the end of the war, the scientific organization, which had been created in order to liberate men for fighting and munition work, had been preserved, and the hours of the week had been cut down to four, all would have been well. Instead of that the old chaos was restored, those whose work was demanded were made to work long hours, and the rest were left to starve as unemployed. Why? Because work is a duty, and a man should not receive wages in proportion to what he has produced, but in proportion to his virtue as exemplified by his industry.
./node_modules/handlebars/node_modules/optimist/node_modules/wordwrap/test/idleness.txt:If the ordinary wage-earner worked four hours a day, there would be enough for everybody and no unemployment -- assuming a certain very moderate amount of sensible organization. This idea shocks the well-to-do, because they are convinced that the poor would not know how to use so much leisure. In America men often work long hours even when they are well off; such men, naturally, are indignant at the idea of leisure for wage-earners, except as the grim punishment of unemployment; in fact, they dislike leisure even for their sons. Oddly enough, while they wish their sons to work so hard as to have no time to be civilized, they do not mind their wives and daughters having no work at all. the snobbish admiration of uselessness, which, in an aristocratic society, extends to both sexes, is, under a plutocracy, confined to women; this, however, does not make it any more in agreement with common sense.
</p>

<p>
I love it. :)
</p>

