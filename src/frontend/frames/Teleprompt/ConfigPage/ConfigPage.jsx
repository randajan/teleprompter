import React from 'react';
import { Block } from "@randajan/jet-react/dom/block";
import { Button } from "@randajan/jet-react/dom/form";

import "./ConfigPage.scss";
import { ConfigGroup } from './ConfigGroup/ConfigGroup';
import { Duration } from '../../../elements/Duration/Duration';

export const ConfigPage = (props)=>{
    const { state, prompts, actions } = props;

    console.log(prompts);

    let totalDuration = 0;
    const configGroups = prompts.list.map((p, id)=>{
        totalDuration += Number.jet.to(p.duration);
        const actions = prompts.bindActions(id);
        return <ConfigGroup key={id} id={id} prompt={p} actions={actions}/>
    })
    
    return (
        <Block className="ConfigPage">

            <div className="list">
                {configGroups}
            </div>
            <div className="pane">
                <div className="actions">
                    <Button onSubmit={prompts.add}>Add prompt</Button>
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

