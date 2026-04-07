import React, { useState } from 'react';

import { Button, Range, Form } from "@randajan/jet-react/dom/form";

import "./SelectId.scss";

export const SelectId = (props)=>{
    const {id, prompts, prompt, pop} = props;
    const { lastId } = prompts;
    const { actions } = prompt;
    const [ newId, setId ] = useState(id);
    
    return (
        <div className="SelectId">
            <div>Move to: {newId+1}</div>
            <div><Range type="number" from={1} to={lastId+1} rawput={id+1} onInput={r=>setId(r.getInput()-1)}/></div>
            <div className="controls">
                <Button onSubmit={btn=>{
                    pop.down();
                    actions.move(newId);
                }}>OK</Button>
                <Button onSubmit={btn=>pop.down()}>Back</Button>
            </div>

        </div>
    )
}

