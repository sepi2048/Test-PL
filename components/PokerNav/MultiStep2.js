import React, { useState } from "react";
import Box from "@mui/material/Box";

import Link from "@mui/material/Link";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

import Stack from "@mui/material/Stack";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";

import Slider from "@mui/material/Slider";
import { ConstructionOutlined } from "@mui/icons-material";

const Step2 = (props) => {
  const {
    formData,
    setFormData,
    setSteal,
    steal,
    currentStep,
    allRanges,
    allActions,
    setCurrentStep,
    checkPreFlopAction,
    getPreFlopAction,
  } = props;
  const [message, setMessage] = useState(null);

  const theme = createTheme({
    root: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "blue",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
      },
    },
    palette: {
      primary: {
        main: "#45ca63",
        contrastText: "#505050",
        fontWeightBold: 900,
      },
      secondary: {
        main: "#505050",
        fontWeight: 900,
      },
      /*     text: {
      primary: "#45ca63",
    }, */
      typography: {
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            "&.MuiFormLabel-root": {
              backgroundColor: "#897709",
              color: "#fff",
              border: "#fff",
            },
          },
        },
      },
    },
  });

  // Slide
  const positionInputValues = [
    {
      value: 1,
      scaledValue: 1,
      label: "BT",
    },
    {
      value: 2,
      scaledValue: 2,
      label: "CO",
    },
    {
      value: 3,
      scaledValue: 3,
      label: "MP",
    },
    {
      value: 4,
      scaledValue: 4,
      label: "EP",
    },
    {
      value: 5,
      scaledValue: 5,
      label: "BB",
    },
    {
      value: 6,
      scaledValue: 6,
      label: "SB",
    },
  ];

  const positionOppInputValues = [
    {
      value: 1,
      scaledValue: 1,
      label: "BT",
    },
    {
      value: 2,
      scaledValue: 2,
      label: "CO",
    },
    {
      value: 3,
      scaledValue: 3,
      label: "MP",
    },
    {
      value: 4,
      scaledValue: 4,
      label: "EP",
    },
    {
      value: 5,
      scaledValue: 5,
      label: "BB",
    },
    {
      value: 6,
      scaledValue: 6,
      label: "SB",
    },
  ];
  const [positionValue, setpositionValue] = React.useState(1);
  const [positionOppValue, setpositionOppValue] = React.useState(1);

  const newHand = () => {
    setSteal("");
    setCurrentStep(1);
    setFormData({
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
  };

  const handleSlideChange = (event, newValue) => {
    setpositionValue(newValue);

    const tablePosition = {
      1: "BT",
      2: "CO",
      3: "MP",
      4: "EP",
      5: "BB",
      6: "SB",
    };
    if (newValue in tablePosition) {
      setFormData({ ...formData, position: tablePosition[newValue] });
    }
  };

  const handleSlideOppChange = (event, newValue) => {
    setpositionOppValue(newValue);

    const tablePosition = {
      1: "BT",
      2: "CO",
      3: "MP",
      4: "EP",
      5: "BB",
      6: "SB",
    };
    if (newValue in tablePosition) {
      setFormData({ ...formData, oppPos: tablePosition[newValue] });
    }
  };

  const [limpCount, setLimpCount] = useState(0);

  const handleIncrement = () => {
    // +
    if (limpCount < 10) {
      setLimpCount(limpCount + 1);
      setFormData({ ...formData, limpers: limpCount + 1 });
    } else {
      limpError = true;
    }
  };

  const handleDecrement = () => {
    // -
    if (limpCount > 1) {
      setLimpCount(limpCount - 1);
      setFormData({ ...formData, limpers: limpCount - 1 });
    } else {
      limpError = true;
    }
  };

  const continueBtn = () => {
    // don't «send inn» if potState="raisers" and oppPos = null
    const getSubState = checkPreFlopAction(potState);

    const actionToTake = getPreFlopAction(1, getSubState, potState);

    setFormData({
      ...formData,
      action: actionToTake,
      potState: potState,
      potSubState: getSubState,
    });

    setCurrentStep(currentStep + 1);
  };

  var potState = formData.potState;

  const evaluate = () => {
    if (formData.potState !== "") {
      // check if hand is playable based on position
      const posHands = Object.values(allRanges[formData.position]);
      const posRange = [];
      posHands.forEach((element) => posRange.push(Object.values(element)));
      const handsToPlay = posRange.flat(2);

      if (handsToPlay.includes(formData.hand)) {
        if (formData.potState === "raisers") {
          if (formData.oppPos !== "") {
            console.log(
              "formData.oppPos !== formData.position ",
              formData.oppPos !== formData.position,
              formData.oppPos,
              formData.position
            );
            if (formData.oppPos !== formData.position) {
              const steal_oppPos = ["BT", "CO"];

              if (steal_oppPos.includes(formData.oppPos)) {
                potState = "steal";
                //console.log("steal");
              }

              continueBtn();
            } else {
              setMessage("Positions must differ");
              setTimeout(() => {
                setMessage(null);
              }, 6000);
            }
          } else {
            setMessage("Select opponent Position");
            setTimeout(() => {
              setMessage(null);
            }, 6000);
          }
        } else {
          continueBtn();
        }
      } else if (
        formData.potState === "raisers" &&
        formData.oppPos === formData.position
      ) {
        setMessage("Positions must differ");
        setTimeout(() => {
          setMessage(null);
        }, 6000);
      } else {
        console.log("Fold hand no match");
        setCurrentStep(currentStep + 1);

        console.log("Fold NM");

        setFormData({ ...formData, action: "Fold" });
      }
    } else {
      setMessage("Select pot state");
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
        <Card sx={{ maxWidth: 325, border: 0, boxShadow: 5, borderRadius: 5 }}>
          <CardContent>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1.5, width: 270 }}>
                <div className="navigator-title s2">
                  <p className="step2">Table Position & Pot State</p>
                </div>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ ml: 4.2 }}>
                <Box>
                  <Slider
                    style={{ width: 240 }}
                    min={1}
                    max={6}
                    step={1}
                    value={positionValue}
                    marks={positionInputValues}
                    onChange={handleSlideChange}
                    valueLabelDisplay="auto"
                    defaultValue={1}
                  />
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ ml: 2.5, my: 1, width: 270 }}>
                <ToggleButtonGroup
                  value={formData.potState}
                  exclusive
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      potState: e.target.value,
                      limpers: limpCount, // if limp=1, update at first change
                    });
                  }}
                  aria-label="text alignment"
                  color="primary"
                >
                  <ToggleButton
                    value="first"
                    aria-label="left aligned"
                    sx={{ fontSize: 24 }}
                  >
                    First In
                  </ToggleButton>
                  {/*                   <ToggleButton value="limpers" aria-label="centered">
                    Limpers
                  </ToggleButton> */}
                  <ToggleButton
                    sx={{ fontSize: 24 }}
                    value="raisers"
                    aria-label="right aligned"
                  >
                    Raisers
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              <div className="px-4">
                <p className="navigator-error">{message}</p>
              </div>
            </Grid>

            {formData.potState == "raisers" ? (
              <>
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <FormControl>
                      <small className="navigator-sub-title">
                        What is the Raiser position?
                      </small>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ ml: 4.2 }}>
                    <Box>
                      <Slider
                        style={{ width: 240 }}
                        min={1}
                        max={6}
                        step={1}
                        value={positionOppValue}
                        marks={positionOppInputValues}
                        onChange={handleSlideOppChange}
                        valueLabelDisplay="auto"
                        defaultValue={1}
                      />
                    </Box>
                  </FormControl>
                </Grid>
              </>
            ) : (
              ""
            )}
            {formData.potState == "first" ? (
              <>
                <Grid item xs={12}>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl sx={{ my: 1, ml: 1.5, width: 260 }}>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleDecrement}
                        >
                          -
                        </Button>

                        <TextField
                          disabled
                          value={limpCount}
                          id="outlined-basic"
                          label="Limpers"
                          variant="outlined"
                          inputProps={{
                            style: { textAlign: "center", fontColor: "#000" },
                          }}
                        />

                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleIncrement}
                        >
                          +
                        </Button>
                      </Stack>
                    </FormControl>
                  </Box>
                </Grid>
              </>
            ) : (
              ""
            )}

            <Grid item xs={12} alignItems="center" justify="center">
              <Box textAlign="center">
                <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                  <Button
                    variant="contained"
                    className="navigator-btn"
                    onClick={evaluate}
                  >
                    Continue
                  </Button>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} alignItems="center" justify="center">
              <Box textAlign="center">
                <FormControl className="navigator-link">
                  <Link component="button" onClick={newHand}>
                    New Hand
                  </Link>
                </FormControl>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
export default Step2;
