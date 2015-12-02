.. title: Gephi File I/O
.. slug: gephi-io
.. date: 2015-12-01 21:54:37 UTC-06:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text

#In what ways do networks come?

### Or more accurately, what can I load in Gephi?

There are a number of ways that you can store network data and Gephi will accept most of those
formats. Here I'll try to give you an overview of the different file types and how they are stored.
This list isn't exhaustive, but is directed towards what Gephi can load.

To show the differences I've created a very simple sample network with only four nodes. The network
looks like this:

<img src='/images/example_network.png' style='width:400px;' align='middle'/>

Told you it was simple! I'll go through each of these file formats and show what the network would
look like in each.


<div class="row" style='padding-top:30px;padding-bottom:30px;'>
<!-- title -->
<div class="col-md-8">
<h3>CSV files</h3>
A CSV file is a very generic file format and you're probably already seen it elsewhere. If you open
a CSV file in Excel you'll see a spreadsheet, if you open it in a text editor you'll just see rows
of values separated by commas (thus where the name comes from: CSV='comma-separate values'). You can
store as many values as you want in each row but the simplest example of a network stored in a CSV
is one where you have two columns of node names. Each row represents an edge and establishes a  connection 
from one node to another node.

A CSV file can be useful because you can store a large number of attributes for the edges by just
having additional columns. So you could label an edge as 'friend' or 'enemy' if you had a high
school social network for example.
</div>
<!-- image -->
<div class="col-md-4">
<img src='/images/network_csv.png'/>
</div>
<!-- End the first row -->
</div>


<div class="row" style='padding-bottom:30px;'>
<!-- title -->
<div class="col-md-8">
<h3>Edgelists</h3>
An edgelist is very simple and is similar to a very basic CSV file. Each edge is a single line in
the file and the two connected nodes are listed. The difference is that a space separates the node
names instead of a comma. Typically this will be the only information contained in edgelist,
although sometimes there is a third field (again separated by a space) that would be the numeric
weight of the edge. Edge lists are very simple (both visually and to make by hand), which leads to
their general availability but inability to add complex additional information (like hierarchy or
where nodes should be placed in an image).
</div>
<!-- image -->
<div class="col-md-4">
<img src='/images/network_edges.png'/>
</div>
<!-- End the first row -->
</div>

<div class="row" style='padding-bottom:30px;'>
<!-- title -->
<div class="col-md-8">
<h3>GEXF</h3>
A GEXF file is a much more complicated structure. It uses XML (which is a markup format for storing data), which isn't very friendly to a normal human to write but very easy for a computer. Because of this it can store lots of additional information (like how the graph should be visualized), but you wouldn't want to write it by hand.

</div>
<!-- image -->
<div class="col-md-4">
<img src='/images/network_gexf.png'/>
</div>
<!-- End the first row -->
</div>
