import { useEffect } from "react";




export const useCountdown = (opt={})=>{
    const {
        startedAt,
        duration,
        countdownMs,
        onTick
    } = opt;

    useEffect(_=>{
        const dMs = duration*1000;
        let int;

        const stop = _=>clearInterval(int);

        int = setInterval(_=>{
            const cMs = Date.now() - startedAt;
            const isCountdown = cMs < countdownMs;

            if (isCountdown) {
                const rMs = Math.max(0, countdownMs - cMs);
                onTick(1, dMs, rMs);
            } else {
                const rMs = Math.max(0, countdownMs - cMs + dMs);
                onTick(rMs / dMs, rMs, 0);
                if (rMs === 0) { stop(); }
            }

        }, 10);

        return stop;
    }, [countdownMs, startedAt, duration]);
}