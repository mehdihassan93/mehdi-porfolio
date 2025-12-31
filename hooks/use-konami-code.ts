import { useEffect, useState } from 'react';

export const useKonamiCode = () => {
    const [triggered, setTriggered] = useState(false);
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === konamiCode[index]) {
                const nextIndex = index + 1;
                if (nextIndex === konamiCode.length) {
                    setTriggered(true);
                    setIndex(0);
                } else {
                    setIndex(nextIndex);
                }
            } else {
                setIndex(0);
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [index]);

    return triggered;
};
