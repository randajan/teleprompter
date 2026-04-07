import React from 'react';

import { usePop } from "@randajan/jet-react/dom/modal";
import { Block } from "@randajan/jet-react/dom/block";
import { Button } from "@randajan/jet-react/dom/form";

import "./ConfigPage.scss";
import { ConfigGroup } from './ConfigGroup/ConfigGroup';
import { Duration } from '../../../elements/Duration/Duration';


export const ConfigPage = (props)=>{
    const { state, prompts, actions } = props;

    const pop = usePop({lock:true});

    let totalDuration = 0;
    const configGroups = prompts.list.map((p, id)=>{
        totalDuration += Number.jet.to(p.duration);
        const actions = prompts.bindActions(id);
        return <ConfigGroup key={id} id={id} lastId={prompts.lastId} prompt={p} actions={actions} pop={pop}/>
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
                <div className="totalDuration">
                    <span>Total time </span>
                    <Duration ms={totalDuration*1000} dec={0}/>
                </div>
            </div>
        </Block>
    )
}

