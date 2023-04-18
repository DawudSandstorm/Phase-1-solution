const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;
var fs = require("fs");

app.listen(port);
console.log('Server started at port:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Started and listening... ';
  res.send(outstring);
});


// Write to a file 

app.get('/wfile', function(req, res) {
  const myquery = req.query;
  
  var outstring = '';
  for(var key in myquery) { outstring += "--" + key + ">" + myquery[key]; }
  fs.appendFile("mydata.txt", outstring+'\n', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("Contents of file now:\n");
      console.log(fs.readFileSync("mydata.txt", "utf8"));
    }
  });
 
  res.send(outstring);

});



// List all tickets (which are stored in a file)
app.get('/rest/list', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./mydata.txt', 'utf8', (err, jsonString) => {
    if(err) {
        console.log('File Read Error', err);
        res.write("<p>File Read Error");
    } else {
        console.log('Tickets loaded\n');
        res.write(JSON.stringify(jsonString) + "<br>");
    }
    res.end();
  });
});

// A POST request
app.post('/rest/maketicket', function(req, res) {
  const body = req.body;
  // Report to console what was received (for debugging)
  console.log(req.body);
  var inp_string = JSON.stringify(req.body);
  fs.appendFile("mydata.txt", inp_string +'\n', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Wrote inp_string to file");
    }
  // Report to the user
  res.send(inp_string + " <p>stored to file");
});

