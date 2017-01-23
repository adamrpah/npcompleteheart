$("#restart").click(function(){

  viz_change("scale_free.json")
})


$("#home_page").click(function(){
  $('#chart1').show();
  $('#chart2').show();
  $('#second_row').show();
  $('#node_cost').show();
  $('#coins_remaining').show();
  $('#high_scores_table').hide();
  $('#high_scores').html('High Scores');
})

var names = [];
var toggle = 0;
var toggle_2 = 0;
var main = function(netfile){
  $('#high_scores_table').hide();
  $('#saver_form').hide();
  var p1Coins = 50;
  var p2Coins = 50;
  d3.json(netfile, function(error, graph) {
    var player = 'Player 1';
    // var p1Coins = 50;
    // var p2Coins = 50;
    function findNeighbors(node) {
        var neighbors = [];
        for (var i = 0; i < graph.links.length; i++) {
            var testLink = graph.links[i];
            if (testLink.source == node) neighbors.push(testLink.target);
            if (testLink.target == node) neighbors.push(testLink.source);
        }
        return neighbors;
    }
    function findNeighborLinks(node) {
        var neighborLinks = [];
        for (var i = 0; i < graph.links.length; i++) {
            var testLink = graph.links[i];
            if (testLink.source == node)
            neighborLinks.push(i);
            if (testLink.target == node)
            neighborLinks.push(i);
        }
        return neighborLinks;
    }
    //maybe
    // function findL sinks(node) {
    //   var neighborLinks = [];
    //   for (var i = 0; i < graph.links.length; i++) {
    //       var testLink = graph.links[i];
    //       if (testLink.source == node)
    //        neighborLinks.push(graph.links[i]);
    //
    //        //find source, and find target and redraw line??
    //   }
    //   return neighborLinks;
    // }

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

    function nodeClick(d, i) {
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
        document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p1Coins;
        inode.style('fill', sugg_fill_color);
        nodes[i]['color'] = sugg_fill_color_label;
        }
        else if (node_color == 'rgb(0, 128, 0)') {
          inode.style('fill', 'black');
          nodes[i]['color'] = black;
          p1Coins = parseInt(p1Coins) + parseInt(nodeCost);
          document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p1Coins;
        }
        else if (node_color == 'rgb(0, 0, 255)') {
          window.alert("Uh, this isn't your node, dude.");
        }
        else {
          window.alert("You don't have enough coins!");
        }

      }


      else {   //if Player 2
        if (p2Coins - nodeCost >= 0 && node_color == 'rgb(0, 0, 0)') {
        var sugg_fill_color = 'rgb(0, 0, 255)';
        var sugg_fill_color_label = 'blue';
        p2Coins = p2Coins - nodeCost;
        // coinText.text("Coins Remaining: " + p2Coins);
        inode.style('fill', sugg_fill_color);
        nodes[i]['color'] = sugg_fill_color_label;
        document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p2Coins;
        }
        else if (node_color == 'rgb(0, 0, 255)') {
          inode.style('fill', 'rgb(0, 0, 0)');
          nodes[i]['color'] = black;
          p2Coins = parseInt(p2Coins) + parseInt(nodeCost);
          document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p2Coins;
        }
        else if (node_color == 'rgb(0, 128, 0)') {
          window.alert("Uh, this isn't your node, dude.");
        }
        else {
          window.alert("You don't have enough coins!");
        }
      }

    }



//Hover functions
    function hoverFunc (d, i) {
      //get node of interest
      var inode = d3.select(this);
      var hoverRadius = inode.attr("r");
      var hoverDegree = findNeighbors(nodes[i]).length;
      //color node of interest
      inode.style("stroke", "grey").style("stroke-width", "5px");
      infoText.text("Node Cost: " + hoverDegree);
      document.getElementById("node_cost").innerHTML = "Node Cost: " + hoverDegree;
      //for the nearby neighbornodes
      var neighborNodes = findNeighbors(nodes[i]);
      for (ni in neighborNodes) {
        //neighbor node colors
        d3.select(node[0][neighborNodes[ni].index]).style("stroke", "rgb(250, 160, 122)").style("stroke-width", "3px");
      }
      var neighborLinks = findNeighborLinks(nodes[i]);
      for (li in neighborLinks) {
        d3.select(link[0][neighborLinks[li]]).style("stroke", "rgb(250, 160, 122)").style("stroke-width", "3px");
      }

      // d3.selectAll(".link").style("stroke-width", "3px" ); //works
      // d3.select(graph.links).style("stroke-width", "3px" );  //doesn't work
    }

    function noHover (d, i) {
      var inode = d3.select(this);
      var neighborNodes = findNeighbors(nodes[i]);
      var neighborLinks = findNeighborLinks(nodes[i]);
      inode.style("stroke-width", "1.5px").style("stroke", "white");
      document.getElementById("node_cost").innerHTML = "Node Cost: ";

      for (ni in neighborNodes) {
        d3.select(node[0][neighborNodes[ni].index]).style("stroke", "white").style("stroke-width", "1.5px");
      }
      for (li in neighborLinks) {
        d3.select(link[0][neighborLinks[li]]).style("stroke", "grey").style("stroke-width", "1px");
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
           document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p2Coins;
      } else {
          player = 'Player 1';
          $(this).text("Player 1");
          d3.select("#button_labels").attr("value", "Player 1");
          document.getElementById("coins_remaining").innerHTML = "Coins Remaining: " + p1Coins;
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
    var width = 700;
    var height = 600;

    var nodeData = [""];

    $("#chart1").width(width + "px");
    $("#chart1").height(height + "px");
    var margin = {top: 0, right: 0, bottom: 0, left:0}; //{top: 20, right: 20, bottom: 30, left: 40};
    // var width = width - 100 - margin.left - margin.right;
    // var height = height - 100 - margin.top - margin.bottom;

    var svg = d3.select("#chart1").append("svg")
      .style("position", "relative")
      .style("max-width", "700px")
      .attr("width", width + "px")
      .attr("height", height + "px")
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

//Draws links between nodes
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
       .style("float","left")
       .attr("height", '80px')
       .append("svg:g");
    var infoText = nodeInfo.selectAll("text")
        .data(nodeData)
        .enter()
        .append("text");
    var textLabels = infoText.attr("x", 30)
        .attr("y",43)
        .text("Node Cost: ")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black");

  //   var coinCounterChart = d3.select("#infoWindowChart")
  //      .append("svg:svg")
  //     //  .style("float","left")
  //      .attr("width", width/2)
  //      .attr("height", '80px')
  //      .append("svg:g");
  // var coinText = coinCounterChart.selectAll("text")
  //      .data([""])
  //      .enter()
  //      .append("text");
  //   var coinCounterLabels = coinText.attr("x", 30)
  //       .attr("y", 40)
  //       .text("Coins Remaining: " + p1Coins)
  //       .attr("font-family", "sans-serif")
  //       .attr("font-size", "14px")
  //       .attr("fill", "black");

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

//This is drawing the ticks for the measure bar
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


          $("#saver").click(function(){
            if (toggle_2 ==0){
            $('#saver_form').show();
            toggle_2 = 1;
          }
            else {
              $('#saver_form').hide();
              toggle_2 = 0;
            }
          });

          $(document).on('click', '#player_myButton', function() {
            var $player_name = $("input[name=player_form]").val();

            // var namePair = {player_name_2:'', score:2};
            $('#saver_form').hide();
            $("#table_entries").remove();
            if (player=='Player 1') {
            names.push({playerName:$player_name, nodeCount:countNodeColors('green')});
          }
          else {
            names.push({playerName:$player_name, nodeCount:countNodeColors('blue')});
          }
            //here need to work on sorting thesee before moving on to the next part
            names.sort(function(aa,bb){
              return aa.nodeCount - bb.nodeCount
            })
            var html_table = '';
            var rank = 1;

            for (var score_i = names.length - 1; score_i >= 0 ;) {
              html_table = html_table + '<tr id="table_entries"><th scope="row">' + rank +'</th><td>'+names[score_i].playerName+'</td><td>'+names[score_i].nodeCount+'</td></tr>';
              score_i = score_i - 1;
              rank = rank + 1;
            }

            $('#table_entries').remove();
            $('#highScoreTable').append(html_table);


          });


          //HERE //here we're trying to dynamically update the table elements from the array names[], who's even elements are names and whose odd are the corresponding scores
          // $(document).ready(function() {
            $(document).on('click', '#high_scores', function(){
              if (toggle == 0) {
            $('#chart1').hide();
            $('#chart2').hide();
            $('#second_row').hide();
            $('#node_cost').hide();
            $('#coins_remaining').hide();
            $('#high_scores_table').show();
            $('#high_scores').html('Keep Playing');


            // var table_open = '<table class="table" id="high_scores_table" style="margin-top:100px;">\
            //   <thead>\
            //     <tr>\
            //       <th>Rank</th>\
            //       <th>Name</th>\
            //       <th>Score</th>\
            //     </tr>\
            //   </thead>\
            //   <tbody id="highScoreTable">';

            // $('#row_top').append(table_open + html_table + '</tbody></table>');



            toggle = 1;
          }//end of toggle
          else {
            $('#chart1').show();
            $('#chart2').show();
            $('#second_row').show();
            $('#node_cost').show();
            $('#coins_remaining').show();
            $('#high_scores_table').hide();
            $('#high_scores').html('High Scores');
            toggle = 0;
          }
            // ($('<tr><th scope="row">' + names[0] +'</th><td>cash</td><td>joe</td></tr>'));



          });




            // for (var score_i = 0; score_i < names.length; score_i ++) {
            //   var rank = score_i + 1;
            //   $('#highScoreTable').append($('<tr><th scope="row">' + rank + '</th><td>bill</td><td>joe</td></tr>'));
            // }
          // });





  }); //end of d3.json





}//end of main

var viz_change = function(netfile){
  //remove the svg
  $('svg').remove();
  //set up the labels
  $('#coins_remaining').html("Coins Remaining: 50");
  $('#button_labels').text("Player 1");
  d3.select("#button_labels").attr("value", "Player 1");
  //run i tup the flag pole
  main(netfile)
}

//Code calls
////Set up chosen
// $(".chzn-select").chosen();
////Call the viz_change immediately to initialize
viz_change("caveman.json");
////Selector box change code.  All use the same function, since combined they identify the file
// $("#data_sources").chosen().change(viz_change);

//////////////
$('#scale_f').on('click', function(){
  viz_change("scale_free.json");
});

$('#clustered_net').on('click', function(){
  viz_change("caveman.json");
});

$(document).ready(function() {
      $('form#player_form').keyup(function() {
          var empty = false;
          $('.player_field input').each(function() {
              if ($(this).val().length == 0) {
                  empty = true;
              }
          });
          if (empty) {
              $('.form-group button').attr('disabled', 'disabled');
          } else {
              $('.form-group button').removeAttr('disabled');
          }
      });

  });
