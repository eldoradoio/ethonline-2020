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
            return (<DepositAccount key={x.address} token={x} ></DepositAccount>)
        })

        return (
            <div className="provider">
                {accountItems}
            </div>
        )
    })



    return (
        <section>
            {depositable}
        </section>
    )
}