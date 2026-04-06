import { useEffect } from "react";




export const useCountdown = (opt={})=>{
    const {
        bpm,
        startedAt,
        duration,
        countdownMs,
        onTick,
        onBeat
    } = opt;

    useEffect(_=>{
        const dMs = duration*1000;
        const bs = 1000 * 60 / bpm;
        const beatCount = dMs / bs;
        const bsLast = ((beatCount % 1) || 1) * bs;
        let int;

        const stop = _=>clearInterval(int);

        int = setInterval(_=>{
            const cMs = Date.now() - startedAt;
            const isCountdown = cMs < countdownMs;

            if (isCountdown) {
                const rMs = Math.max(0, countdownMs - cMs);
                onTick(dMs, rMs);
                onBeat(0, countdownMs/10);
            } else {
                const rMs = Math.max(0, countdownMs - cMs + dMs);
                const prg = 1 - (rMs / dMs);
                const beatPrg = Math.min(1, Math.ceil(prg*beatCount)/beatCount);

                onTick(rMs, 0);
                onBeat(beatPrg, beatPrg === 1 ? bsLast : bs);
                if (rMs === 0) { stop(); }
            }

        }, 10);

        return stop;
    }, [countdownMs, bpm, startedAt, duration]);
}