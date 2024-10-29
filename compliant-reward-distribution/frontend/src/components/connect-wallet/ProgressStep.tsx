import React from 'react';
import '../../styles/ProgressStep.scss'; // Import your SCSS file

const ProgressStep = ({
  number,
  active,
}: {
  number: number;
  active: boolean;
}) => (
  <div className="d-flex align-items-center">
    <div
      className={`step-circle ${active ? 'active' : 'inactive'}`}
    >
      {number}
    </div>
    {number < 3 && (
      <div
        className={`step-line ${active ? 'active' : 'inactive'}`}
      ></div>
    )}
  </div>
);

export default ProgressStep;
