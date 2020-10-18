import React, { useEffect, useState } from "react";
import { ProviderData } from "./accounts";
import { WithdrawTokens } from "./WithdrawTokens";

type WithdrawTabProps = {
    providers: ProviderData[]
}

export function WithdrawTab({ providers }: WithdrawTabProps) {
    const [accounts, setAccounts] = useState<string[]>()

    useEffect(() => {
        //getAccounts().then(setAccounts)
    }, [])



    const depositable = providers.map(x => {
        const accountItems = x.depositable?.map(x => {
            return (<WithdrawTokens key={x} tokenAddress={x} ></WithdrawTokens>)
        })

        return (
            <div className="provider">
                <strong>{x.name}</strong>
                <div style={{ width: '80%', maxWidth: '50rem' }}>
                    {accountItems}
                </div>
            </div>
        )
    })

  

    return (
        <section>
            {depositable}
        </section>
    )
}