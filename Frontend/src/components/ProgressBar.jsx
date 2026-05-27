import React from 'react';
import './style.css';

const ProgressBar = ({ isProgress }) => {

    if (!isProgress)
        return null;

    return (
        <div className='progress-container'>

            <div className='progress-bar'></div>

        </div>
    );
}

export default ProgressBar;