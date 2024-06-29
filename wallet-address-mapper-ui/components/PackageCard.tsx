import { TooltipContent } from "@radix-ui/react-tooltip";
import { Package } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";

type PackageCardProps = {
    shipment_hash: string;
    status: number;
    from: string;
    to: string;
    shipping_cost_usd: string;
    type: number;
    weight: number;
    length: number;
    width: number;
    height: number;
}

const statusMapping = ["Pending", "Processing", "Shipped", "In Transit", "Delivered"]

export default function PackageCard({ status, from, to }: PackageCardProps) {
    const statusString = statusMapping[status]
    return (
        <div className="rounded-md border p-4 max-w-96 flex flex-row shadow-md relative">
            <Skeleton className="rounded-md w-24 h-24" />
            <div className="ml-4 flex flex-col justify-between w-auto">
                <Badge variant={statusString === "Delivered" ? "outline" : "secondary"} className={statusString === "Delivered" ? "bg-green-200/30 text-green-600 w-fit" : "w-fit"}>
                    {statusString}
                </Badge>
                <div className="tracking-tight flex flex-row space-x-3">
                    <Tooltip delayDuration={400}>
                        <TooltipTrigger><p className="truncate w-20">From: {from}</p></TooltipTrigger>
                        <TooltipContent side="top" align="start" className="wallet-tooltip p-2 border rounded-md bg-white">
                            {from}
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={400}>
                        <TooltipTrigger><p className="truncate w-20">To: {to}</p></TooltipTrigger>
                        <TooltipContent side="top" align="start" className="wallet-tooltip p-2 border rounded-md bg-white">
                            {to}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <Package className="absolute top-2 right-2 h-5 w-5" />
        </div>
    )
}
