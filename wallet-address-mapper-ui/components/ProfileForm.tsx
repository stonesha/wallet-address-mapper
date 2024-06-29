"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, TypeOf } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { submitProfileData } from "~/lib/actions";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  state: z.string().min(2, {
    message: "State abbreviation must be at least 2 characters.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  street: z.string().min(1, {
    message: "Street is required.",
  }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Invalid zip code.",
  }),
  acceptMail: z.boolean().optional().default(true),
});

// Define the form data type
type FormData = TypeOf<typeof formSchema>;

type ProfileFormProps = {
  firstName?: string;
  lastName?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  acceptMail?: boolean;
}

export default function ProfileForm({ firstName, lastName, state, city, street, zipCode, acceptMail }: ProfileFormProps) {
  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
      state, city, street, zipCode, acceptMail
    }
  });

  const onSubmit = async (data: FormData) => {
    //@ts-ignore
    await submitProfileData(data);
  };

  return (
    <Form {...form}>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto my-10 grid grid-cols-12 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Joe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-12"></div>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Las Vegas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="NV" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>ZIP code</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptMail"
          render={({ field }) => (
            <FormItem className="col-span-12 flex flex-row items-center align-middle space-y-0 ">
              <FormLabel className="mr-2">Receive Mail</FormLabel>
              <FormControl className="mr-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked
                />
              </FormControl>
              <FormDescription>
                Check this box if you want to receive mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-8"></div>
        <div className="col-span-11"></div>

        <Button className="col-span-12 w-32 justify-self-end" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
