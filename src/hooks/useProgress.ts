import { useState, useEffect } from 'react';

export const useProgress = (duration: number = 0) => {
    const [durationWatch, setDurationWatch] = useState<number>(duration);
    const [isProgressFinished, setIsProgressFinished] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDurationWatch(durationWatch + 1000);
        }, 1000);

        console.log("durationWatch: ", durationWatch);

        if (durationWatch === duration) {
            clearInterval(interval);
            setIsProgressFinished(true);
            console.log("Progress Bar Completed");
        }
        return () => clearInterval(interval);
    }, [durationWatch]);

    return [isProgressFinished];
};
