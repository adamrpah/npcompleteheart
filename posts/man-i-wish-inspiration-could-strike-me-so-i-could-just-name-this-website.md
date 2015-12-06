<!-- 
.. title: Man, I wish inspiration could strike me so I could just name this website
.. slug: man-i-wish-inspiration-could-strike-me-so-i-could-just-name-this-website
.. date: 2014-01-19 07:47:51 UTC-05:00
.. tags: python, random
.. category: 
.. link: 
.. description: 
.. type: text
-->

<p>
I've been working with my friend for awhile now and for the entire length of our project we've struggled to name it.
Over the last week we finally bit the bullet and decided that we would finally name it so other people could start using it.
</p>

<p>
It was a struggle. 
</p>

<!-- TEASER_END -->

<p>
We weren't really sure what idea or concept we wanted the name to embody so I wrote this script up to try and help.
Given a list of seed words from the command line it gets a number of similar words using the word net corpus.
Then it goes through those words to see if any have an ending that is the same as a generic top level domain.
</p>

<p>
Enjoy!
</p>

<pre>
'''
File: naming_domains.py
Author: Adam Pah
Description: 
Script to help in naming/brainstorming web domains
Recursively grabs a number of words that are synonyms to a starting
list of words. Then checks the ends of the words to see if they match 
any of a number of common web TLDs. 
'''

#Standard path imports
from optparse import OptionParser
import re

#Non-standard imports
from nltk.corpus import wordnet
import whois

#Global directories and variables
end_list = ['org', 'com', 'net', 'mobi', 'es', 'us', 'es', 'cc', 'mobi', 'co', 'info', 'ca', 'biz', 'me', 'tv', 'ws', 'asia', 'la']

def regexify_endings(end_list):
    '''
    Takes the list of possible TLD endings and constructs a dictionary
    that matches up the 'end' to the regex
    '''
    ends = {}
    for x in end_list:
        ends[x] = re.compile(x + '$')
    return ends

def identify_additional_words(seed, max_list_size, word_list = []):
    '''
    Identifies addtional words/synonyms given a starting list of words.
    Keeping track of loop iterations to give a break condition too, in case
    the seed words are so small/narrow that it just loops on itself.
    '''
    num_try = 1
    while len(word_list) < 100 or num_try > 1000:
        for seed_word in seed:
            for lemma_start in wordnet.synsets(seed_word):
                for lemma_word in lemma_start.lemma_names:
                    word_list.append(lemma_word)
        word_list = list(set(word_list))
        disjoint = set(word_list).difference(set(seed))
        seed = list(disjoint)
        num_try += 1
    return word_list

def identify_matched_endings(endings, word_list):
    '''
    Searches through the word list for ones that have an end that matches
    a possilbe TLD.
    '''
    for word in word_list:
        for end_name, endr in endings.items():
            if endr.findall(word) != []:
                print "%s -- %s" % (word, end_name)

if __name__ == '__main__':
    usage = '%prog [options]'
    parser = OptionParser(usage = usage)
    parser.add_option('-n', '--num', action='store', default=100,
                      help='Number of words to return/find')
    (opt, args) = parser.parse_args()
    #####
    endings = regexify_endings(end_list)
    if args:
        word_list = identify_additional_words(args, opt.num)
        identify_matched_endings(endings, word_list)
    else:
        print '''ERROR: Must have starting set of words\n
                 Please enter command line list of seed words'''
</pre>
