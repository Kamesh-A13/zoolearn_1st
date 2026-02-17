import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll reveal animations
 * Returns a ref and isVisible state for animating elements on scroll
 */
export function useScrollReveal(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

/**
 * ScrollReveal wrapper component for easy use
 */
export function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 600,
    className = '',
    ...props
}) {
    const [ref, isVisible] = useScrollReveal(props);

    const animationStyles = {
        'fade-up': {
            initial: { opacity: 0, transform: 'translateY(40px)' },
            visible: { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-down': {
            initial: { opacity: 0, transform: 'translateY(-40px)' },
            visible: { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-left': {
            initial: { opacity: 0, transform: 'translateX(-40px)' },
            visible: { opacity: 1, transform: 'translateX(0)' }
        },
        'fade-right': {
            initial: { opacity: 0, transform: 'translateX(40px)' },
            visible: { opacity: 1, transform: 'translateX(0)' }
        },
        'zoom-in': {
            initial: { opacity: 0, transform: 'scale(0.9)' },
            visible: { opacity: 1, transform: 'scale(1)' }
        },
        'fade': {
            initial: { opacity: 0 },
            visible: { opacity: 1 }
        }
    };

    const anim = animationStyles[animation] || animationStyles['fade-up'];
    const currentStyle = isVisible ? anim.visible : anim.initial;

    return (
        <div
            ref={ref}
            className={`scroll-reveal ${className}`}
            style={{
                ...currentStyle,
                transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
}

/**
 * Staggered children animation - reveals children one by one
 */
export function StaggerReveal({
    children,
    staggerDelay = 100,
    animation = 'fade-up',
    className = '',
    ...props
}) {
    const [ref, isVisible] = useScrollReveal(props);

    return (
        <div ref={ref} className={`stagger-reveal ${className}`}>
            {Array.isArray(children) ? children.map((child, index) => (
                <div
                    key={index}
                    className="stagger-item"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1) ${index * staggerDelay}ms`
                    }}
                >
                    {child}
                </div>
            )) : children}
        </div>
    );
}

export default ScrollReveal;
