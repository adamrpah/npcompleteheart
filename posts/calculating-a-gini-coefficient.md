<!-- 
.. title: Calculating a Gini Coefficient
.. slug: calculating-a-gini-coefficient
.. date: 2014-05-18 09:33:15 UTC-05:00
.. tags: tutorial, math, code, python
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
For whatever reason none of the python packages have a function to calculate the Gini coefficient, which is a fairly standard metric for inequality used in economics circles. I wrote this function but I wanted to explain if first.
</p>

<!-- TEASER_END -->

<h4>A quick example</h4>
<p>
Let's say that we have four individuals who are sharing 16 apples and we want to measure if the apples are equally distributed or not. If every individual has four apples then we have a list like so:
<pre>
apple_distribution = [4, 4, 4, 4]
</pre>
and when we convert it to percentages (since the Gini is scaled from 0 to 100%) we have:
<pre>
apple_percs = [0.25, 0.25, 0.25, 0.25]
</pre>
Now we just plot the cumulative of these points, which results in this graph
<a style="text-align:center" href="http://s529.photobucket.com/user/damagedtoo/media/Photobucket%20Desktop%20-%20ariel/Website/958E5C04-7CE0-4951-B3DB-9BF18E146BBD_zpsb2igjg1j.jpg.html" target="_blank"><img src="http://i529.photobucket.com/albums/dd335/damagedtoo/Photobucket%20Desktop%20-%20ariel/Website/958E5C04-7CE0-4951-B3DB-9BF18E146BBD_zpsb2igjg1j.jpg" border="0" alt=" photo 958E5C04-7CE0-4951-B3DB-9BF18E146BBD_zpsb2igjg1j.jpg"/></a>
</p>

<p>
Since the Gini is effectively the difference in area between the line of equality (y=x) and the area under the Lorenz curve (which is generated from our data), we need to calculate the area under the curve for our data. Taking each bar separately and looking at the dashed line from the picture, we see that there are two components to each bar, because only half of the area for the new value that we are add is under the curve. This means that the first part of the bar is the full area for the previous height, and half of the area for the new value that we add.
</p>


<h4>The code</h4>
<p>
The code is relatively simple, it takes in an arbitrary list of data and calculates the Gini coefficient. If the values are already calculated as frequencies then it proceeds, but if the values are raw counts then it converts them to frequencies (if the sum of the list is greater than 1.0 it performs this conversion). The only real error handling is if the sum of the values equals zero, since this introduces wonky behavior.
<pre>
def gini(data):
    ''' 
    Calculates the gini coefficient for a given dataset.
    input:
        data- list of values, either raw counts or frequencies. 
              Frequencies MUST sum to 1.0, otherwise will be transformed to frequencies
              If raw counts data will be transformed to frequencies.
    output:
        gini- float, from 0.0 to 1.0 (1.0 most likely never realized since it is
              only achieved in the limit)
    '''
    
    def _unit_area(height, value, width):
        ''' 
        Calculates a single bars area.
        Area is composed of two parts:
            The height of the bar up until that point
            The addition from the current value (calculated as a triangle)
        input:
            height: previous bar height or sum of values up to current value
            value: current value
            width: width of individual bar
        output:
            bar_area: area of current bar
        '''
        bar_area = (height * width) + ((value * width) / 2.) 
        return bar_area
    
    #Fair area will always be 0.5 when frequencies are used
    fair_area = 0.5 
    #Check that input data has non-zero values, if not throw an error
    datasum = float(sum(data))
    if datasum==0:
        import sys
        m = 'Data sum is 0.0.\nCannot calculate Gini coefficient for non-responsive population.' 
        print m
        sys.exit()
    #If data does not sum to 1.0 transform to frequencies
    if datasum!=1.0:
        data = [x/datasum for x in data]
    #Calculate the area under the curve for the current dataset
    data.sort()
    width = 1/float(len(data))
    height, area = 0.0, 0.0 
    for value in data:
        area += _unit_area(height, value, width)
        height += value
    #Calculate the gini
    gini = (fair_area-area)/fair_area
    return gini
</pre>
</p>
