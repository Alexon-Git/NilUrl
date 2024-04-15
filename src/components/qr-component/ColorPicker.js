import React from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";
 
export default function ColorPickerGfg() {
    const [color, setColor] = 
        useColor("hex", "#000000");
 
    return (
        <div>
            <ColorPicker width={456} height={228}
                color={color}
                onChange={setColor} hideHSV dark />;
        </div>
    )
};