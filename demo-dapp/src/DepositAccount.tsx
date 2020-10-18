import React, { Props, useContext, useEffect, useState } from 'react'
import { BigNumber } from 'ethers';
import { approve, deposit, getTokenBalance, getTokenName, getTokenSavingsBalance, getTransactionResult, TokenBalance, TokenData, withdraw } from './accounts';
import { AsyncButton } from './AsyncButton';
import { ActionTypes, MessagingContext } from './Messages';
import { FORMATTED_DECIMALS } from './constants';
import { Balance } from './Balance';

type AccountProps = {
    token: TokenData
}

const toBigNumber = (value: any, to: number) => {
    const decimals = Math.pow(10, FORMATTED_DECIMALS)
    let base = ((typeof value == 'number') ? value : (typeof value === 'string' ? parseFloat(value) : BigNumber.from(value).toNumber()))
    base = base * decimals

    const by = BigNumber.from('1' + ''.padEnd(to - FORMATTED_DECIMALS, '0'))
    return BigNumber.from(base.toFixed(0)).mul(by)

}

export function DepositAccount({ token, }: AccountProps) {
    const tokenAddress = token.address
    const tokenName = token.name

    const [depositAmount, setDepositAmount] = useState<BigNumber>();
    const [withdrawAmount, setWithdrawAmount] = useState<BigNumber>();

    const [tokenBalance, setTokenBalance] = useState<TokenBalance>()
    const [tokenSavingsBalance, setTokenSavingsBalance] = useState<TokenBalance>()


    const messaging = useContext(MessagingContext)

    useEffect(() => {
        getTokenBalance(tokenAddress).then(setTokenBalance)
        //getTokenSavingsBalance(tokenAddress).then(setTokenSavingsBalance)
    }, [tokenAddress, messaging.state.length])

    const tryCall = async (action: Function, sucessMessage: string) => {
        try {
            await action()
            messaging.dispatcher({
                message: {
                    body: sucessMessage || "Action completed!",
                    timestamp: Date.now(),
                    type: 'success'
                },
                type: ActionTypes.ADD_MESSAGE
            })

        } catch (ex) {
            let message = ex
            if (ex.transactionHash) {
                message = await getTransactionResult(ex.transactionHash)
            }
            else if (ex.message) {
                message = ex.message
            }
            else if (typeof ex === 'string') {
                message = ex
            }
            else {
                message = "Unhandled error"
            }

            messaging.dispatcher({
                message: {
                    body: message,
                    timestamp: Date.now(),
                    type: 'error'
                },
                type: ActionTypes.ADD_MESSAGE
            })
        }
    }

    return (
        <div style={{ display: 'flex', marginTop: '0.5rem' }}>
            <Balance tokenName={tokenName} balance={tokenBalance}></Balance>
            <span style={{ flexGrow: 2, flexBasis: '1rem', display: 'flex' }}>
                {tokenBalance?.allowance.gt('0') ?
                    (
                        <React.Fragment>
                            <span style={{ flexGrow: 1, display: "flex" }}>
                                <input style={{ flexGrow: 1 }} onChange={(x) => {
                                    try {
                                        setDepositAmount(toBigNumber(x.target.value, 18))

                                    } catch {
                                        setDepositAmount(undefined)
                                    }
                                }}></input>
                            </span>
                            <span>
                                <AsyncButton
                                    key={tokenAddress}
                                    disabled={depositAmount ? false : true}
                                    onClick={() => depositAmount ? tryCall(() => deposit(tokenAddress, depositAmount), "Deposit succeeded!") : undefined}
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
                        onClick={() => tryCall(() => approve(tokenAddress), "Use of tokens approved")}
                    >
                        Approve use of tokens
                    </AsyncButton>)
                }

            </span>
        </div>

    )
}