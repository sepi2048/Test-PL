import React, { useState } from "react";
import Step1 from "./MultiStep1";
import Step2 from "./MultiStep2";
import Step3 from "./MultiStep3";
import Submit from "./MultiStepSubmit";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    card1: "",
    card2: "",
    suited: false,
    hand: "",
    position: "BT",
    potState: "",
    limpers: 0,
    ip: false,
    action: "",
  });

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  switch (currentStep) {
    case 1:
      return (
        <Step1
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          next={next}
        />
      );
    case 2:
      return (
        <Step2
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          next={next}
        />
      );
    case 3:
      return (
        <Submit
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      );

    default:
      return "Error";
  }
};
export default MultiStepForm;
