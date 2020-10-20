import React from "react"
import { TokenAPYData } from "../accounts"

type TokenAPYProps = {
    tokenApy: TokenAPYData
}

export function TokenAPY({ tokenApy }: TokenAPYProps) {
    return (<span style={{ marginLeft: '1rem'}}>{tokenApy.apy.toString()}% APY</span>)
}