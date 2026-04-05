import React from 'react';
import { Block } from "@randajan/jet-react/dom/block";
import { Caption } from "@randajan/jet-react/dom/caption";
import { Button, Field, Form } from "@randajan/jet-react/dom/form";
import crateQueue, { createQueue } from "@randajan/queue";

import "./ConfigGroup.scss";

export const ConfigGroup = (props)=>{
    const { id, prompt, actions} = props;

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
                <Button onSubmit={actions.remove}>Remove</Button>
            </div>
            <Form className="prompt" rawput={prompt} onInput={onInput}>
                <div>
                    <Field name="bpm" type="number" label="BPM"/>
                    <Field name="duration" type="number" label="Duration"/>
                </div>
                <Field name="text" type="textarea" autoSize label="Text"/>
            </Form>
        </Block>
    )
}

