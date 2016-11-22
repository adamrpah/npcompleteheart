$("#restart").click(function(){
  viz_change()
})

var main = function(netfile){
  d3.json(netfile, function(error, graph) {
    var player = 'Player 1';
    var p1Coins = 50;
    var p2Coins = 50;
    function findNeighbors(node) {
        var neighbors = [];
        for (var i = 0; i < graph.links.length; i++) {
            var testLink = graph.links[i];
            if (testLink.source == node) neighbors.push(testLink.target);
            if (testLink.target == node) neighbors.push(testLink.source);
        }
        return neighbors;
    }

    function findLinks(node) {
      var neighborLinks = [];
      for (var i = 0; i < graph.links.length; i++) {
          var testLink = graph.links[i];
          if (testLink.source == node)
           neighborLinks.push(graph.links[i]);

           //find source, and find target and redraw line??
      }
      return neighborLinks;
    }

    function findNeighborColors(node) {
        var neighbors = [];
        for (var i = 0; i < graph.links.length; i++) {
            var testLink = graph.links[i];
            if (testLink.source == node) {
              neighbors.push(testLink.target.color);
            }
            if (testLink.target == node) {
              neighbors.push(testLink.source.color);
            }
        }
        return neighbors;
    }

    function countNodeColors(color) {
      color_count = 0;
      for (i in nodes) {
          if (nodes[i]['color'] == color) {
              color_count += 1;
          }
      };
      return color_count;
    }

    function barCounts(color_count) {
      var keys = [];
      var values = [];
      for(var k in color_count) keys.push(k);
      for(var k in color_count) values.push(color_count[k]);
      return [keys, values];
    }

    function countAllColors() {
        nblack = countNodeColors('black');
        ngreen = countNodeColors('green');
        nblue = countNodeColors('blue');
        return {'black': nblack, 'green': ngreen, 'blue': nblue};
    }

    function nodeClick(d, i) {   ///WHERE Do the arguments come from? They're not referenced where nodeClick is called
      var green = 'rgb(0, 128, 0)';
      var blue = 'rgb(0, 0, 255)';
      var black = 'rgb(0, 0, 0)';
      var cmap = {'rgb(0, 128, 0)' : 'green', 'rgb(0, 0, 255)': 'blue', 'rgb(0, 0, 0)': 'black'};
      var inode = d3.select(this);
      var node_color = inode.style('fill');
      var nodeCost = inode.attr("r");


      if (player=='Player 1') {
        if (p1Coins - nodeCost >= 0 && node_color == 'rgb(0, 0, 0)') {
        var sugg_fill_color = 'rgb(0, 128, 0)';
        var sugg_fill_color_label = 'green';
        p1Coins = p1Coins - nodeCost;
        coinText.text("Coins Remaining: " + p1Coins);
        inode.style('fill', sugg_fill_color);
        nodes[i]['color'] = sugg_fill_color_label;
        }
        else if (node_color == 'rgb(0, 128, 0)') {
          inode.style('fill', 'black');
          nodes[i]['color'] = black;
          p1Coins = parseInt(p1Coins) + parseInt(nodeCost);
          coinText.text("Coins Remaining: " + p1Coins);
        }
        else if (node_color == 'rgb(0, 0, 255)') {
          window.alert("Uh, this isn't your node.");
        }
        else {
          window.alert("You Don't have enough bears!");
        }

      }


      else {   //if Player 2
        if (p2Coins - nodeCost >= 0 && node_color == 'rgb(0, 0, 0)') {
        var sugg_fill_color = 'rgb(0, 0, 255)';
        var sugg_fill_color_label = 'blue';
        p2Coins = p2Coins - nodeCost;
        coinText.text("Coins Remaining: " + p2Coins);
        inode.style('fill', sugg_fill_color);
        nodes[i]['color'] = sugg_fill_color_label;
        }
        else if (node_color == 'rgb(0, 0, 255)') {
          inode.style('fill', 'rgb(0, 0, 0)');
          nodes[i]['color'] = black;
          p2Coins = parseInt(p2Coins) + parseInt(nodeCost);
          coinText.text("Coins Remaining: " + p2Coins);
        }
        else if (node_color == 'rgb(0, 128, 0)') {
          window.alert("Uh, this isn't your node.");
        }
        else {
          window.alert("You Don't have enough coins!");
        }
      }

    }



//Hover functions
    function hoverFunc (d, i) {
      var inode = d3.select(this);
      var hoverRadius = inode.attr("r");
      var neighborNodes = findNeighbors(nodes[i]);
      var hoverDegree = neighborNodes.length;
      var neighborLinks = findLinks(nodes[i]);
      // var link = svg.selectAll(".link")
      //     .data(graph.links)
      //   .enter().append("line")
      //     .attr("class", "link")
      //     .style("stroke-width", function(d) { return Math.sqrt(d.value); });

      // link.style("stroke-width", "3px");
      // neighborLinks.style("stroke-width","10px");
      // window.alert(graph.links[1]);

      for (ni in neighborNodes) {
        //neighbor node colors
        d3.select(node[0][neighborNodes[ni].index]).style("stroke", "rgb(250, 160, 122)").style("stroke-width", "3px");
      }
      infoText.text("Node Cost: " + hoverDegree);
      //hovered node color
      inode.style("stroke", "rgb(255, 0, 0)")
      .style("stroke-width", "5px");

    }
    function noHover (d, i) {
      var inode = d3.select(this);
      var neighborNodes = findNeighbors(nodes[i]);
      inode.style("stroke-width", "1.5px").style("stroke", "white");
      infoText.text("Node Cost: " );


      for (ni in neighborNodes) {
        d3.select(node[0][neighborNodes[ni].index]).style("stroke", "white").style("stroke-width", "1.5px");
      }
    }







    function runOnce() {
      //This changes how we push through color with a threshold or not
      if ( thresholder == 'Threshold Off') {
        //Iterate through each node
        var color_nodes = [];
        for (i in nodes) {
          if (nodes[i]['color'] == 'green' || nodes[i]['color'] == 'blue') {
              color_nodes.push(nodes[i]);
          }
        }
        //Go through the color nodes
        for (j in color_nodes) {
          neighbors = findNeighbors(color_nodes[j]);
          for (ni in neighbors) {
              neigh_color = nodes[neighbors[ni].index]['color'];
              if (neigh_color == 'black') {
                  nodes[neighbors[ni].index]['color'] = color_nodes[j]['color'];
                  d3.select(node[0][neighbors[ni].index]).style('fill', color_nodes[j]['color']);
              }
          }
        }
      } else {
        //Iterate through every node
        for (i in nodes) {
          //If the node color is black then we proceed
          if (nodes[i]['color'] == 'black') {
            neighbor_colors = findNeighborColors(nodes[i]);
            //count it up
            var counts = {};
            for(var kk = 0; kk< neighbor_colors.length; kk++) {
                  var num = neighbor_colors[kk];
                  counts[num] = counts[num] ? counts[num]+1 : 1;
            }
            //add missing color keys
            if ( !("blue" in counts) ) {
              counts['blue'] = 0;
            }
            if ( !("green" in counts) ) {
              counts['green'] = 0;
            }
            //Now lets keep it real
            if (counts['blue'] > counts['green'] && counts['blue'] > 1) {
                nodes[i]['color'] = 'blue';
                d3.select(node[0][nodes[i].index]).style('fill', 'blue');
            } else if (counts['green'] > counts['blue'] && counts['green'] > 1) {
                nodes[i]['color'] = 'green';
                d3.select(node[0][i]).style('fill', 'green');
            }
          }
        }
      }
      //Count the colors
      color_count = countAllColors();
      b_count = barCounts(color_count);
      keys = b_count[0];
      values = b_count[1];
      redraw();
      return color_count;
    }

    $("#button_labels").click(function(){
       button_text = this.value;
       if (button_text == 'Player 1') {
           player = 'Player 2';
           $(this).text("Player 2");
           d3.select("#button_labels").attr("value", "Player 2");

           coinText.text("Coins Remaining: " + p2Coins);
      } else {
          player = 'Player 1';
          $(this).text("Player 1");
          d3.select("#button_labels").attr("value", "Player 1");
          coinText.text("Coins Remaining: " + p1Coins);
      }
    })

    $("#threshold").click(function(){
       button_text = this.value;
       if (button_text == 'Threshold Off') {
           thresholder = 'Threshold On';
           $(this).text("Threshold On");
           d3.select("#threshold").attr("value", "Threshold On");
      } else {
          thresholder = 'Threshold Off';
          $(this).text("Threshold Off");
          d3.select("#threshold").attr("value", "Threshold Off");
      }
    })

    $('#run_once').click(function() {
        color_count = runOnce();
    })

    $("#run_sim").click(function() {
      //Count the colors
      color_count = countAllColors();
      //Start a while loop
      while (color_count['black'] > 0) {
          color_count = runOnce();
      }
    })

    function redraw() {
      svg.selectAll("rect")
          .data(values)
        .transition()
          .duration(1000)
          .attr("width", x);
    }

    // var player = 'Player 1';
    var thresholder = 'Threshold On';
    var width = 900;
    var height = 800;

    var nodeData = [""];

    $("#chart1").width(width + "px");
    $("#chart1").height(height + "px");

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = width - 100 - margin.left - margin.right;
    var height = height - 100 - margin.top - margin.bottom;

    var svg = d3.select("#chart1").append("svg")
      .style("position", "relative")
      .style("max-width", "960px")
      .attr("width", width + "px")
      .attr("height", (height - 50) + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scale.category20();

    //Find the maximum and minum degree
    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });



    var node = svg.selectAll(".node")
        .data(graph.nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("r", function(d, i) { return d.weight ; })
        .style("fill", function(d) { return 'black'; })
        .call(force.drag)
        .on("mouseover", hoverFunc)
        .on("mouseout", noHover)
        .on("click", nodeClick);



    node.append("title")
        .text(function(d) { return d.name; });
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });

    //get the nodes
    nodes = force.nodes();
    for (xx in nodes){
        nodes[xx]['color'] = 'black';
    }

    //Start a bar chart
    color_count = countAllColors();
    b_count = barCounts(color_count);
    keys = b_count[0];
    values = b_count[1];
    //make the scale
    var x = d3.scale.linear()
      .domain([0, d3.max(values) + 20])
      .range([0, width - 200]);

    var y = d3.scale.ordinal()
         .domain([1, 2, 3])
         .rangeBands([0, 60]);
    //setup the svg
    var nodeInfo = d3.select("#infoWindowChart")
       .append("svg:svg")
       .attr("width", width/2)
       .attr("height", '80px')
       .append("svg:g");
    var infoText = nodeInfo.selectAll("text")
        .data(nodeData)
        .enter()
        .append("text");
    var textLabels = infoText.attr("x", 30)
        .attr("y", 40)
        .text("Node Cost: ")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "red");

    var coinCounterChart = d3.select("#infoWindowChart")
       .append("svg:svg")
       .attr("width", width/2)
       .attr("height", '80px')
       .append("svg:g");
  var coinText = coinCounterChart.selectAll("text")
       .data([""])
       .enter()
       .append("text");
    var coinCounterLabels = coinText.attr("x", 30)
        .attr("y", 50)
        .text("Coins Remaining: " + p1Coins)
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black");

    var svg = d3.select("#chart2").append("svg:svg")
       .attr("width", width)
       .attr("height", '80px')
       .append("svg:g")
       .attr("transform", "translate(10,15)");;

    svg.selectAll("rect")
         .data(values)
       .enter().append("svg:rect")
         .attr("y", function(d, i) { return i * 20; })
         .attr("width", x )
         .attr("height", 20)
         .style('fill', function(d,i) { return keys[i]; });

   svg.selectAll("line")
          .data(x.ticks(10))
        .enter().append("svg:line")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", 120)
          .attr("stroke", "#ccc");

   svg.selectAll("text.rule")
             .data(x.ticks(10))
           .enter().append("svg:text")
             .attr("class", "rule")
             .attr("x", x)
             .attr("y", 0)
             .attr("dy", -3)
             .attr("text-anchor", "middle")
             .text(String);

   svg.append("svg:line")
          .attr("y1", 0)
          .attr("y2", 120)
          .attr("stroke", "#000");

  });

}

var viz_change = function(){
  //remove the svg
  $('svg').remove();
  //set up the labels
  $('#button_labels').text("Player 1");
  d3.select("#button_labels").attr("value", "Player 1");
  //run i tup the flag pole
  var netfile = $('#data_sources').chosen().val();
  main(netfile)
}

//Code calls
////Set up chosen
$(".chzn-select").chosen();
////Call the viz_change immediately to initialize
viz_change();
////Selector box change code.  All use the same function, since combined they identify the file
$("#data_sources").chosen().change(viz_change)
