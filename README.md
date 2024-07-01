# Breakdown
tldr; This project is for a mail forwarding project focused on servicing the web3 ecosystem. Receive physical mail without revealing your address to the other party. 

How many times have you been eligible for merchandise through an NFT/token mint but not claimed them due to revealing your physical address?

## Note about repos and it's completeness 
Please note that these repos are incomplete. We were unable to build this repos into the full proof of concept that we initially planned due to ongoing responsibilities for work/school. However, we believe that it still helps visualize the flow/idea that we are attempting to present.

This proof of concept includes the following:

- Create a user account with a Coinbase Smart Wallet (or connect with Metamask)
- Update account settings/shipping details
- View all inbound/outbound shipments
- Initiate a new shipment

Many things (including data checks) were left out in this proof of concept that will be built out in the full project.

While this has been submitted and presented as a project for users to initiate shipments through, we envision a complete protocol/api to allow other commerce sites to easily integrate with our service.

In this way, it would become the central hub/provider for all "web3" physical mail.

## Info/Flow

Shipping through this platform requires two individually shipments. First, the shipper (User A) must ship the package to the facility (operated by this project) that will act as a middle man. The facility will then print a new shipping label upon receipt and ship it to the destination user. 

Shipping labels include a unique shipment ID that will be used by the staff at the physical location when routing/forwarding the shipment to the new user.

```
User A wants to send a package to User B. 

Both users are registered on this platform. 

User A initiates a new shipment to User B's wallet address and enters in the package details. 

User A pays for the shipping costs and uses the generated shipping label to ship the package.

Facility receives package.

Facility staff processes the package/shipment, removes the old shipping label, applies the new one, and ships it to User B.

User B receives package.

```

## Website/Dashboard

A website/dashboard for users to register with wallet, update shipping information, toggle accepting shipments, create new shipments, view all shipments (inbound/outbound) and view individual shipment data.

## Tracking/Shipping Services

Shipping labels will be generated through one of many available shipping APIs.

The process of tracking shipment status will be automated using shipping services API. Notifications of shipping updates must be evaluated to help minimize estimating the other members shipping location through shipment/delivery dates.

User A should not see the new shipping information of the package once it has been sent to User B from the facility.

User B should not see the shipping information of the package from User A to the facility.

## Facility Application/staff

Measures will be taken at the facility to prevent exposure of the wallet address/physical address to staff. 

Staff will be split into two teams. One team to receive packages from User A and one team to send packages to User B.

Staff will not be exposed to wallet addresses, only the information available to them on the label.

An application is needed to allow for the staff at the physical facility to process shipments.

The application must interface with a physical scanning device to scan barcodes/QR codes, identify the destination address for the shipment, and then print a new shipping label automatically for the staff.

## Misc/Concerns

- This does increase overall shipping costs. Can be reduced through partnerships but will never be fully mitigated unless directly integrated with shipping services (USPS, UPS, FedEx)
- Concern over package liabilities/laws
- Tracking devices in packages (cell phones, airtags, etc.)