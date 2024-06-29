import pkg from 'pg';
const { Client } = pkg;

//TODO: use pg-format to format sql queries to prevent sql injection
class dbDriver {

  #client;

  constructor() {
    this.#client = new Client({ ssl: { rejectUnauthorized: false } });
    this.connect();
  }
  //Called by index.js to handle frame generation
  async connect() {
    await this.#client.connect();
    console.log('Connected to database!');
  }

  async getUser(walletAddress) {
    const query = 'SELECT * FROM user_info WHERE wallet_address = $1 LIMIT 1';
    const values = [walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};
    returnData.rowCount = result.rowCount;

    if (result.rowCount >= 1) {
      returnData.userData = result.rows[0];
    }

    return returnData;

  }

  async getAllShipments(walletAddress) {
    const query = 'SELECT * FROM shipments WHERE "from" = $1 OR "to" = $1';
    const values = [walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};
    returnData.rowCount = result.rowCount;

    if (result.rowCount >= 1) {
      returnData.shipments = result.rows;
    }

    return returnData;
  }

  async getShipment(walletAddress, shipmentId) {
    const query = 'SELECT * FROM shipments WHERE "from" = $1 AND shipment_id = $2 LIMIT 1';
    const values = [walletAddress, shipmentId];

    const result = await this.#client.query(query, values);

    let returnData = {};
    returnData.rowCount = result.rowCount;

    if (result.rowCount >= 1) {
      returnData.shipment = result.rows[0];
    }

    return returnData;
  }

  async getAllOutboundShipments(walletAddress) {
    const query = 'SELECT * FROM shipments WHERE "from" = $1';
    const values = [walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};
    returnData.rowCount = result.rowCount;

    if (result.rowCount >= 1) {
      returnData.shipments = result.rows;
    }

    return returnData;
  }


  async getAllInboundShipments(walletAddress) {
    const query = 'SELECT * FROM shipments WHERE "to" = $1';
    const values = [walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};
    returnData.rowCount = result.rowCount;

    if (result.rowCount >= 1) {
      returnData.shipments = result.rows;
    }

    return returnData;
  }


  //Assumes that the from and to tab already exist
  async newShipment(shipmentData) {
    const query = 'INSERT INTO shipments ("from","to", "type",weight,"length",width,height, shipping_cost_usd, shipment_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
    const values = [shipmentData.from, shipmentData.to, shipmentData.type, shipmentData.weight, shipmentData.length, shipmentData.width, shipmentData.height, 10.11, 'A1231'];

    const result = await this.#client.query(query, values);

    let returnData = {};

    if (result.rowCount >= 1) {
      returnData.success = true;
    } else {
      returnData.success = false;
    }

    return returnData;
  }

  async updatePayment() {
    return { "message": "Not yet implemented." };
  }

  async newUser(walletAddress) {
    const query = 'INSERT INTO user_info (wallet_address) values ($1)';
    const values = [walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};

    if (result.rowCount >= 1) {
      returnData.success = true;
    } else {
      returnData.success = false;
    }

    return returnData;
  }

  async updateUser(userData) {
    const query = 'UPDATE user_info SET first_name = $1, last_name = $2, accept_mail = $3, state = $4, city = $5, street = $6, zip_code = $7 WHERE wallet_address = $8';
    const values = [userData.firstName, userData.lastName, userData.acceptMail, userData.state, userData.city, userData.street, userData.zipCode, userData.walletAddress];

    const result = await this.#client.query(query, values);

    let returnData = {};

    if (result.rowCount >= 1) {
      returnData.success = true;
    } else {
      returnData.success = false;
    }

    return returnData;
  }

}

export default dbDriver;
