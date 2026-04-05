import React, { useEffect, useRef } from 'react';

import "./HeartBeat.scss";

export const HeartBeat = (props)=>{
    const { bpm } = props;
    const crEl = useRef();
    const swEl = useRef();

    useEffect(_=>{
        const s = 60 / bpm;
        crEl.current.style.animationDuration = `${s.toFixed(2)}s`;
        swEl.current.style.animationDuration = `${s.toFixed(2)}s`;
    }, [bpm]);
    
    return (
        <div className="HeartBeat">
            <div className="core" ref={crEl}></div>
            <div className="shockwave" ref={swEl}></div>
        </div>
    )
}

