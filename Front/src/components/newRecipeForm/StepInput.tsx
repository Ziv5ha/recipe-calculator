import React from 'react';

export default function StepInput({
  index,
  stepIndex,
  removeStep,
}: {
  index: number;
  stepIndex: number;
  removeStep: (i: number) => void;
}) {
  return (
    <li>
      <input
        type='textarea'
        name={`sub-step ${index} for step-title #${stepIndex}`}
        required
      />
      <button
        type='button'
        onClick={() => {
          removeStep(index);
        }}
      >
        remove sub step
      </button>
    </li>
  );
}
