import React from 'react';

import "./Duration.scss";
import { toClock } from '../../../arc';

export const Duration = (props)=>{
    const {ms, dec} = props;


    
    return (
        <span className="Duration">
            { toClock(ms, dec) }s
        </span>
    )
}

