import React from 'react';
import "../../styles/Global/ButtonNil.scss"
const ButtonNil = () => {
    return (
        <div id="container">
            <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Learn More</span>
            </button>
        </div>
    );
};

export default ButtonNil;
