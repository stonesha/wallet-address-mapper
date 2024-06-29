"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import SendMailForm from "~/components/SendMailForm";
import { useStore } from "~/lib/stores";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { logout } from "~/lib/actions";

const routes = [
    {
        title: "Home",
        href: "/home",
    }, {
        title: "Outbound",
        href: "/outbound",
    },
    {
        title: "Inbound",
        href: "/inbound",
    }
]

export default function Header() {
    const pathname = usePathname();
    const sendMailModalOpen = useStore.use.sendMailModalOpen();
    const setSendMailModalOpen = useStore.use.setSendMailModalOpen();

    return (
        <header className="flex flex-row rounded-md border border-black p-2 items-center justify-between">
            <p className="animate-text font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-400 to-red-600">Wallet Address Mapper</p>
            <div className="flex flex-row space-x-2">
                {routes.map((route, index) =>
                    <Button key={index} variant="ghost" asChild className={pathname === route.href ? "bg-accent" : ""}>
                        <Link href={route.href}>{route.title}</Link>
                    </Button>)}

                <Dialog open={sendMailModalOpen} onOpenChange={setSendMailModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            Send Mail
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Send Mail</DialogTitle>
                            <DialogDescription>
                                <SendMailForm />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><EllipsisVertical /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => await logout()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
