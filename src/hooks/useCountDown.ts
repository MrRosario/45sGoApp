import { useEffect, useState } from 'react';

const useCountdown = (
    min: number,
    sec: number,
    isPaused: boolean,

    setIsPrepareDone: any,
    setIsExerciseDone: any,
    setIsRestDone: any,

    isPrepareDone: boolean,
    isExerciseDone: boolean,
    isRestDone: boolean,
) => {

    const [minutes, setMinutes] = useState<any>(min);
    const [seconds, setSeconds] = useState<any>(sec);

    const handleTimer = () => {
        setIsPrepareDone(true)
        setMinutes(min);
        setSeconds(sec);
    }

    const runTimer = () => {
        const interval = setInterval(() => {

            if (isPaused) {
                clearInterval(interval);
                return;
            }

            if (minutes === 0 && seconds === 0) {
                handleTimer();
                return;
            }

            if (seconds > 0) {
                setSeconds(seconds - 1);
                // setIsProgressFinished(false);
                return;
            }

            if (minutes === 0) {
                clearInterval(interval);
                return;
            }

            setMinutes(minutes - 1);
            // setIsProgressFinished(false);
            setSeconds(59);
        }, 1000);
        return interval
    };

    useEffect(() => {
        const interval = runTimer();

        return () => clearInterval(interval);
    });

    return [minutes, seconds];
};

export { useCountdown };
