
import info from "@randajan/simple-app/info";



export const toClock = (ms, dec=2)=>{
    const ts = ms/1000;
    const s = ts % 60;
    const m = Math.floor(ts / 60);
    return `${(m ? m+":" : "")}${(m && s<10 ? "0" : "")}${s.toFixed(dec)}`;
}