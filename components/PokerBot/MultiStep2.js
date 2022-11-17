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

const Step2 = (props) => {
  const { formData, setFormData, currentStep, setCurrentStep } = props;
  const [message, setMessage] = useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#45ca63",
        contrastText: "#fff",
      },
    },
    typography: {
      // fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
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
  const [positionValue, setpositionValue] = React.useState(1);

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

  const [limpCount, setLimpCount] = useState(1);
  const limpError = "";

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

  // Cold calling and set mining

  const setMining = ["22", "33", "44", "55"];

  const nuts = ["AA", "AKs", "AKo", "KK"];

  const limpRange = [
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
    "A8s",
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
    "QQ",
    "QJo",
    "QJs",
    "QTo",
    "QTs",
    "Q9s",
    "JJ",
    "JTo",
    "JTs",
    "J9s",
    "TT",
    "T9s",
    "99",
    "98s",
    "88",
    "87s",
    "77",
    "66",
    "55",
    "44",
    "33",
    "22",
  ];

  const positionRange = {
    BT: {
      first: [
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
        "K7o",
        "K7s",
        "K6s",
        "K5s",
        "QQ",
        "QJo",
        "QJs",
        "QTo",
        "QTs",
        "Q9o",
        "Q9s",
        "Q8s",
        "Q7s",
        "Q6s",
        "JJ",
        "JTo",
        "JTs",
        "J9o",
        "J9s",
        "J8s",
        "J7s",
        "TT",
        "T9o",
        "T9s",
        "T8o",
        "T8s",
        "T7s",
        "99",
        "98o",
        "98s",
        "97s",
        "88",
        "87o",
        "87s",
        "86s",
        "77",
        "76s",
        "75s",
        "66",
        "65s",
        "64s",
        "55",
        "54s",
        "44",
        "43s",
        "33",
        "22",
      ],
      limpers: limpRange,
      raisers: [...setMining, ...nuts],
    },
    CO: {
      first: [
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
        "A8s",
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
        "JJ",
        "JTo",
        "JTs",
        "J9s",
        "TT",
        "T9s",
        "T8s",
        "99",
        "98s",
        "97s",
        "88",
        "87s",
        "86s",
        "77",
        "76s",
        "75s",
        "66",
        "65s",
        "55",
        "44",
        "33",
        "22",
      ],
      limpers: limpRange,
      raisers: [...setMining, ...nuts],
    },
    MP: {
      first: [
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
        "A5s",
        "A4s",
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
        "J9s",
        "TT",
        "T9s",
        "T8s",
        "99",
        "98s",
        "97s",
        "88",
        "87s",
        "77",
        "76s",
        "66",
        "55",
        "44",
      ],
      limpers: limpRange,
      raisers: [...setMining, ...nuts],
    },
    EP: {
      first: [
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
        "T9s",
        "99",
        "98s",
        "88",
        "87s",
        "77",
        "66",
        "55",
      ],
      limpers: limpRange,
      raisers: [...setMining, ...nuts],
    },
    SB: {
      first: [
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
        "A8s",
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
        "JJ",
        "JTo",
        "JTs",
        "J9s",
        "TT",
        "T9s",
        "T8s",
        "99",
        "98s",
        "97s",
        "88",
        "87s",
        "86s",
        "77",
        "76s",
        "75s",
        "66",
        "65s",
        "55",
        "44",
        "33",
        "22",
      ],
      limpers: limpRange,
      raisers: [...setMining, ...nuts],
    },
    BB: { first: [null], limpers: [], raisers: [...setMining, ...nuts] },
  };

  const allPair = [
    "AA",
    "KK",
    "QQ",
    "JJ",
    "TT",
    "99",
    "88",
    "77",
    "66",
    "55",
    "44",
    "33",
    "22",
  ];
  const broadways = [];

  const evaluate = () => {
    if (formData.potState !== "") {
      setCurrentStep(currentStep + 1);
      if (
        positionRange[formData.position][formData.potState].includes(
          formData.hand
        )
      ) {
        if (formData.potState === "first") {
          setFormData({ ...formData, action: "Raise $6" });
        } else if (formData.potState === "limpers") {
          const limpRaise = formData.ip
            ? 3 + formData.limpers
            : 3 + 1 + formData.limpers;
          setFormData({ ...formData, action: "Raise $" + limpRaise });
        } else if (formData.potState === "raisers") {
          if (nuts.includes(formData.hand)) {
            //setFormData({ ...formData, action: "3bet (re-raise the raise)" });
            setFormData({ ...formData, action: "3bet" });
          }

          if (setMining.includes(formData.hand)) {
            setFormData({ ...formData, action: "Call" });
          }
        }
      } else {
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
                🚨 Table Position & Actions 🚨
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
                  <ToggleButton value="first" aria-label="left aligned">
                    First In
                  </ToggleButton>
                  <ToggleButton value="limpers" aria-label="centered">
                    Limpers
                  </ToggleButton>
                  <ToggleButton value="raisers" aria-label="right aligned">
                    Raisers
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              <div className="px-4">
                <p style={{ color: "red" }}>{message}</p>
              </div>
            </Grid>

            {formData.potState == "limpers" ? (
              <>
                <Grid item xs={12}>
                  <Box
                    ml={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl sx={{ width: 215 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                ip: e.target.checked,
                              });
                              console.log(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              );
                            }}
                            value={formData.ip}
                            checked={formData.ip}
                            name="ip"
                          />
                        }
                        label="Are You In Position?"
                      />
                    </FormControl>
                  </Box>
                </Grid>
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
                  <Button variant="contained" onClick={evaluate}>
                    Continue
                  </Button>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} alignItems="center" justify="center">
              <Box textAlign="center">
                <FormControl className="flop-calc-link">
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
