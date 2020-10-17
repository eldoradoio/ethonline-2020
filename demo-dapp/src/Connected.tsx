import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Account } from "./Account";
import { getAccounts, getAllProviders, ProviderData } from "./accounts";

type ConnectedProps = {
    address: string
}

export function Connected({ address }: ConnectedProps) {
    const [providers, setProviders] = useState<ProviderData[]>([])
    const [accounts, setAccounts] = useState<string[]>()


    useEffect(() => {
        console.log('effect')
        getAllProviders().then(setProviders)
        //getAccounts().then(setAccounts)
    }, [address])

    const accountItems = accounts?.map(x => {
        return (<Account key={x} tokenAddress={x} ></Account>)
    })

    const depositable = providers.map(x=>{
        return (
            <div>{x.name}</div>
        )
    })

    const formatAddress = (address: string) => {
        const chars = 5
        return `${address.substr(0, chars)}...${address.substr(address.length - chars, address.length)}`
    }
    return (<React.Fragment>
        <h4>
            Connected with: {formatAddress(address)}
        </h4>
        <section>
            {depositable}
        </section>
        <section style={{ width: '80%', maxWidth: '50rem' }}>
            {accountItems}
        </section>
    </React.Fragment>)
}