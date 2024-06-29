"use client"
import { useEffect, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage, useChainId } from 'wagmi'
import { Button } from '~/components/ui/button'
import { getNonce, redirectToSignupPage, verifySession } from '~/lib/actions'

export default function SiweButton() {
    const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()
    const chainId = useChainId();
    const [nonce, setNonce] = useState<string | null>(null)

    const fetchNonce = async () => {
        setNonce(await getNonce())
    }

    // Pre-fetch random nonce when button is rendered
    // to ensure deep linking works for WalletConnect
    // users on iOS when signing the SIWE message
    useEffect(() => {
        fetchNonce()
    }, [])

    const handleLogin = async () => {
        try {
            if (!address || !chainId) return;

            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the Wallet Address Mapper.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce: nonce!,
            })

            const signature = await signMessageAsync({
                //@ts-ignore
                address,
                message: message.prepareMessage(),
            })

            const verifyFormData = new FormData();
            verifyFormData.set("message", JSON.stringify(message));
            verifyFormData.set("signature", signature);

            await verifySession(verifyFormData);
        } catch (err) {
            //TODO: maybe use a toast/sonner component?
            alert(err)
        }
    }


    return (
        <Button
            onClick={(e) => {
                e.preventDefault()
                handleLogin()
            }}
        >
            Sign in with Ethereum
        </Button>
    )
}
