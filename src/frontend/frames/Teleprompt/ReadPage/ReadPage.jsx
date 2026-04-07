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

    useEffect(_=>{
        const keyboardControl = ev=>{
            const toAction = {
                "Escape": actions.stop,
                "ArrowLeft": actions.prev,
                "ArrowRight": actions.next,
                "Backspace": actions.prev,
                "Enter": actions.next,
                " ": actions.repeat,
                "Spacebar": actions.repeat,
            };
            const action = toAction[ev.key];
            if (!action) { return; }
            ev.preventDefault();
            action();
        };

        document.addEventListener("keydown", keyboardControl);
        return _=>document.removeEventListener("keydown", keyboardControl);
    }, [actions, currentId, lastId]);

    useCountdown({
        countdownMs:3000,
        duration,
        startedAt,
        bpm,
        onTick:(rMs, cMs)=>{

            countdownEl.current.innerHTML = !cMs ? "" : `
                <svg viewBox="0 0 200 50" width="400" height="400">
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
                        ${toClock(cMs, 1)}
                    </text>
                </svg>`;

            remTimeEl.current.innerText = `${toClock(rMs)}s`;
        },
        onBeat:(prg, bs)=>{
            const ts = Math.floor(bs/10)/100;
            prgEl.current.style.transition = `height ${ts*1}s ${ts*0.0}s ease-in-out`;
            prgEl.current.style.height = ((1 - prg) * 100) + "%";
        }
    });

    return (
        <div className="ReadPage">
            <div className="grid">
                <div className="textBox">
                    <div className="progressBar" ref={prgEl}></div>
                    <div className="text">{text}</div>
                    
                </div>
                <div className="status">
                    <div className="remainingTime" ref={remTimeEl}></div>
                    <div className="currentPrompt">{currentId+1}/{lastId+1}</div>
                </div>
                <div className="controls">
                    <Button className="previous" lock={currentId==0} onSubmit={actions.prev}>Previous</Button>
                    <Button className="next" lock={currentId==lastId} onSubmit={actions.next}>Next</Button>
                    <Button className="repeat" onSubmit={actions.repeat}>Repeat</Button>
                    <Button className="stop" onSubmit={actions.stop}>Stop</Button>
                </div>
            </div>
            <div className="countdown" ref={countdownEl}></div>
        </div>
    )
}

