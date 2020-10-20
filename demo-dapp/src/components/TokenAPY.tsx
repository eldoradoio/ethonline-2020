import React from "react"
import { TokenAPYData } from "../accounts"

type TokenAPYProps = {
    tokenApy: TokenAPYData
}

export function TokenAPY({ tokenApy }: TokenAPYProps) {
    return (<div style={{ marginLeft: '1rem'}}>{tokenApy.apy.toString()}% APY</div>)
}