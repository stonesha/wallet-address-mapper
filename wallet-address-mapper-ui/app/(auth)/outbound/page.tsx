import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PackageCard from "~/components/PackageCard"
import { SessionData, sessionOptions } from "~/lib/iron_session";
import { ShipmentResponse } from "~/lib/types"

export default async function OutboundPage() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.nonce) {
    return redirect("/")
  }
  if (!session.siwe) {
    return redirect("/siwe")
  }

  const address = session.siwe.data.address;
  const shipmentsRes: ShipmentResponse = await fetch(`${process.env.BACKEND_URL!}/getAllShipments/${address}/outbound`).then(res => res.json())

  return (
    <div className="grid grid-cols-3 gap-4">
      {shipmentsRes.shipments && shipmentsRes.shipments.map(shipment => <PackageCard key={shipment.shipment_id} {...shipment} />)}
      <PackageCard shipment_hash={"test"} status={2} from={address} to={"0x01234"} shipping_cost_usd="12" type={1} weight={1} length={1} width={2} height={2} />
    </div>
  )
}
