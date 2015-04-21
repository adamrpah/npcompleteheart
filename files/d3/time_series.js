function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var dates = [];
var data = [];
var pointRadius = 2;

$.getJSON("/d3/time_series.json", function(json) {
  $.each(json, function(key,value) {
      data.push(value)
      //Correct the seconds since epoch for python -> javascript
      var eptime = parseFloat(key) * 1000
      dates.push(eptime)
    });

  //Sort the data for Safari #@!$%
  dates.sort()
  data.sort()

  //Set the area parameters
  var margin = 110
  var m = [margin/3.5, margin, margin/3.5, margin]; // margins
  var w = 800 - m[1] - m[3];     // width
  var h = 500 - m[0] - m[2]; // height

  // X scale starts at epoch time 1335035400000, ends at 1335294600000 with 300s increments
  var x = d3.time.scale().domain([dates[0], dates[dates.length - 1]]).range([0, w]);
  x.tickFormat(d3.time.format("%Y-%m-%d-%H-%M"));
  // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
  var digitLength = 100000
  var y = d3.scale.linear().domain([Math.floor(d3.min(data, function(d) { return d; })/digitLength)*digitLength, 
                                    d3.max(data, function(d) { return d; })])
                           .range([h,0]);

  var line1 = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d,i) { 
            // verbose logging to show what's actually being done
            //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            // return the X coordinate where we want to plot this datapoint
            return x(dates[i]);
    })
    .y(function(d,i) { 
            // verbose logging to show what's actually being done
            //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d); // use the 1st index of data (for example, get 20 from [20,13])
    })
  var graph = d3.select("#timeseries_main")
                              .attr("width", w + m[1] + m[3])
                              .attr("height", h + m[0] + m[2])
                            .append("svg:g")
                              .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
  // create yAxis
  var xAxis = d3.svg.axis().scale(x).ticks(9).tickSize(-h).tickSubdivide(1);

  // Add the x-axis.
  graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);


  // create left yAxis
  var yAxisLeft = d3.svg.axis().scale(y).ticks(7).orient("left");
  // Add the y-axis to the left
  graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-10,0)")
        .call(yAxisLeft);
  
  graph.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -110)
        .attr("x", -140)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Quantity X"); 
  // add lines
  // do this AFTER the axes above so that the line is above the tick-lines
  graph.append("svg:path").attr("d", line1(data)).attr("class", "data1");

  dataCirclesGroup = graph.append('svg:g');
  var circles = dataCirclesGroup.selectAll('.data-point')
      .data(data);

    circles
      .enter()
        .append('svg:circle')
          .attr('class', 'data-point')
          .style('opacity', 1e-6)
          .attr('cx', function(d,i) { return x(dates[i]) })
          .attr('cy', function() { return y(0) })
          .attr('r', function() { return (data.length) ? pointRadius : 0 })
        .transition()
          .style('opacity', 1)
          .attr('cx', function(d,i) { return x(dates[i]) })
          .attr('cy', function(d) { return y(d) });

    circles
      .transition()
        .attr('cx', function(d,i) { return x(dates[i]) })
        .attr('cy', function(d) { return y(d) })
        .attr('r', function() { return (data.length) ? pointRadius : 0 })
        .attr('index', function(d,i) { return i; })
        .style('opacity', 1);

    circles
      .exit()
        .transition()
          // Leave the cx transition off. Allowing the points to fall where they lie is best.
          //.attr('cx', function(d, i) { return xScale(i) })
          .attr('cy', function() { return y(0) })
          .style("opacity", 1e-6)
          .remove();


      $('svg circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        title: function() {
          var d = this.__data__;
          return numberWithCommas(d) + 
                 '<br/> on ' + Date(dates[$(this).attr("index")]); 
        }
      });
});
