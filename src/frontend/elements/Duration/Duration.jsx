import React from 'react';

import "./Duration.scss";
import { toClock } from '../../../arc';

export const Duration = (props)=>{
    const {ms, dec} = props;


    
    return (
        <div className="Duration">
            { toClock(ms, dec) }
        </div>
    )
}

