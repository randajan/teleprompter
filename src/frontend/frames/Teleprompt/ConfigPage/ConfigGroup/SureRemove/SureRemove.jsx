import React from 'react';

import "./SureRemove.scss";
import { Button } from '@randajan/jet-react/dom/form';

export const SureRemove = (props)=>{
    const {prompt, actions, pop} = props;
    
    return (
        <div className="SureRemove">
            <div>Are you sure to remove this?</div>
            <div className="text">{prompt.text}</div>
            <div className="controls">
                <Button onSubmit={_=>{actions.remove(); pop.down();}}>REMOVE</Button>
                <Button onSubmit={_=>pop.down()}>Back</Button>
            </div>
            
        </div>
    )
}

