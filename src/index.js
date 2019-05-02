var http = require("http");
const request = require("request-promise");

var options = {
  uri: "https://api.scryfall.com/cards/search",
  qs: {
    q: "mox"
  },
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true
};

let card;
let cards = [];
request(options)
  .then(function(response) {
    for (card of response.data) {
      cards.push(card);
      console.log("name", card.name); // logs 'name Ornithopter'
    }
  })
  .catch(function(err) {
    console.log("api error", err);
  });
//create a server object:
http
  .createServer(function(req, res) {
    for (card of cards) {
      res.write(card.name); //write a response to the client
      res.write("\n");
    }
    res.end(); //end the response
  })
  .listen(8080); //the server objectlistens on port 8080
