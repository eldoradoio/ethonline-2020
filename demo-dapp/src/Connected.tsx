import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Account } from "./Account";
import { getAccounts, getBalance } from "./accounts";

type ConnectedProps = {
    address: string
}

export function Connected({ address }: ConnectedProps) {
    const [balance, setBalance] = useState<BigNumber>()
    const [accounts, setAccounts] = useState<string[]>()


    useEffect(() => {
        console.log('effect')
        getBalance().then(setBalance)
        getAccounts().then(setAccounts)
    }, [address])

    const accountItems = accounts?.map(x => {
        return (<Account key={x} tokenAddress={x} ></Account>)
    })

    const formatAddress = (address: string) => {
        const chars = 5
        return `${address.substr(0, chars)}...${address.substr(address.length - chars, address.length)}`
    }
    return (<React.Fragment>
        <h4>
            Connected with: {formatAddress(address)}
        </h4>
        <p>
            Savings Balance: {balance?.toString()}
        </p>
        <section style={{ width: '80%', maxWidth: '50rem' }}>
            {accountItems}
        </section>
    </React.Fragment>)
}