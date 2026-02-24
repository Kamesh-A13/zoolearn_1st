import { useEffect, useState } from 'react';

/**
 * Animated count-up component with easing.
 * Shared across Banner, ZooHub, and any future usage.
 */
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrameId;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);
            // easeOutQuad for a natural slowdown effect
            const easeProgress = 1 - (1 - percentage) * (1 - percentage);
            setCount(Math.floor(easeProgress * end));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    return <span>{count}</span>;
};

export default CountUp;
