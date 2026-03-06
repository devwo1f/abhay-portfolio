import { useEffect, useRef } from 'react';

export const VisualBackdrop = ({ coverImage }: { coverImage?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

        const initParticles = () => {
            particles = [];
            const numParticles = Math.floor((canvas.width * canvas.height) / 15000); // Responsive particle count
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                });
            }
        };

        const resize = () => {
            // Get the parent's size or fall back to window
            canvas.width = window.innerWidth;
            // We want the canvas to cover the whole document height ideally, or just be fixed
            canvas.height = window.innerHeight;
            initParticles();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a subtle gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(10, 10, 10, 0.1)'); // Dark theme approximation
            gradient.addColorStop(1, 'rgba(10, 10, 10, 0.03)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update particles
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around bounds
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                // Using a generic subtle color for particles, pulling from CSS variables might be tricky in pure canvas so we use a semi-transparent white/gray
                ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* If a cover image exists, we render a huge background image with dark overlay */}
            {coverImage && (
                <div
                    className="fixed inset-0 -z-20 w-screen h-screen bg-cover bg-center object-cover"
                    style={{ backgroundImage: `url(${coverImage})`, transform: 'scale(1.05)' }}
                />
            )}

            {/* The particle canvas is still rendered over top, blending with the image if present */}
            <canvas
                ref={canvasRef}
                className={`fixed inset-0 -z-10 pointer-events-none ${coverImage ? 'bg-background/40 backdrop-blur-md' : 'bg-background'}`}
                style={{ opacity: coverImage ? 1 : 0.8 }}
            />
        </>
    );
};
