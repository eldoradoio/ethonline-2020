import React, { useState } from 'react'
import './AsyncButton.css';

type AsyncButtonProps = {
    onClick: Function
    disabled: boolean
    children: any
}

export function AsyncButton({ onClick, disabled, children }: AsyncButtonProps) {
    const [processing, setProcessing] = useState<boolean>(false)
    if (processing) {
        return (
            <button style={{ width: '9rem' }} >
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </button>
        );
    }
    return <button style={{ width: '9rem' }} disabled={disabled || processing} onClick={async () => {
        setProcessing(true)
        const result = onClick()
        if (result instanceof Promise) {
            setProcessing(true)
            await result
            setProcessing(false)
        } else {
            setProcessing(false)
        }
    }} >{children}</button>
}