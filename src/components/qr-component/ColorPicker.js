import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";
 
export default function ColorPickerGfg({ initialColor, onColorChange }) {
    const [color, setColor] = useColor("hex", initialColor);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const handleColorChange = (newColor) => {
        setColor(newColor);
        onColorChange(newColor);
    };

    const handleColorPickerToggle = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

    return (
        <div>
            <button
                className="color-picker" 
                style={{ borderColor: color.hex }}
                onClick={handleColorPickerToggle}
                aria-expanded={isColorPickerOpen} 
                aria-controls="color-picker-menu"
            >
                {color.hex}
            </button>
            {isColorPickerOpen && (
                <ColorPicker
                    id="color-picker-menu"
                    color={color}
                    onChange={handleColorChange}
                />
            )}
        </div>
    );
};