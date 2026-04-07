import React from 'react';

import { Block } from "@randajan/jet-react/dom/block";
import { Caption } from "@randajan/jet-react/dom/caption";
import { Button, Field, Form } from "@randajan/jet-react/dom/form";
import createQueue from "@randajan/queue";

import "./ConfigGroup.scss";
import { SelectId } from './SelectId/SelectId';
import { SureRemove } from './SureRemove/SureRemove';
import { Duration } from '../../../../elements/Duration/Duration';

export const ConfigGroup = (props)=>{
    const { id, prompts, prompt, pop} = props;
    const { lastId } = prompts;
    const { actions } = prompt;

    const onInput = createQueue((form)=>{
        actions.update(form.getInput());
    }, {
        pass:"last",
        softMs:100,
        hardMs:1000,
    });

    const relSpeed = (prompts.wordDuration / prompt.wordDuration)-1;
    const absInt = Math.min(1, Math.abs(relSpeed)) * 255 *2;
    const posInt = 128+absInt;
    const negInt = 128-absInt;
    const color = `rgb(${relSpeed < 0 ? posInt : negInt}, ${relSpeed > 0 ? posInt : negInt}, ${relSpeed === 0 ? 255 : negInt})`;

    
    return (
        <Block className="ConfigGroup">
            <div className="actions">
                <Caption>#{id+1}</Caption>
                <Button lock={id===0} onSubmit={_=>actions.move(id-1)}>🡅</Button>
                <Button lock={id===lastId} onSubmit={_=>actions.move(id+1)}>🡇</Button>
                <Button onSubmit={_=>pop.up(<SelectId {...props}/>)}>Move to</Button>
                <Button onSubmit={_=>pop.up(<SureRemove {...props}/>)}>Remove</Button>
                <div className="stats">
                    <span>Words count:</span>
                    <div>{prompt.wordsCount}</div>
                    <span>Average word time:</span>
                    <Duration ms={prompt.wordDuration*1000} dec={2}/>
                    <span>Relative speed:</span>
                    <div style={{color}}>{relSpeed>0 ? "+" : ""}{(relSpeed*100).toFixed(2)}%</div>
                </div>
            </div>
            <Form className="prompt" rawput={prompt} onInput={onInput}>
                <div className="numbers">
                    <Field name="bpm" type="number" label="BPM"/>
                    <Field name="duration" type="number" label="Duration"/>
                </div>
                <Field name="text" type="textarea" autoSize label="Text"/>
            </Form>
        </Block>
    )
}

