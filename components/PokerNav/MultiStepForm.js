import React, { useState } from "react";
import Step1 from "./MultiStep1";
import Step2 from "./MultiStep2";
import Step3 from "./MultiStep3";
import Submit from "./MultiStepSubmit";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [steal, setSteal] = useState();

  const [formData, setFormData] = useState({
    card1: "",
    card2: "",
    suited: false,
    hand: "",
    position: "BT",
    oppPos: "BT",
    potState: "",
    potSubState: "", // default potsubstate?
    limpers: 0,
    ip: false,
    action: "",
    preFlopBetRound: 1,
  });

  const allRanges = {
    BT: {
      first: {
        call: [
          "AKs",
          "AKo",
          "AQs",
          "AQo",
          "AJs",
          "AJo",
          "ATs",
          "KQs",
          "KQo",
          "KJs",
          "QJs",
          "TT",
          "99",
          "88",
          "77",
          "66",
        ],
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATo",
          "ATs",
          "A9o",
          "A9s",
          "A8o",
          "A8s",
          "A7o",
          "A7s",
          "A6o",
          "A6s",
          "A5o",
          "A5s",
          "A4o",
          "A4s",
          "A3o",
          "A3s",
          "A2o",
          "A2s",
          "KK",
          "KQo",
          "KQs",
          "KJo",
          "KJs",
          "KTo",
          "KTs",
          "K9o",
          "K9s",
          "K8o",
          "K8s",
          "K7s",
          "K6s",
          "QQ",
          "QJo",
          "QJs",
          "QTo",
          "QTs",
          "Q9o",
          "Q9s",
          "Q8o",
          "Q8s",
          "Q7s",
          "Q6s",
          "JJ",
          "JTo",
          "JTs",
          "J9o",
          "J9s",
          "J8o",
          "J8s",
          "J7s",
          "J6s",
          "TT",
          "T9o",
          "T9s",
          "T8o",
          "T8s",
          "T7s",
          "T6s",
          "99",
          "98o",
          "98s",
          "97s",
          "96s",
          "88",
          "87o",
          "87s",
          "86s",
          "77",
          "76s",
          "66",
          "55",
          "44",
          "33",
          "22",
        ],
        IVbet: ["AA", "AKs", "AKo", "KK", "QQ", "JJ"],
      },
      raisers: {
        call: [
          "AKs",
          "AKo",
          "AQs",
          "AQo",
          "AJs",
          "ATs",
          "KQs",
          "KQo",
          "KJs",
          "QQ",
          "QJs",
          "JJ",
          "TT",
          "99",
          "88",
          "77",
          "66",
          "55",
        ],
        IIIbet: ["AA", "KK", "T9s", "98s", "87s"],
        IVbet: ["KK", "AA"],
      },
      steal: {
        call: [
          "AKs",
          "AKo",
          "AQs",
          "AQo",
          "AJs",
          "AJo",
          "ATs",
          "KQo",
          "KQs",
          "KJs",
          "KTs",
          "QJs",
          "QTs",
          "JJ",
          "JTs",
          "TT",
          "99",
          "88",
          "77",
          "66",
          "55",
          "44",
        ],
        IIIbet: [
          "AKs",
          "AKo",
          "A5s",
          "A4s",
          "A3s",
          "A2s",
          "QQ",
          "T9s",
          "98s",
          "87s",
        ],
        IVbet: ["QQ", "AKs", "AKo"],
      },
    },
    CO: {
      first: {
        call: ["AQs", "AQo", "JJ", "TT", "99", "88"],
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATo",
          "ATs",
          "A9o",
          "A9s",
          "A8o",
          "A8s",
          "A7o",
          "A7s",
          "A6s",
          "A5s",
          "A4s",
          "A3s",
          "A2s",
          "KK",
          "KQo",
          "KQs",
          "KJo",
          "KJs",
          "KTo",
          "KTs",
          "K9s",
          "K8s",
          "QQ",
          "QJo",
          "QJs",
          "QTo",
          "QTs",
          "Q9s",
          "Q8s",
          "JJ",
          "JTo",
          "JTs",
          "TT",
          "T9s",
          "99",
          "98s",
          "88",
          "77",
          "66",
          "55",
          "44",
          "33",
          "22",
        ],
        IVbet: ["AA", "AKs", "AKo", "KK", "QQ"],
      },
      raisers: {
        call: ["AKs", "AKo", "AQs", "AQo", "QQ", "JJ", "TT", "99", "88", "77"],
        IIIbet: ["AA", "KK", "T9s", "98s", "87s"],
        IVbet: ["KK", "AA"],
      },
      steal: {
        call: false,
        IIIbet: false,
        IVbet: false,
      },
    },
    MP: {
      first: {
        call: ["AKs", "AKo", "AQs", "AQo", "QQ", "JJ", "TT"],
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATo",
          "ATs",
          "A9s",
          "KK",
          "KQo",
          "KQs",
          "KJo",
          "KJs",
          "KTs",
          "K9s",
          "QQ",
          "QJo",
          "QJs",
          "QTs",
          "Q9s",
          "JJ",
          "JTs",
          "J9s",
          "TT",
          "T9s",
          "99",
          "88",
          "77",
          "66",
          "55",
        ],
        IVbet: ["AA", "KK"],
      },
      raisers: {
        call: ["AKs", "AKo", "AQs", "AQo", "QQ", "JJ", "TT", "99", "88"],
        IIIbet: ["AA", "KK", "T9s", "98s", "87s"],
        IVbet: ["KK", "AA"],
      },
      steal: {
        call: false,
        IIIbet: false,
        IVbet: false,
      },
    },
    EP: {
      first: {
        call: ["AKs", "AKo", "QQ", "JJ"],
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATs",
          "KK",
          "KQo",
          "KQs",
          "KJs",
          "KTs",
          "QQ",
          "QJs",
          "QTs",
          "JJ",
          "JTs",
          "TT",
          "99",
          "88",
          "77",
          "66",
        ],
        IVbet: ["AA", "KK"],
      },
      raisers: {
        call: false,
        IIIbet: false,
        IVbet: false,
      },
      steal: {
        call: false,
        IIIbet: false,
        IVbet: false,
      },
    },
    SB: {
      first: {
        call: [
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATs",
          "KQo",
          "KQs",
          "KJs",
          "QJs",
          "TT",
          "99",
          "88",
          "77",
          "66",
        ],
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATo",
          "ATs",
          "A9o",
          "A9s",
          "A8o",
          "A8s",
          "A7o",
          "A7s",
          "A6o",
          "A6s",
          "A5o",
          "A5s",
          "A4o",
          "A4s",
          "A3o",
          "A3s",
          "A2o",
          "A2s",
          "KK",
          "KQo",
          "KQs",
          "KJo",
          "KJs",
          "KTo",
          "KTs",
          "K9o",
          "K9s",
          "K8o",
          "K8s",
          "K7s",
          "K6s",
          "QQ",
          "QJo",
          "QJs",
          "QTo",
          "QTs",
          "Q9o",
          "Q9s",
          "Q8o",
          "Q8s",
          "Q7s",
          "Q6s",
          "JJ",
          "JTo",
          "JTs",
          "J9o",
          "J9s",
          "J8o",
          "J8s",
          "J7s",
          "J6s",
          "TT",
          "T9o",
          "T9s",
          "T8o",
          "T8s",
          "T7s",
          "T6s",
          "99",
          "98o",
          "98s",
          "97s",
          "96s",
          "88",
          "87o",
          "87s",
          "86s",
          "77",
          "76s",
          "66",
          "55",
          "44",
          "33",
          "22",
        ],
        IVbet: ["AA", "AKs", "AKo", "KK", "QQ", "JJ"],
      },
      raisers: {
        call: ["AKs", "AKo", "AQs", "AQo", "QQ", "JJ", "TT", "99", "88"],
        IIIbet: ["AA", "KK", "T9s", "98s", "87s"],
        IVbet: ["KK", "AA"],
      },
      steal: {
        call: [
          "AKs",
          "AKo",
          "AQs",
          "AQo",
          "AJs",
          "AJo",
          "ATs",
          "ATo",
          "A9s",
          "KQs",
          "KQo",
          "KJs",
          "KTs",
          "QJs",
          "QTs",
          "JJ",
          "JTs",
          "TT",
          "99",
          "88",
          "77",
          "66",
        ],
        IIIbet: [
          "AKs",
          "AKo",
          "A5s",
          "A4s",
          "A3s",
          "A2s",
          "QQ",
          "T9s",
          "98s",
          "87s",
        ],
        IVbet: ["QQ", "AKs", "AKo"],
      },
    },
    BB: {
      first: {
        call: false,
        open: [
          "AA",
          "AKo",
          "AKs",
          "AQo",
          "AQs",
          "AJo",
          "AJs",
          "ATs",
          "KK",
          "KQo",
          "KQs",
          "KJs",
          "KTs",
          "QQ",
          "QJs",
          "QTs",
          "JJ",
          "JTs",
          "TT",
          "99",
          "88",
          "77",
          "66",
        ],
        IVbet: false,
      },
      raisers: {
        call: ["AKs", "AKo", "AQs", "AQo", "QQ", "JJ", "TT", "99", "88"],
        IIIbet: ["AA", "KK", "T9s", "98s", "87s"],
        IVbet: ["KK", "AA"],
      },
      steal: {
        call: [
          "AKs",
          "AKo",
          "AQs",
          "AQo",
          "AJs",
          "AJo",
          "ATs",
          "ATo",
          "A9s",
          "KQs",
          "KQo",
          "KJs",
          "KJo",
          "KTs",
          "K9s",
          "QJs",
          "QJo",
          "QTs",
          "Q9s",
          "JTs",
          "J9s",
          "TT",
          "T9s",
          "99",
          "88",
          "77",
          "66",
          "55",
          "44",
          "33",
          "22",
        ],
        IIIbet: [
          "AA",
          "AKs",
          "AKo",
          "AQs",
          "A9s",
          "A8s",
          "A7s",
          "A6s",
          "A5s",
          "A4s",
          "A3s",
          "A2s",
          "KK",
          "QQ",
          "JJ",
          "T9s",
          "98s",
          "87s",
          "76s",
          "65s",
        ],
        IVbet: false,
      },
    },
  };

  const allActions = {
    BT: {
      first: {
        call: "Fold",
        open: 2.5,
        IVbet: "2.5 X Raise size",
      },
      raisers: {
        call: "Call",
        IIIbet: "3 X Raise size",
        IVbet: "All-in",
      },
      steal: {
        call: "Call",
        IIIbet: "4 X Raise size",
        IVbet: "All-in",
      },
    },
    CO: {
      first: {
        call: "Call",
        open: 2.5,
        IVbet: "2.5 X Raise size",
      },
      raisers: {
        call: "Call",
        IIIbet: "3 X Raise size",
        IVbet: "All-in",
      },
      steal: {
        call: "Fold",
        IIIbet: "Fold",
        IVbet: "Fold",
      },
    },
    MP: {
      first: {
        call: "Call",
        open: 2.5,
        IVbet: "2.5 X Raise size",
      },
      raisers: {
        call: "Call",
        IIIbet: "3 X Raise size",
        IVbet: "All-in",
      },
      steal: {
        call: "Fold",
        IIIbet: "Fold",
        IVbet: "Fold",
      },
    },
    EP: {
      first: {
        call: "Call",
        open: 3,
        IVbet: "2.5X Raise size",
      },
      raisers: {
        call: "Fold",
        IIIbet: "Fold",
        IVbet: "Fold",
      },
      steal: {
        call: "Fold",
        IIIbet: "Fold",
        IVbet: "Fold",
      },
    },
    SB: {
      first: {
        call: "Call",
        open: 2.5,
        IVbet: "2.5 X Raise size",
      },
      raisers: {
        call: "4 X Raise size",
        IIIbet: "Call",
        IVbet: "All-in",
      },
      steal: {
        call: "Call",
        IIIbet: "4 X Raise size",
        IVbet: "All-in",
      },
    },
    BB: {
      first: {
        call: "Fold",
        open: 2.5,
        IVbet: "Fold",
      },
      raisers: {
        call: "4 X Raise size",
        IIIbet: "4 X Raise size",
        IVbet: "All-in",
      },
      steal: {
        call: "Call",
        IIIbet: "4 X Raise size",
        IVbet: "Fold",
      },
    },
  };

  const checkPreFlopAction = (potState) => {
    // if hand exists in potState, find currect action
    const getAction = getActionFromRange(potState);
    return getAction;
  };

  const getPreFlopAction = (preFlopBetRound, getAction, potState) => {
    const checkAction = allActions[formData.position][potState][getAction];
    console.log(
      "I checkAction: ",
      checkAction,
      "potState: ",
      potState,
      "subState: ",
      getAction
    );

    //return checkAction
    const actionToTake = checkAction ? checkAction : false;
    if (!actionToTake) {
      console.log("Fold !Match");
      return "Fold";
    } else {
      switch (preFlopBetRound) {
        case 1: {
          if (getAction == "open") {
            // If MP or EP add 1 extra bb
            const extra_bb = ["MP", "EP"];
            var extra = 0;

            if (extra_bb.includes(formData.position)) {
              extra = 1;
            }

            const open = checkAction + formData.limpers + extra;
            const bb = "Raise: " + open + "bb";
            return bb;
          }
        }
        case 2: {
          // SubState="IVbet"
          console.log(
            "II checkAction: ",
            checkAction,
            "potState: ",
            potState,
            "subState: ",
            getAction
          );

          return actionToTake;
        }
      }
    } // End main else
  };

  const getActionFromRange = (potState) => {
    // store actions in new array based on position-potstate
    var arrayActions = Object.keys(allRanges[formData.position][potState]);
    console.log(arrayActions, formData.position, potState, formData.hand);

    switch (formData.preFlopBetRound) {
      case 1: {
        // Check IIIbet and call (based on index 1-0)
        const r1_actionI = String(
          allRanges[formData.position][potState][arrayActions[0]]
        ).includes(formData.hand);
        const r1_actionII = String(
          allRanges[formData.position][potState][arrayActions[1]]
        ).includes(formData.hand);

        if (r1_actionII) {
          // Call/IIIbet ?
          return arrayActions[1];
        } else if (r1_actionI) {
          // Call/open ?
          return arrayActions[0];
        } else {
          return false;
        }
      }
      case 2: {
        // Check IVbet (based on index 2)
        const actionRound2 = String(
          allRanges[formData.position][potState][arrayActions[2]]
        ).includes(formData.hand);
        if (actionRound2) {
          return arrayActions[2];
        } else {
          return false;
        }
      }
      default: {
        return false;
      }
    }
  };

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
          steal={steal}
          setSteal={setSteal}
          currentStep={currentStep}
          allRanges={allRanges}
          allActions={allActions}
          getPreFlopAction={getPreFlopAction}
          checkPreFlopAction={checkPreFlopAction}
          setCurrentStep={setCurrentStep}
          next={next}
        />
      );
    case 3:
      return (
        <Submit
          formData={formData}
          setFormData={setFormData}
          setSteal={setSteal}
          allRanges={allRanges}
          allActions={allActions}
          setCurrentStep={setCurrentStep}
          getPreFlopAction={getPreFlopAction}
        />
      );
    case 4:
      return (
        <Step3
          formData={formData}
          setFormData={setFormData}
          setSteal={setSteal}
          allRanges={allRanges}
          allActions={allActions}
          setCurrentStep={setCurrentStep}
        />
      );

    default:
      return "Error";
  }
};
export default MultiStepForm;
