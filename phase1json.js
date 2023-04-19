// In this version data are handled as JSONs and JSON operations are used.
const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;
var fs = require("fs");
const { clear } = require('console');

app.listen(port);
console.log('Server started at port:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------
// Routes for the app
// ---------------------

app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Started and listening... ';
  res.send(outstring);
});



// Show the form for POSTing input
app.get('/form', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./post.html', 'utf8', (err, contents) => {
    if(err) {
        console.log('Form file Read Error', err);
        res.write("<p>Form file Read Error");
    } else {
        console.log('Form loaded\n');
        res.write(contents + "<br>");
    }
    res.end();
  });
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

// Search for a specific ticket (id)
app.get('/rest/ticket/:id', function(req, res) {
  //JSON.parse treats id as a number thus we have to treat it as a number in input
  const inputId = Number(req.params.id);
  console.log("Looking for: " + inputId);

  fs.readFile("mydata.txt", (err, data) => {
      if (err) {
          if (err.code === "ENOENT") {
              //ENOENT = Error No Entry
              //if file doesn't exist we throw an error 
              res.status(404).send("File with Tickets does not exist!");
          } else {
              console.error(err);
              res.status(500).send("Server error!");
          }
          return;
      } else {
          console.log("GET all tickets was successful!\n");
      }

      const tickets = JSON.parse(data.toString('utf8'));
      //we search for ticket who's id matches the inputId
      const ticket = tickets.find((ticket) => ticket.id === inputId);

      //if ticket is not found it will be undefined
      if (!ticket) {
          res.status(404).send("Ticket does not exist!");
      } else {
          console.log("Ticket exists!")
          //sending response - ticket
          res.json(ticket);
      }
  });
});


// A POST request to insert a new record in a local file
app.post('/rest/maketicket', function(req, res) {
  // const newTicket = req.body;
  // Report to console what was received (for debugging)
  console.log(req.body);
  var newTicket = JSON.stringify(req.body);
  // Read the current tickets
  fs.readFile("mydata.txt", (err, data) => {
    if (err) {
        if (err.code === "ENOENT") { //Error No Entry
            //if file doesn't exist we throw an error 
            res.status(404).send("File with Tickets does not exist!");
        } else {
            console.error(err);
            res.status(500).send("Server error!");
        }
        return;
    } else {
        console.log("GET all tickets was successful!\n");
    }
  

    //creating javascript object - array tickets
    const tickets = JSON.parse(data.toString('utf8'));



  //Adding the new ticket to the array
  tickets.push(newTicket)
  
  //Saving the ticket in the file
  fs.writeFile("tickets.txt", JSON.stringify(tickets, null, 2), (err) => {
    if (err) {
    return res.status(500).json({ 
        error: "Error writing to file!"});
    } else {
        console.log("Ticket added!")
        res.status(201).json(newTicket);
    }

  // Report to the user
  res.send(newTicket + " <p>stored to file");
  });
})
});
