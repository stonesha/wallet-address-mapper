export interface ShipmentResponse {
  rowCount: number;
  shipments: {
    shipment_id: number;
    shipment_hash: string;
    from: string;
    to: string;
    status: number;
    shipping_cost_usd: string;
    shipper_tracking: null;
    receiver_tracking: null;
    type: number;
    weight: number;
    length: number;
    width: number;
    height: number;
  }[] | undefined
}

export interface UserDataResponse {
  rowCount: number;
  userData: {
    user_id: number
    wallet_address: string
    first_name: string
    last_name: string
    accept_mail: boolean
    state: string
    city: string
    street: string
    zip_code: string
  }
}
