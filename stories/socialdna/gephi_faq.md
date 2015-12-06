.. title: Gephi FAQ
.. slug: gephi-faq
.. date: 2015-12-01 21:54:50 UTC-06:00
.. tags: gephi
.. category: 
.. link: 
.. description: 
.. type: text

# General questions

Most of these questions and answers are directly from when the course was taught by PJ Lamberson.
But since we're still going to use Gephi, I've ported all of the old questions and any new ones
we run into onto this page.

### Q1. How can I filter the network so that I only see the largest connected component?

A. In the statistics window, click the run button next to connected components. Then, switch to the
filters window. Select the Attributes folder, then the Partition folder. Then drag the "Component ID
(Node)" filter down to the Queries window where it says "Drag filter here". You can select which
component(s) you want to see by clicking on the check boxes next to the component numbers where it
says "Partition (Component ID) Settings" You can see what fraction of the nodes belong to each
component as a percentage next to each component number, so if you only want to see the largest
connected component, chose the one with the highest percentage. Then click Filter.
<br/> <br/>

### Q2. When I try to export my graph as a pdf, Gephi clips the node labels so that I can't see all of them. How do I fix this?

A. There is no good way to fix this, but there is a work around. When Gephi exports the image, it
only pays attention to nodes and links, not the labels, when it decides where to clip the image. To
make sure you get the full image, you can add some nodes around the edges of where you want to clip
the image. To do this, there is a tool on the left side of the overview window that looks like a
pencil (the top one of the two pencils). Just click on the screen with this tool where you want the
new node to appear. Put one node on the left, right, top and bottom at the boundary of where you
want the image to be clipped. Then, so these nodes don't actually show up, you can resize them so
that they're so small that they can't be seen. To do this, select the sizing tool, which looks like
a little diamond on the left side of the overview window. Then click on the node that you want to
resize and drag the mouse down to make the node smaller. This should fix the problem.
<br/>
<br/>

### Q3. Q3. I imported a graphml data file and I'm trying to use eignevector centrality (PageRank, HITS, …) to identify important nodes, but when I try to run the eigenvector centrality calculation from the Statistics window nothing happens. How do I fix this?

A. The problem is that the graphml file that you imported already has (empty) columns corresponding
to the measures that you want to calculate and Gephi won't overwrite them. To fix this, you first
have to delete those columns. Go into the data laboratory tab and delete any of the columns that
have to do with measures of centrality like eigenvector centrality, closeness centrality, betweeness
centrality, page rank, anything that looks like that.  Once you have done that go back to the
overview window and then run the calculation that you want under the statistics tab. If the little
window pops up with the graphs, then everything is working, if it doesn't then you need to go back
to the data laboratory and delete some more columns.
<br/>
<br/>

### Q4. I imported a node attribute that I want to use to resize my nodes, but it isn't showing up under the ranking tab. How do I fix this?

A. The most likely problem is that the node attribute is identified as the wrong type of data —
probably a String, when it needs to be a numeric type such as BigInteger. The easiest way to fix
this is to click Duplicate column in the data laboratory and then be sure to select a numeric type
(e.g. BigInteger or BigDecimal) for the duplicated column. Once you're done you can delete the
original node attribute column. The duplicated numeric column should now be accessible in the
rankings window.
<br/>
<br/>

### Q5. I'm trying to import an adjacency matrix that I have in a csv file, but I keep getting the java runtime error “java.lang.RuntimeException: java.lang.NullPointerException” What do I do?

A. For some reason, when importing an adjacency matrix Gephi expects a csv file with semicolon
separators, not commas. Just open your csv file using a simple text editor like NotePad or TextEdit
and then use the Find/replace command to change all of the commas to semicolons.
<br/>
<br/>

### Q6. I have a network in which there are different types of nodes (e.g. doctors and patients) and I would like to color the different types using different colors. How do I do this?

A. You need to import a new node attribute that gives the type for each node. To add a node
attribute, create a spreadsheet with one column labeled Id that contains a list of all of the names
of the nodes in your network. Be sure these are the same names that appear under the ID column in
the Data Laboratory in Gephi. Then add additional columns to the spreadsheet that give the node
attributes for each node. For example, you might have a column called "type" with entries like
"doctor" or "patient" that tells whether the corresponding node is a doctor or a patient. Once you
have created your spreadsheet, export it as a csv. Now, go back to Gephi with your existing network
file open. Under Data Laboratory, select Import Spreadsheet, and choose Nodes Table. Make sure that
the button “Force Nodes to be Created as New Ones” is not checked. and import the spreadsheet. This
should add a new column to the nodes table in the data laboratory. Then, using the partition tab,
you can color the nodes according to this attribute.
<br/>
<br/>

### Q7. I'm trying to import an adjacency matrix from a csv file, but I'm getting the error "java.lang.RuntimeException: java.lang.Exception: Inconsistent number of matrix lines compared to the number of labels” What do I do?

A. One thing to try is removing any extra spaces from your csv file. Sometimes these trip up the
import. Open the csv file using a simple text editor like NotePad or TextEdit, and then use
find/replace to remove any spaces. Save the adjacency matrix and then try importing it again.
<br/>
<br/>

### Q8. I'm trying to import an edge list, but I just get a bunch of nodes with no edges. What's going wrong?

A. Make sure that when you're importing the edge list from the data laboratory that you select
"Edges Table" in the drop down menu and not "Nodes Table." Otherwise it just thinks your bringing in
a list of nodes.
<br/>
<br/>

### Q9. I want to add labels to my network, but when I click the little black T, no labels show up (or the label isn't what I want it to be). How do I get the (right) labels?

A. You need to feed Gephi which column you want it to use for the labels. By default, Gephi uses the
data in the column "Labels." To change which column is used, from the over view screen, click the
small triangle in the lower right hand corner of the Graph window, which will reveal an extra
settings pane. Then choose the Labels tab. On the far right hand side of this window, click
"Configure…" then put a check mark next to any of the attributes that you would like to show up as
labels. Alternatively, in the Data Laboratory, you can just copy the column that you want to use as
labels in to the labels column.
<br/>
<br/>

### Q10. When I try and import an edge list, Gephi says I need Source and Target columns, but I already have Source and Target columns. What's going on?

A. There are probably extra spaces after the words Source and Target in your column headers. If you
delete these spaces you should be able to import the edge list.
