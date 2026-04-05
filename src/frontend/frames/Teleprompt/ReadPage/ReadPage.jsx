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
            prgEl.current.innerText = progress.toFixed(2);
            countdownEl.current.innerText = cMs ? toClock(cMs) : "";
            remTimeEl.current.innerText = toClock(rMs);
        }
    });
    
    return (
        <div className="ReadPage">
            <div className="progressBar" ref={prgEl}></div>
            <HeartBeat bpm={bpm}/>
            <div className="progress">
                <div className="remainingTime" ref={remTimeEl}></div>
                <div className="currentPrompt">{currentId+1}/{lastId+1}</div>
            </div>
            <div className="text">{text}</div>
            <div className="controls">
                <Button className="previous" lock={currentId==0} onSubmit={actions.prev}>Previous</Button>
                <Button className="repeat" onSubmit={actions.repeat}>Repeat</Button>
                <Button className="next" lock={currentId==lastId} onSubmit={actions.next}>Next</Button>
                <Button className="stop" onSubmit={actions.stop}>Stop</Button>
            </div>
            <div className="countdown" ref={countdownEl}></div>
        </div>
    )
}

