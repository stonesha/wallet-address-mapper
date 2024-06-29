import express from "express";
import dbDriver from './dbDriver.js';

//EXPRESS APP SETTINGS
const app = express();
const port = process.env.PORT;

//Database Driver/Client object
//Calls to backend will be made using dbClient
//Check dbDriver for available funcs
const dbClient = new dbDriver();

// For parsing application/json
app.use(express.json());

//Start server
app.listen(port, async () => {

  console.log('Running On port: ' + process.env.PORT);

});

/*
Get user info for wallet address
*/
app.get('/getUser/:walletAddress', async (req, res) => {
  const data = await dbClient.getUser(req.params.walletAddress);
  res.status(200).send(data);
});

/*
Get all shipments for wallet address
*/
app.get('/getAllShipments/:walletAddress', async (req, res) => {
  const data = await dbClient.getAllShipments(req.params.walletAddress);

  res.status(200).send(data);
});

app.get('/getAllShipments/:walletAddress/:type', async (req, res) => {
  if (req.params.type === "inbound") {
    const data = await dbClient.getAllInboundShipments(req.params.walletAddress);
    res.status(200).send(data);
  } else if (req.params.type === "outbound") {
    const data = await dbClient.getAllOutboundShipments(req.params.walletAddress);
    res.status(200).send(data);
  } else {
    res.status(400).send("Missing type for this endpoint.");
  }
});


/*
Get specific shipment for wallet address
*/
app.get('/getShipment/:walletAddress/:shipmentId', async (req, res) => {
  const data = await dbClient.getShipment(req.params.walletAddress, req.params.shipmentId);

  res.status(200).send(data);
});

/*
Create a new shipment
*/
app.post('/newShipment', async (req, res) => {
  const data = await dbClient.newShipment(req.body);
  res.status(200).send(data);

});

/*
updatePayment
*/
app.post('/updatePayment', async (req, res) => {
  const data = await dbClient.updatePayment(req.body);
  res.send(200, data);
});

/*
updatePayment
*/
app.post('/newUser', async (req, res) => {
  const data = await dbClient.newUser(req.body.walletAddress);
  res.status(200).send(data);
});


/*
updatePayment
*/
app.post('/updateUser', async (req, res) => {
  const data = await dbClient.updateUser(req.body);
  res.status(200).send(data);
});


/*
Wildcard get request
*/
app.get('*', async (_req, res) => {
  res.status(200).send('Wildcard Catch.');
});

