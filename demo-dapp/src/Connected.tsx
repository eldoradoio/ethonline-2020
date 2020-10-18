import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Account } from "./Account";
import { getAccounts, getAllProviders, ProviderData } from "./accounts";
import { DepositTap } from "./DepositTab";
import { TabSwitch } from "./TabSwitch";
import { WithdrawTab } from "./WithdrawTab";

type ConnectedProps = {
    address: string
}

export function Connected({ address }: ConnectedProps) {
    const [providers, setProviders] = useState<ProviderData[]>([])

    useEffect(() => {
        console.log('effect')
        getAllProviders().then(setProviders)
        //getAccounts().then(setAccounts)
    }, [address])


    const formatAddress = (address: string) => {
        const chars = 5
        return `${address.substr(0, chars)}...${address.substr(address.length - chars, address.length)}`
    }

    return (<React.Fragment>
        <div>
            Connected with: {formatAddress(address)}
        </div>
        <TabSwitch labels={["Deposit", "Withdraw"]}>
            <DepositTap providers={providers}></DepositTap>
            <WithdrawTab></WithdrawTab>
        </TabSwitch>

    </React.Fragment>)
}