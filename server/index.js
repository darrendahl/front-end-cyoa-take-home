const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const DataAccessObject = require("./dataAccessObject");
const Comment = require("./comment");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject("./database.sqlite3");
const comment = new Comment(dataAccessObject);

let clients = [];

comment.createTable().catch((error) => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

const notifyClients = (data) => {
  clients.forEach((c) => {
    c.response.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

app.post("/createComment", function (request, response) {
  const { body } = request;
  comment.createComment(body).then((result) => {
    notifyClients(result);
    response.send(result);
  });
});

app.get("/getComment/:id", function (request, response) {
  const { id } = request.params;
  comment.getComment(id).then((result) => {
    response.send(result);
  });
});

app.get("/realtime", function (request, response) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  response.writeHead(200, headers);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);
  console.log(`${clientId} Connection Opened`);

  request.on("close", () => {
    console.log(`${clientId} Connection Closed`);
    clients = clients.filter((c) => clientId !== c.id);
  });
});

app.get("/getComments", function (request, response) {
  comment.getComments().then((result) => {
    response.send(result);
  });
});

app.delete("/deleteComments", function (request, response) {
  comment.deleteComments().then((result) => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  const rootDir = __dirname.replace("/server", "");
  response.sendFile(`${rootDir}/src/index.html`);
});
