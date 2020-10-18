import React, { useState } from "react";
import './TabSwich.css'

type TabSwitchProp = {
    children: any[]
    labels: string[]
}

export function TabSwitch({ children, labels }: TabSwitchProp) {
    const [tabIndex, setTabIndex] = useState<number>(0)

    const switches = Array.from({ length: children.length }, (x, i) =>
        (
            <div className={`switch-button ${ i === tabIndex ? "selected" : ""}`} onClick={()=>setTabIndex(i)}>
                {labels[i]}
            </div>
        ))

    return (
        <div className="tab-container">
            <div className="switch-container">
                {switches}
            </div>
            {children[tabIndex]}
        </div>
    )
}