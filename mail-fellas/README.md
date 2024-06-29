# mail-fellas
 
to build new container:
`docker compose up --build`

to run latest built container:
`docker compose up`

to stop running container:
`docker compose stop`

to delete container/image/resources created:
`docker compose down`

```
GET
localhost/getUser/:walletAddress

example request: localhost/getUser/0x0
example response:
{
    "rowCount": 1,
    "userData": {
        "user_id": 1,
        "wallet_address": "0x0",
        "first_name": "John",
        "last_name": "Doe",
        "accept_mail": true,
        "state": "NV",
        "city": "Las Vegas",
        "street": "123 Las Vegas Blvd.",
        "zip_code": "88901"
    }
}

```

```
GET
localhost/getAllShipments/:walletAddress

example request: localhost/getAllShipments/0x0
example response:
{
    "rowCount": 3,
    "shipments": [
        {
            "shipment_id": 3,
            "shipment_hash": "A123",
            "from": "0x0",
            "to": "0x0",
            "status": 0,
            "shipping_cost_usd": "10.11",
            "shipper_tracking": null,
            "receiver_tracking": null,
            "type": 1,
            "weight": 1,
            "length": 1,
            "width": 1,
            "height": 1
        },
        {
            "shipment_id": 4,
            "shipment_hash": "A123",
            "from": "0x0",
            "to": "0x0",
            "status": 0,
            "shipping_cost_usd": "10.11",
            "shipper_tracking": null,
            "receiver_tracking": null,
            "type": 1,
            "weight": 1,
            "length": 1,
            "width": 1,
            "height": 1
        },
        {
            "shipment_id": 5,
            "shipment_hash": "A1231",
            "from": "0x0",
            "to": "0x0",
            "status": 0,
            "shipping_cost_usd": "10.11",
            "shipper_tracking": null,
            "receiver_tracking": null,
            "type": 1,
            "weight": 1,
            "length": 1,
            "width": 1,
            "height": 1
        }
    ]
}
```

```
GET
localhost/getShipment/:walletAddress/:shipmentId


example request: localhost/getShipment/0x0/3
example response:
{
    "rowCount": 1,
    "shipment": {
        "shipment_id": 3,
        "shipment_hash": "A123",
        "from": "0x0",
        "to": "0x0",
        "status": 0,
        "shipping_cost_usd": "10.11",
        "shipper_tracking": null,
        "receiver_tracking": null,
        "type": 1,
        "weight": 1,
        "length": 1,
        "width": 1,
        "height": 1
    }
}
```

```
POST
localhost/newShipment

example request body:
{
    "from":"0x0",
    "to":"0x0",
    "type":1,
    "weight":1,
    "length":1,
    "width":1,
    "height":1
}

example response:
{
    "success": true
}
```

```
POST
localhost/newUser

example request body:
{
    "walletAddress":"0x3"
}

example response:
{
    "success": true
}
```

```
POST
localhost/updateUser

example request body:
{
    "firstName":"John",
    "lastName":"Doe",
    "acceptMail":true,
    "state":"NV",
    "city":"Las Vegas",
    "street":"123 Las Vegas Blvd.",
    "zipCode":"88901",
    "walletAddress":"0x0"
}

example response:
{
    "success": true
}
```