import { BigNumber } from "ethers"
import React from "react"
import { TokenBalance } from "./accounts"
import { FORMATTED_DECIMALS } from "./constants"

export type BalanceProps = {
    tokenName?: string
    balance?: TokenBalance
}
export function Balance({ tokenName, balance }: BalanceProps) {
    const formatTokenBalance = (tb: TokenBalance): string => {
        //TODO: import a better bignumber than the ethersjs one.. w(ﾟДﾟ)w
        const formattedDecimals = FORMATTED_DECIMALS
        const decimals = Math.pow(10, formattedDecimals)
        const by = BigNumber.from('1' + ''.padEnd(tb.decimals - formattedDecimals, '0'))

        return (tb.balance.div(by).toNumber() / decimals).toFixed(formattedDecimals)
    }

    return (
        <span style={{ display: 'flex', flexGrow: 1, flexBasis: '1rem', verticalAlign: 'middle', lineHeight: '3.5rem' }}>
            <span style={{ flexGrow: 4, textAlign: 'right' }}>
                {balance ? formatTokenBalance(balance) : '---'}
            </span>
            {tokenName ? 
            <span style={{ width: '6rem', textAlign: 'left', paddingLeft: '1rem', fontSize: '1rem' }}>
                {tokenName.toLocaleUpperCase()}
            </span>
            : ''}
        </span>
    )
}