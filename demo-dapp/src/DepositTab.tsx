import React from "react";
import { DepositAccount } from "./DepositAccount";
import { ProviderData } from "./accounts";

type DepositTapProps = {
    providers: ProviderData[]
}

export function DepositTap({ providers }: DepositTapProps) {
 
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