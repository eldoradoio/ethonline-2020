import React from "react";
import { ProviderData } from "./accounts";
import { WithdrawTokens } from "./WithdrawTokens";

type WithdrawTabProps = {
    providers: ProviderData[]
}

export function WithdrawTab({ providers }: WithdrawTabProps) {

    const depositable = providers.map(x => {

        // each provider might have it's own logic to withdraw
        if (x.name === "mStable") {
            //in mstable case, all the tokens are group together, so we cant show them individually
            return (
                <div className="provider">
                    <div>
                        <strong>USD:</strong>
                        <WithdrawTokens key={'mstablewithdraw'} provider={x} />
                    </div>
                </div>
            )
        } else {
            const accountItems = x.depositable?.map(tokenAddress => {
                return (
                    <WithdrawTokens
                        provider={x}
                        key={`othercoins-${tokenAddress}`}
                        tokenAddress={tokenAddress} />)
            })
            return (
                <div className="provider">
                    <strong>Other tokens:</strong>
                    <div>
                        {accountItems}
                    </div>
                </div>
            )
        }
    })

    return (
        <section>
            {depositable}
        </section>
    )
}