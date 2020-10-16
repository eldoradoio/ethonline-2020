import React, { useState } from 'react'
import './AsyncButton.css';

type AsyncButtonProps = {
    onClick: Function
    disabled: boolean
}

export function AsyncButton({ onClick, disabled }: AsyncButtonProps) {
    const [processing, setProcessing] = useState<boolean>(false)
    return <button disabled={disabled || processing} onClick={async () => {
        setProcessing(true)
        const result = onClick()
        if (result instanceof Promise) {
            setProcessing(true)
            await result
            setProcessing(false)
        } else {
            setProcessing(false)
        }
    }} >Deposit</button>
}