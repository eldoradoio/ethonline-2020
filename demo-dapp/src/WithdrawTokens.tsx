import React, { Props, useContext, useEffect, useState } from 'react'
import { BigNumber } from 'ethers';
import { approve, deposit, getTokenBalance, getTokenName, getTokenSavingsBalance, getTransactionResult, TokenBalance, withdraw } from './accounts';
import { AsyncButton } from './AsyncButton';
import { ActionTypes, MessagingContext } from './Messages';
import { Balance } from './Balance';

type AccountProps = {
    tokenAddress: string
}

const FORMATTED_DECIMALS = 2

const toBigNumber = (value: any, to: number) => {
    const decimals = Math.pow(10, FORMATTED_DECIMALS)
    let base = ((typeof value == 'number') ? value : (typeof value === 'string' ? parseFloat(value) : BigNumber.from(value).toNumber()))
    base = base * decimals

    const by = BigNumber.from('1' + ''.padEnd(to - FORMATTED_DECIMALS, '0'))
    return BigNumber.from(base.toFixed(0)).mul(by)

}

export function WithdrawTokens({ tokenAddress, }: AccountProps) {
    const [tokenName, setTokenName] = useState<string>('---')

    const [depositAmount, setDepositAmount] = useState<BigNumber>();
    const [withdrawAmount, setWithdrawAmount] = useState<BigNumber>();

    const [tokenBalance, setTokenBalance] = useState<TokenBalance>()
    const [tokenSavingsBalance, setTokenSavingsBalance] = useState<TokenBalance>()


    const messaging = useContext(MessagingContext)

    useEffect(() => {
        getTokenName(tokenAddress).then(setTokenName)
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
            debugger;
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
            <Balance tokenName={tokenName} balance={tokenSavingsBalance}></Balance>
            <span style={{ flexGrow: 2, flexBasis: '1rem', display: 'flex' }}>
                <React.Fragment>
                    <span style={{ flexGrow: 1, display: "flex" }}>
                        <input style={{ flexGrow: 1 }} onChange={(x) => {
                            try {
                                setWithdrawAmount(toBigNumber(x.target.value, 18))

                            } catch {
                                setWithdrawAmount(undefined)
                            }
                        }}></input>
                    </span>
                    <span>
                        <AsyncButton
                            key={tokenAddress}
                            disabled={withdrawAmount ? false : true}
                            onClick={() => withdrawAmount ? tryCall(() => withdraw(tokenAddress, withdrawAmount), "Withdraw completed!") : undefined}
                        >
                            Withdraw
                                    </AsyncButton>
                    </span>
                </React.Fragment>
            </span>
        </div>
    )
}