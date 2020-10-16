import React, { useContext, useReducer } from "react";
import './Messages.css';

type ToastProps = {
    type: 'error' | "success" | "info"
    children: any
    ago: number
}

export function Toast({ type, children, ago }: ToastProps) {
    return (
        <div className={"toast show " + type} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                {/* <img src="..." className="rounded mr-2" alt="..." /> */}
                <strong className="title"> </strong>
                <small className="time">{ago} seconds ago</small>
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


export enum ActionTypes {
    ADD_MESSAGE = 'ADD_MESSAGE',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
}

interface MessageAction {
    type: typeof ActionTypes.ADD_MESSAGE
    message: ToastInfo
}

export type MessasingActionTypes =
    | MessageAction

type ToastInfo = {
    body: string
    timestamp: number
    type: "error" | "info" | "success"
}
type MessagingState = ToastInfo[]

export const CurrentMessagingState: MessagingState = []


export const MessagingContext = React.createContext<{ state: MessagingState, dispatcher: React.Dispatch<MessasingActionTypes> }>({
    state: CurrentMessagingState,
    dispatcher: () => null
})


export const messaging = (state: MessagingState, action: MessasingActionTypes) => {
    console.log('messaging', state, action)
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE:
            return [...state, action.message]
        case ActionTypes.ADD_MESSAGE:
            return state;
    }
}



export function Messages() {
    const { state } = useContext(MessagingContext)

    return (
        <div className="toasts">
            {state.map((x, i) => (
                <Toast key={`messageindex${i}`}
                    ago={Date.now() - x.timestamp}
                    type={x.type}>{x.body}</Toast>
            ))}
        </div>
    )
}