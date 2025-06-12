import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, disabled, type = 'button', ...motionProps }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;