import React, { useEffect, useState } from "react";
import { getAllProviders, ProviderData } from "./accounts";
import { DepositTap } from "./DepositTab";
import { TabSwitch } from "./TabSwitch";
import { WithdrawTab } from "./WithdrawTab";

type ConnectedProps = {
    address: string
}

export function Connected({ address }: ConnectedProps) {
    const [providers, setProviders] = useState<ProviderData[]>([])
    const [copied, setCopied] = useState<boolean>(false)

    useEffect(() => {
        console.log('effect')
        getAllProviders().then(setProviders)
    }, [address])


    const formatAddress = (address: string) => {
        const chars = 5
        return `${address.substr(0, chars)}...${address.substr(address.length - chars, address.length)}`
    }

    function copyToClipboard() {
        var textArea = document.createElement("textarea");
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); /*For mobile devices*/


        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
            setCopied(true);
        } catch (err) {
            console.log('Oops, unable to copy');
            setCopied(false)
        }

        document.body.removeChild(textArea);
    }

    return (<React.Fragment>
        <div>
            Connected with: {formatAddress(address)} <span>
                <button style={{ width: '4.2rem', border: 'none', fontSize: '0.8rem', color: '#d7d7d7', background:'#50486a' }} onClick={copyToClipboard}>{copied ? '[✓]' : '[Copy]'}</button>
            </span>
        </div>
        <TabSwitch labels={["Deposit", "Withdraw"]}>
            <DepositTap providers={providers}></DepositTap>
            <WithdrawTab providers={providers}></WithdrawTab>
        </TabSwitch>

    </React.Fragment>)
}