import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Only run on desktop
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const tagName = e.target.tagName.toLowerCase();
            const role = e.target.getAttribute('role');
            if (
                tagName === 'a' ||
                tagName === 'button' ||
                tagName === 'input' ||
                tagName === 'select' ||
                tagName === 'textarea' ||
                role === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Don't render on mobile/touch interfaces
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: "transparent",
            border: "1px solid rgba(197, 160, 89, 0.6)",
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            backgroundColor: "rgba(197, 160, 89, 0.15)",
            border: "1px solid rgba(197, 160, 89, 1)",
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        >
            <div className="cursor-dot" />
        </motion.div>
    );
};

export default CustomCursor;
