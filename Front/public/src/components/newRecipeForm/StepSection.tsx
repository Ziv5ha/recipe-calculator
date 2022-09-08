import React, { useEffect, useState } from 'react';
import { copyJsxObj } from '../../helpers/formHelpers';
import StepInput from './StepInput';

export default function StepSection({
  index,
  removeStep,
}: {
  index: number;
  removeStep: (i: number) => void;
}) {
  const [stepsInputs, setStepsInputs] = useState<{
    [key: number]: JSX.Element;
  }>({});
  const addStepSection = () => {
    setStepsInputs((prev) => {
      const prevCopy = copyJsxObj(prev);
      let i =
        Math.max(...Object.keys(prevCopy).map((numStr) => Number(numStr))) + 1;
      if (i === -Infinity) i = 1;
      prevCopy[i] = (
        <StepInput
          index={i}
          removeStep={removeStepInput}
          stepIndex={index}
          key={`subStep #${i}`}
        />
      );
      return prevCopy;
    });
  };
  const removeStepInput = (i: number): void => {
    setStepsInputs((prev) => {
      const prevCopy = copyJsxObj(prev);
      delete prevCopy[i];
      return prevCopy;
    });
  };
  useEffect(() => {
    setStepsInputs({
      1: (
        <StepInput
          index={1}
          removeStep={removeStepInput}
          stepIndex={index}
          key={'subStep #1'}
        />
      ),
    });
  }, []);

  return (
    <li>
      <div className='step-title'>
        <h5>step title:</h5>
        <input type='textarea' name={`step-name #${index}`} required />
      </div>
      <ol>{Object.values(stepsInputs)}</ol>
      <button type='button' onClick={addStepSection}>
        add sub step
      </button>
      <button
        type='button'
        onClick={() => {
          removeStep(index);
        }}
      >
        remove step
      </button>
    </li>
  );
}
