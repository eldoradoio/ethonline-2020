import React, { Props, useContext, useEffect, useState } from 'react'
import { BigNumber } from 'ethers';
import { approve, deposit, getTokenBalance, getTokenName, TokenBalance } from './accounts';
import { AsyncButton } from './AsyncButton';
import { ActionTypes, MessagingContext } from './Messages';

type AccountProps = {
    tokenAddress: string
}
export function Account({ tokenAddress, }: AccountProps) {
    const [amount, setAmount] = useState<BigNumber>();

    const [tokenName, setTokenName] = useState<string>('---')
    const [tokenBalance, setTokenBalance] = useState<TokenBalance>()

    const messaging = useContext(MessagingContext)

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


    const approveClick = async () => {
        try{
            await approve(tokenAddress)
        }catch(ex){
            messaging.dispatcher({
                message:{
                    body: ex.toString(),
                    timestamp: Date.now(),
                    type: 'error'
                },
                type: ActionTypes.ADD_MESSAGE
            })
        }
    }
    console.log(tokenBalance)
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
                        onClick={approveClick}
                    >
                        Approve use of tokens
                    </AsyncButton>)
                }

            </span>
        </div>)
}

//approve(tokenAddress)