<!-- 
.. title: Make maps like a boss
.. slug: make-maps-like-a-boss
.. date: 2014-05-17 08:05:40 UTC-05:00
.. tags: python, web, gis, tutorial, code
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
When I worked on metabolism I didn't have any needs to plot data on an actual geographic area (although I always wished some form of coordinate system existed like that for my data). But in my switch to working with health data I now have tons of spatial data. Moreover this spatial component is a fairly important effect on the patterns and behavior that I observe. 
</p>

<!-- TEASER_END -->

<p>
So far I've been working with a GIS specialist (if you've looked at the maps in my small area estimation <a href="http://npcompleteheart.com/post/ever-wanted-to-estimate-small-area-effects-in-heal/">post</a> those are from him), but that's not an ideal situation when I only need a quick picture or to look at how data is distributed in space. When I needed to place data on a map previously I typically needed interactivity, so I would make a visualization with D3.js. But now I just need to make lots of maps quickly to just do exploratory analysis. Fortunately, I was looking for a solution right around the time the PyData conference was happening and I saw Rob Story's <a href="https://speakerdeck.com/wrobstory/up-and-down-the-python-data-and-web-visualization-stack">presentation on  <a href="http://nbviewer.ipython.org/gist/wrobstory/1eb8cb704a52d18b9ee8/Up%20and%20Down%20PyData%202014.ipynb">Up and Down the Python Data and Web Visualization Stack"</a>. This talk turned me onto Folium, especially after seeing it work with iPython notebook (which has become one of my favorite workflow tools).
</p>

<h3>Making maps with Folium</h3>
<p>
...is pretty damn easy. If you follow the examples on the Gitub <a href="https://github.com/wrobstory/folium">page</a> with the example data you will be making maps in no time. Now comes the fun part, making maps with our own data!
</p>

<h4>Step 1. Obtain Shapefile data</h4>
<p>
To plot our own data we will need to get a GeoJSON or TopoJSON file that contains the path information about how to draw boundaries on the map. Unfortunately, the predominant file type for geographic data is a shapefile and geojson or topojson files are pretty scarce on the web. For the USA though we can easily get maps at all geographic resolutions from the <a href="http://www.census.gov/geo/maps-data/data/tiger-line.html">census/TIGER</a> website.
</p>

<h4>Step 2. Converting from shapefile->geojson->topojson</h4>
<p>
Since the open source world is rocking geojson or topojson files we just need to convert our new shapefile over. To do this we will need to install ogr2ogr (which is a part of the GDAL package) and topojson. On OSX this can be accomplished with homebrew and node.js very simply by:
<br/>
<pre>
$ brew install gdal
$ brew install node
$ node install -g topojson
</pre>
</p>

<p>
For my needs I needed to plot data on Illinois zip codes so I downloaded the ZCTA (zip code tabulation area, not the exact same as zipcodes but close enough for me) file for Illinois. Proceeding with this file we first convert the shapefile to a geojson like so:
<br/>
<pre>
$ ogr2ogr -f illinois.json tl_2010_17_zcta510.shp
</pre>
<br/>
Next we convert the geojson to topojson. The only additional wrinkle from the geojson conversion is that we need to set the ID on each one of the areas (which is the same ID that we'll be binding to when we add data to the map). We can open up the geojson file and look at any of the "properties" entries to find the name of the needed key from the file. For the ZCTA file this key is "ZCTA5CE10". With that we convert the geojson to a topojson setting the ID and adding a zipcode property
<br/>
<pre>
$ topojson --id-property ZCTA5CE10 -p zipcode=ZCTA5CE10 illinois.json -o illinois_topo.json
</pre>
</p>

<h4>Step 3. Make one sweet map</h4>
This step is pretty simple. Take our new topojson file and the csv of data we have keyed on zipcode and throw it over the map like:
<br/>
<pre>
import folium
import pandas as pd
import numpy as np

df = pd.read(csv_file)
bins = list(np.linspace(df['feature'].min(), df['feature'].max(), 6))
city_map = folium.Map(location=[41.8819, -87.6278], width='700', tiles='Stamen Toner',  zoom_start=10)
city_map.geo_json(geo_path='illinois_topo.json', topojson='objects.illinois',
                             data=df, 
                             threshold_scale=bins,
                             columns=['zipcode', 'feature'], 
                             key_on='feature.id',
                             fill_opacity=1, 
                             line_opacity=1,
                             fill_color='PuBuGn',
                             reset=True)
city_map.create_map('city.html')
</pre>
<br/>
and now we have a map which is embedded below!  The official library as it stands only has support for up to six colors. This wasn't enough for me, so I have a fork of it with additional color support added on my <a href="https://github.com/adamrpah/folium">github</a> page that anyone is welcome to (it also has diverging color scales!)
<p>

pt src="http://d3js.org/queue.v1.min.js"></script>
<script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>
<script src="http://d3js.org/topojson.v1.min.js"></script>
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css" />

   <style>

      .legend {
          padding: 0px 0px;
          font: 10px sans-serif;
          background: white;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          border-radius: 5px;
      }   

      .key path {
        display: none;
      }   

   </style>

<div id="map" style="width: 700px; height: 500px"></div>

   <script>

      queue()
          .defer(d3.json, "/media/d3-files/asthma.json")
          .defer(d3.json, "/media/d3-files/topo_illinois.json")
          .await(makeMap)

      function makeMap(error, data_1, tjson_1) {
          
          topo_1 = topojson.feature(tjson_1, tjson_1.objects.illinois);
          

          

          function matchKey(datapoint, key_variable){
              if (typeof key_variable[0][datapoint] === 'undefined') {
                  return null;
              }
              else {
                  return parseFloat(key_variable[0][datapoint]);
              };
          };

          
          var color = d3.scale.threshold()
              .domain([0.0, 89.743589743589737, 179.48717948717947, 269.23076923076923, 358.97435897435895, 448.71794871794867, 538.46153846153845, 628.20512820512818, 717.9487179487179, 807.69230769230762, 897.43589743589735, 987.17948717948707, 1076.9230769230769, 1166.6666666666665, 1256.4102564102564, 1346.153846153846, 1435.8974358974358, 1525.6410256410256, 1615.3846153846152, 1705.1282051282051, 1794.8717948717947, 1884.6153846153845, 1974.3589743589741, 2064.102564102564, 2153.8461538461538, 2243.5897435897436, 2333.333333333333, 2423.0769230769229, 2512.8205128205127, 2602.5641025641025, 2692.3076923076919, 2782.0512820512818, 2871.7948717948716, 2961.5384615384614, 3051.2820512820513, 3141.0256410256407, 3230.7692307692305, 3320.5128205128203, 3410.2564102564102, 3500.0])
              .range(['#f6eff7', '#f0eaf4', '#eae5f1', '#e4e1ef', '#dedcec', '#d8d7e9', '#d2d3e7', '#cccfe5', '#c6cce3', '#bfc9e1', '#b9c6e0', '#b2c3de', '#acc0dc', '#a6bddb', '#9cb9d9', '#92b6d7', '#88b3d5', '#7fb0d3', '#75add1', '#6baacf', '#63a7cd', '#5ba3cb', '#549fc9', '#4c9bc6', '#4597c4', '#3d93c2', '#3690c0', '#2e8db7', '#268baf', '#1e89a7', '#16869e', '#0e8496', '#06828e', '#017e85', '#017a7c', '#017573', '#01716a', '#016c61', '#016858', '#016450']);
          

          var map = L.map('map').setView([41.8819, -87.6278], 10);

          L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg', {
              maxZoom: 18,
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
          }).addTo(map);

          

          

          

          

          
          function style_1(feature) {
    return {
        fillColor: color(matchKey(feature.id, data_1)),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 1
    };
}
          

          
          gJson_layer_1 = L.geoJson(topo_1, {style: style_1}).addTo(map)
          

          
              var legend = L.control({position: 'topright'});

    legend.onAdd = function (map) {var div = L.DomUtil.create('div', 'legend'); return div};

    legend.addTo(map);

    var x = d3.scale.linear()
    .domain([0, 3850])
    .range([0, 400]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .tickSize(1)
        .tickValues([0.0, '', '', '', 358.97435897435895, '', '', '', 717.9487179487179, '', '', '', 1076.9230769230769, '', '', '', 1435.8974358974358, '', '', '', 1794.8717948717947, '', '', '', 2153.8461538461538, '', '', '', 2512.8205128205127, '', '', '', 2871.7948717948716, '', '', '', 3230.7692307692305, '', '', '']);

    var svg = d3.select(".legend.leaflet-control").append("svg")
        .attr("id", 'legend')
        .attr("width", 450)
        .attr("height", 40);

    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(25,16)");

    g.selectAll("rect")
        .data(color.range().map(function(d, i) {
          return {
            x0: i ? x(color.domain()[i - 1]) : x.range()[0],
            x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
            z: d
          };
        }))
      .enter().append("rect")
        .attr("height", 10)
        .attr("x", function(d) { return d.x0; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .style("fill", function(d) { return d.z; });

    g.call(xAxis).append("text")
        .attr("class", "caption")
        .attr("y", 21)
        .text('Number of Asthma Cases, 2006-2012');
          

      };

</script>
