export const smoothScrollTo = (targetY: number, duration: number = 2000) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // EaseInOutCubic for a very premium feel
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + difference * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};
