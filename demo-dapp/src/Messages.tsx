import React, { useReducer } from "react";
import './Messages.css';

type ToastProps = {
    type: 'error' | "success" | "info"
    children: any
}

export function Toast({ type, children }: ToastProps) {
    return (
        <div className={"toast show " + type} role="alert" aria-live="assertive" aria-atomic="true">
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


export enum ActionTypes {
    ADD_MESSAGE = 'ADD_MESSAGE',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
}

interface MessageAction {
    type: typeof ActionTypes.ADD_MESSAGE
    message: ToastInfo
}

type MessasingActionTypes =
    | MessageAction

type ToastInfo = {
    body: string
    timestamp: number
    type: "error" | "info" | "success"
}
type MessagingState = {
    messages: ToastInfo[]
}
const messagingState: MessagingState = {
    messages: []
}


// export const GlobalContext = React.createContext<{ state: MessagingState, dispatch: React.Dispatch<MessasingActionTypes> }>({
//     state: state,
//     dispatch: () => null
// })

export const messaging = (state: MessagingState, action: MessasingActionTypes) => {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE:
            state.messages.push(action.message)
            break;
        case ActionTypes.ADD_MESSAGE:
            //state.messages.push(action.message)
            break;
    }
    return state
}



export function Messages({ messages }: MessagingState) {
    return (
        <div className="toasts">
            {messages.map(x => (
                <Toast type={x.type}>{x.body}</Toast>
            ))}
            {/* <Toast type="error">Some error message</Toast>
            <Toast type="success">Some success message</Toast>
            <Toast type="info">Some info message</Toast> */}
        </div>
    )
}