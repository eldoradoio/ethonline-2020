import React, { useState } from "react";
import { ProviderData } from "./accounts";
import { SendTokens } from "./SendTokens";
import { WithdrawTokens } from "./WithdrawTokens";

type WithdrawTabProps = {
    providers: ProviderData[]
}

export function SendTab({ providers }: WithdrawTabProps) {
    const [recipient, setRecipient] = useState<string>();

    const depositable = providers.map(x => {
        const tokens = [...x.depositable]
        if (x.tokenizedName) {
            tokens.push(
                {
                    name: x.tokenizedName,
                    address: x.address
                }
            )
        }
        const accountItems = tokens?.map(x => {
            return (<SendTokens key={x.address} token={x} recipient={recipient} ></SendTokens>)
        })

        return (
            <div className="provider">
                {accountItems}
            </div>
        )
    })

    return (
        <section>
            <div style={{ display: 'flex' }}>
                <span style={{ display: 'flex', flexBasis: '1rem', verticalAlign: 'middle', lineHeight: '3.5rem', marginRight: '1rem' }}>
                    Recipient:
                </span>
                <input onChange={(x) => {
                    var newINput = x.target.value
                    if (newINput && newINput.trim().length > 0) {
                        console.log(newINput)
                        setRecipient(newINput.trim());
                    } else {
                        setRecipient(undefined);
                    }
                }}></input>
            </div>
            {depositable}
        </section>
    )
}