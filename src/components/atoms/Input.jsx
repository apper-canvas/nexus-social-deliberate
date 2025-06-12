import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, rows, maxLength, ...rest }) => {
    const commonProps = {
        value,
        onChange,
        placeholder,
        className: `w-full p-4 bg-surface border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${className || ''}`,
        maxLength,
        ...rest
    };

    if (type === 'textarea') {
        return <textarea rows={rows} {...commonProps} />;
    }

    return <input type={type} {...commonProps} />;
};

export default Input;