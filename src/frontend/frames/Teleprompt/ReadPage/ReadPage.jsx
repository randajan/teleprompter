import React, { useEffect, useRef } from 'react';
import { Block } from "@randajan/jet-react/dom/block";

import "./ReadPage.scss";
import { Button } from '@randajan/jet-react/dom/form';
import { toClock } from '../../../../arc';
import { useCountdown } from '../useCountdown';
import { HeartBeat } from '../../../elements/HeartBeat/HeartBeat';


export const ReadPage = (props)=>{
    const { state, actions, prompts } = props;

    const prgEl = useRef();
    const remTimeEl = useRef();
    const countdownEl = useRef();

    const { startedAt, currentId } = state;
    const { list, lastId } = prompts;
    const { text, duration, bpm } = list[currentId];

    useCountdown({
        countdownMs:3000,
        duration,
        startedAt,
        onTick:(progress, rMs, cMs)=>{

            countdownEl.current.innerHTML = !cMs ? "" : `
                <svg viewBox="0 0 200 50" width="400" height="400">
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
                        ${toClock(cMs, 1)}
                    </text>
                </svg>`;

            remTimeEl.current.innerText = `${toClock(rMs)}s`;

            prgEl.current.style.height = (progress * 100) + "%";
        }
    });
    
    return (
        <div className="ReadPage">
            <div className="progressBar" ref={prgEl}></div>

            {/* <div className="heartbeat">
                <HeartBeat bpm={bpm}/>
            </div> */}

            <div className="grid">
                <div className="text">{text}</div>
                <div className="status">
                    <div className="remainingTime" ref={remTimeEl}></div>
                    <div className="currentPrompt">{currentId+1}/{lastId+1}</div>
                </div>
                <div className="controls">
                    <Button className="previous" lock={currentId==0} onSubmit={actions.prev}>Previous</Button>
                    <Button className="repeat" onSubmit={actions.repeat}>Repeat</Button>
                    <Button className="next" lock={currentId==lastId} onSubmit={actions.next}>Next</Button>
                    <Button className="stop" onSubmit={actions.stop}>Stop</Button>
                </div>
            </div>
            <div className="countdown" ref={countdownEl}></div>
        </div>
    )
}

