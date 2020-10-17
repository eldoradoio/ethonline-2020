import React, { useContext, useReducer } from "react";
import './Messages.css';



export enum ActionTypes {
    ADD_MESSAGE = 'ADD_MESSAGE',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
}

interface MessageAction {
    type: typeof ActionTypes.ADD_MESSAGE
    message: ToastInfo
}

interface RemoveMessageAction {
    type: typeof ActionTypes.REMOVE_MESSAGE
    index: number
}

export type MessasingActionTypes =
    | MessageAction
    | RemoveMessageAction

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
        case ActionTypes.REMOVE_MESSAGE:
            state.splice(action.index)
            return [...state];
    }
}



export function Messages() {
    const { state } = useContext(MessagingContext)

    return (
        <div className="toasts">
            {state.map((x, i) => (
                <Toast index={i} key={`messageindex${i}`} data={x}>{x.body}</Toast>
            ))}
        </div>
    )
}

type ToastProps = {
    index: number
    data: ToastInfo
    children: any
}

export function Toast({ data, children, index }: ToastProps) {
    const { dispatcher } = useContext(MessagingContext)
    const ago = Date.now() - data.timestamp
    const closeMessage = () => {
        dispatcher({ type: ActionTypes.REMOVE_MESSAGE, index: index })
    }

    return (
        <div className={"toast show " + data.type} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                {/* <img src="..." className="rounded mr-2" alt="..." /> */}
                <strong className="title"> </strong>
                <small className="time">{ago} seconds ago</small>
                <button type="button" aria-label="Close" onClick={closeMessage}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}
