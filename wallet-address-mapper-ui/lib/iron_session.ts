import { SessionOptions } from "iron-session";
import { SiweResponse } from "siwe";

export interface SessionData {
  nonce: string | null;
  siwe: SiweResponse | null;
}

export const defaultSession: SessionData = {
  nonce: null,
  siwe: null
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "wallet-address-mapper-siwe",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
};
