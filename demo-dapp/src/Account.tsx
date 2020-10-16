import React, { Props, useEffect, useState } from 'react'
import { BigNumber } from 'ethers';
import { approve, deposit, getTokenBalance, getTokenName, TokenBalance } from './accounts';
import { AsyncButton } from './AsyncButton';

type AccountProps = {
    tokenAddress: string
}
export function Account({ tokenAddress, }: AccountProps) {
    const [amount, setAmount] = useState<BigNumber>();

    const [tokenName, setTokenName] = useState<string>('---')
    const [tokenBalance, setTokenBalance] = useState<TokenBalance>()

    useEffect(() => {
        getTokenName(tokenAddress).then(setTokenName)
        getTokenBalance(tokenAddress).then(setTokenBalance)
    }, [tokenAddress])

    const formatTokenBalance = (tb: TokenBalance): string => {
        //TODO: import a better bignumber than the ethersjs one.. w(ﾟДﾟ)w
        const formattedDecimals = 2
        const decimals = Math.pow(10, formattedDecimals)
        const by = BigNumber.from('1' + ''.padEnd(tb.decimals - formattedDecimals, '0'))

        return (tb.balance.div(by).toNumber() / decimals).toFixed(formattedDecimals)
    }



    return (
        <div style={{ display: 'flex' }}>
            <span style={{ flexGrow: 1 }}>{tokenName}: {tokenBalance ? formatTokenBalance(tokenBalance) : ''}</span>
            <span style={{ flexGrow: 1 }}>
                {tokenBalance?.allowance.gt('0') ?
                    (
                        <React.Fragment>
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
                                    key={tokenAddress}
                                    disabled={amount ? false : true}
                                    onClick={() => amount ? deposit(tokenAddress, amount) : undefined}
                                >
                                    Deposit
                                </AsyncButton>
                            </span>
                        </React.Fragment>
                    )
                    :
                    (<AsyncButton
                        key={tokenAddress}
                        disabled={false}
                        onClick={() => approve(tokenAddress)}
                    >
                        Approve use of tokens
                    </AsyncButton>)
                }

            </span>
        </div>)
}

