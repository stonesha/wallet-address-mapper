"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from 'zod';
import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { sendMail } from "~/lib/actions";
import { useStore } from "~/lib/stores";

const formSchema = z.object({
    walletAddress: z.string().min(1, {
        message: "Wallet Address is required for sending mail."
    }),
})

export default function SendMailForm() {
    const setSendMailModalOpen = useStore.use.setSendMailModalOpen();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            walletAddress: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await sendMail(values);
        setSendMailModalOpen(false);
        toast(`Mail has been sent to ${values.walletAddress}`, {
            cancel: {
                label: 'Confirm',
                onClick: () => { },
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4 my-4">
                <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                        <FormItem className="col-span-12">
                            <FormLabel>Wallet Address</FormLabel>
                            <FormControl>
                                <Input placeholder="0x01234..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is wallet address you&apos;re sending mail to.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-12 flex flex-row justify-around">
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="outline" onClick={() => form.reset()}>Reset</Button>
                </div>
            </form>
        </Form>
    )
}
