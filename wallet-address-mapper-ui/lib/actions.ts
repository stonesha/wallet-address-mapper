"use server";

import { SiweMessage, generateNonce } from "siwe";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./iron_session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserDataResponse } from "./types";
import { revalidatePath } from "next/cache";

export async function redirectToSiwePage() {
  redirect("/siwe");
}

export async function redirectToSignupPage() {
  redirect("/signup");
}

export async function getNonce() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.nonce = generateNonce();
  await session.save();
  return session.nonce;
}

export async function verifySession(formData: FormData) {
  const messageData: SiweMessage = JSON.parse(
    formData.get("message") as string
  );
  const signature: string = formData.get("signature") as string;

  const message = new SiweMessage(messageData);

  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );
  const fields = await message.verify({ signature });

  if (fields.data.nonce !== session.nonce) return false;

  session.siwe = fields;
  await session.save();

  const res: UserDataResponse = await fetch(
    `${process.env.BACKEND_URL!}/getUser/${fields.data.address}`
  ).then((res) => res.json());
  // new user
  if (res.rowCount === 0) {
    await fetch(`${process.env.BACKEND_URL!}/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress: fields.data.address }),
    });
    redirect("/signup")
    // exising user but hasn't finished sign up
  } else if (res.rowCount !== 0 && res.userData.first_name === null) {
    redirect("/signup")
    // existing user that has finished signup
  } else {
    redirect("/home")
  }

}

export async function logout() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  //TODO: possibly store nonces to invalidate them to prevent replay attacks
  session.destroy();
  redirect("/");
}

export async function submitProfileData(data: FormData) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const address = session.siwe?.data.address;

  await fetch(`${process.env.BACKEND_URL!}/updateUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, walletAddress: address }),
  });

  redirect("/home");
}

export async function getProfileData() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const address = session.siwe?.data.address;

  const res: UserDataResponse = await fetch(`${process.env.BACKEND_URL!}/getUser/${address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json());

  return res
}

export async function sendMail(data: { walletAddress: string }) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const address = session.siwe?.data.address;

  const mailData = {
    from: address,
    to: data.walletAddress,
    type: 1,
    weight: 1,
    length: 1,
    width: 1,
    height: 1
  }

  await fetch(`${process.env.BACKEND_URL!}/newShipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mailData),
  });

  revalidatePath("/home")
}
