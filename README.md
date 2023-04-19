<html>
<boby>
# This is an example solution of the tickets project: phase 1 

Things to note:

<ol><li>The file "phase1str.js" is a single file solution which assumes that records are strings to be stored in a local file where each file line is one record. String operations (regular expression matching) are used.</li>
 
  <li>The file "phase1json.js" is a single file solution which assumes that records are JSONs to be stored in a local file stringgified as a composite array. JSON operations are used.</li>
    
  <li> An example route "app.post('/post/users', function(req, res) {..." is used which demonstrates the communication of data via a POST request. Look for the route "/form" inside either of the code files to see it.</li>
  
<li>In this repository there is a form "post.html" which posts data to the routes of the code files for creating new records. What that form does can also be done with Postman (without importing anything from Github). </li>

<li>The file "mydata_str.txt" is just a file that contains some initial records and stores new ones. It is the one that phase1str.js is using for local storage. </li>
  
<li>The file "mydata.txt" is just a file that contains some initial records and stores new ones. It is the one that phase1json.js is using for local storage. </li>
  
<li>The "package.json" acts as a sort of "registry" that records build parameters and dependencies required for building and deploying the app.</li>
</ol>
In order to run this example, you can download the form to your local computer and deploy the app in Codespaces (or wherever else you like). 
    
    </body></html>
