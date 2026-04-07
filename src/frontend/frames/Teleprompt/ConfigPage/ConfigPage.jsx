import React from 'react';

import { usePop } from "@randajan/jet-react/dom/modal";
import { Block } from "@randajan/jet-react/dom/block";
import { Button } from "@randajan/jet-react/dom/form";

import "./ConfigPage.scss";
import { ConfigGroup } from './ConfigGroup/ConfigGroup';
import { Duration } from '../../../elements/Duration/Duration';

const countWords = (str) => str.trim().split(/\s+/).length;

export const ConfigPage = (props)=>{
    const { state, prompts, actions } = props;

    const pop = usePop({lock:true});

    const configGroups = prompts.list.map((p, id)=>{
        return <ConfigGroup key={id} id={id} prompts={prompts} prompt={p} pop={pop}/>
    });
    
    return (
        <Block className="ConfigPage">

            <div className="list">
                {configGroups}
            </div>
            <div className="pane">
                <div className="actions">
                    <Button onSubmit={prompts.add}>Add prompt</Button>
                    <Button onSubmit={actions.save}>Save</Button>
                    <Button onSubmit={actions.load}>Load</Button>
                    <Button onSubmit={actions.start}>Start</Button>                    
                </div>

                <div className="stats">
                    <span>Words count:</span>
                    <div>{prompts.wordsCount}</div>
                    <span>Average word time:</span>
                    <Duration ms={prompts.wordDuration*1000} dec={2}/>
                    <span>Total time:</span>
                    <Duration ms={prompts.totalDuration*1000} dec={0}/>
                </div>
            </div>
        </Block>
    )
}

