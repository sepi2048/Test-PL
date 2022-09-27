import React from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Submit = (props) => {
  const { formData, setAction, action, setCurrentStep, setFormData } = props;
  console.log(formData);

  const newHand = () => {
    setCurrentStep(1);
    setFormData({
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
    // setAction("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <div>
        <h2>{formData.action}</h2>
        <FormControl>
          <Button variant="contained" onClick={newHand}>
            New Hand
          </Button>
        </FormControl>

        <FormControl>
          <Button variant="contained" onClick={newHand}>
            Did opponet raise?
          </Button>
        </FormControl>
      </div>
    </Box>
  );
};
export default Submit;
