import React from 'react';

import { Block } from "@randajan/jet-react/dom/block";
import { Caption } from "@randajan/jet-react/dom/caption";
import { Button, Field, Form } from "@randajan/jet-react/dom/form";
import createQueue from "@randajan/queue";

import "./ConfigGroup.scss";
import { SelectId } from './SelectId/SelectId';
import { SureRemove } from './SureRemove/SureRemove';

export const ConfigGroup = (props)=>{
    const { id, lastId, prompt, actions, pop} = props;

    const onInput = createQueue((form)=>{
        actions.update(form.getInput());
    }, {
        pass:"last",
        softMs:100,
        hardMs:1000,
    });

    
    return (
        <Block className="ConfigGroup">
            <div className="actions">
                <Caption>#{id+1}</Caption>
                <Button lock={id===0} onSubmit={_=>actions.move(id-1)}>🡅</Button>
                <Button lock={id===lastId} onSubmit={_=>actions.move(id+1)}>🡇</Button>
                <Button onSubmit={_=>pop.up(<SelectId {...props}/>)}>Move to</Button>
                <Button onSubmit={_=>pop.up(<SureRemove {...props}/>)}>Remove</Button>
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

