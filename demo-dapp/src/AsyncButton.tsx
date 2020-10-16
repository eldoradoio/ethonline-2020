import React, { useState } from 'react';
import './AsyncButton.css';

type AsyncButtonProps = {
    onClick: Function
    disabled: boolean
}

export function AsyncButton({ onClick, disabled }: AsyncButtonProps) {
    const [processing, setProcessing] = useState<boolean>(false)
    return <button disabled={disabled || processing} onClick={() => {
        const result = onClick()
        if (result instanceof Promise) {

        } else {

        }
    }} >Deposit</button>
}