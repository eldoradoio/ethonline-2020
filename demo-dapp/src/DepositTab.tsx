import React, { useEffect, useState } from "react";
import { DepositAccount } from "./DepositAccount";
import { getAccounts, ProviderData } from "./accounts";

type DepositTapProps = {
    providers: ProviderData[]
}

export function DepositTap({ providers }: DepositTapProps) {
    const [accounts, setAccounts] = useState<string[]>()

    useEffect(() => {
        //getAccounts().then(setAccounts)
    }, [])



    const depositable = providers.map(x => {
        const accountItems = x.depositable?.map(x => {
            return (<DepositAccount key={x} tokenAddress={x} ></DepositAccount>)
        })

        return (
            <div className="provider">
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