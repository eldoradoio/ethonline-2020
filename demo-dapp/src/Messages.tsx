import React from "react";
import './Messages.css';

type ToastProps = {
    type: 'error' | "success" | "info"
    children: any
}

export function Toast({ type, children }: ToastProps) {
    return (
        <div className={"toast show " + type}  role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                {/* <img src="..." className="rounded mr-2" alt="..." /> */}
                <strong className="title"> </strong>
                <small className="time">11 mins ago</small>
                <button type="button" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}

export function Messages() {
    return (
        <div className="toasts">
            <Toast type="error">Some error message</Toast>
            <Toast type="success">Some success message</Toast>
            <Toast type="info">Some info message</Toast>
        </div>
    )
}