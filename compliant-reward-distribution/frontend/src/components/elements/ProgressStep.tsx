import React from 'react';
import '../../styles/ProgressStep.scss'; // Import your SCSS file

interface ProgressStepProps {
    number: number;
    active: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ number, active }) => (
    <div className="progress-step d-flex align-items-center">
        <div
            className={`step-circle d-flex align-items-center justify-content-center ${active ? 'active' : 'inactive'}`}
        >
            {number}
        </div>
        {number < 3 && <div className={`step-line ${active ? 'active' : 'inactive'}`} />}
    </div>
);

export default ProgressStep;
