import { useEffect, useState } from 'react';

const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}

const useCountdown = (min: number, sec: number, isPaused: boolean) => {

    const [minutes, setMinutes] = useState<any>(min);
    const [seconds, setSeconds] = useState<any>(sec);

    useEffect(() => {
        let interval = setInterval(() => {

            if (isPaused) {
                clearInterval(interval);
                return;
            }

            if (seconds > 0) {
                setSeconds(seconds - 1);
                return;
            }

            if (minutes === 0) {
                clearInterval(interval);
                return;
            }

            setMinutes(minutes - 1);
            setSeconds(59);
        }, 1000);
        return () => clearInterval(interval);
    });

    return [minutes, seconds];
};

export { useCountdown };
