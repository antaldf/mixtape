# mixtape
Mixtape exercise,

This is a simple node.js program. Run this program as follows:

node pro.js <mixtape.json> <changes.json>

The updated output.json is written to stdout and can be redirected to output.json simple by

node pro.js mixtape.json changes.json > output.json

To scale this process to handle very large input files I would not pass mixtape.json in but store mixtap.json in 
a relational datastore such as postgres since the data is relational. 

To scale this process to handle very large changes files I would change the input to use async reads as to not fill the buffers.
