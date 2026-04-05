import React from 'react';
import { Block } from "@randajan/jet-react/dom/block";
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
        <div className="ConfigGroup">
            <Form className="prompt" rawput={prompt} onInput={onInput}>
                <Field name="text" type="textarea" autoSize label="Text"/>
                <Field name="bpm" type="number" label="BPM"/>
                <Field name="duration" type="number" label="Duration"/>
            </Form>
            <div className="actions">
                <Button onSubmit={actions.remove}>Odebrat</Button>
            </div>
        </div>
    )
}

