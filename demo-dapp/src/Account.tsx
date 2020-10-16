import { BigNumber } from 'ethers';
import React, { Props, useEffect, useState } from 'react'
import { deposit, getTokenName } from './accounts';
import { AsyncButton } from './AsyncButton';

type AccountProps = {
    token: string
}
export function Account({ token }: AccountProps) {
    const [amount, setAmount] = useState<BigNumber>();
    const [tokenName, setTokenName] = useState<string>('---')

    useEffect(() => {
        getTokenName(token).then(setTokenName)
    }, [token])

    return (<div>
        <span>{tokenName}</span>
        <span>
            <input onChange={(x) => {
                try {
                    setAmount(BigNumber.from(x.target.value))

                } catch {
                    setAmount(undefined)
                }
            }}></input>
        </span>
        <span>
            <AsyncButton
                key={token}
                disabled={amount ? false : true}
                onClick={() => amount ? deposit(amount) : undefined}
            ></AsyncButton>
        </span>
    </div>)
}

/**
 *
 * <div>

          </div>)
 *
 */