import React from 'react';
import { Block } from "@randajan/jet-react/dom/block";

import "./Teleprompt.scss";
import { ConfigPage } from './ConfigPage/ConfigPage';
import { ReadPage } from './ReadPage/ReadPage';
import store from "@randajan/jet-react/base/store";
import { useTeleprompt } from './usePrompts';

store.acceptAll();

export const Teleprompt = (props)=>{
    const {} = props;

    const [ base ] = store.use("$$teleprompter");
    const tp = useTeleprompt(base);
    
    return (
        <section className="Teleprompt">
            { tp.state.isRunning ? <ReadPage {...tp}/> : <ConfigPage {...tp}/> }
        </section>
    )
}

