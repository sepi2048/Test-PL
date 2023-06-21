import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "@mui/material/Link";

import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";

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

// Updated
const neverPlay = [
  "K7o",
  "K6o",
  "K5o",
  "K5s",
  "K4o",
  "K4s",
  "K3o",
  "K3s",
  "K2o",
  "K2s",
  "Q7o",
  "Q6o",
  "Q5o",
  "Q5s",
  "Q4o",
  "Q4s",
  "Q3o",
  "Q3s",
  "Q2o",
  "Q2s",
  "J7o",
  "J6o",
  "J5o",
  "J5s",
  "J4o",
  "J4s",
  "J3o",
  "J3s",
  "J2o",
  "J2s",
  "T7o",
  "T6o",
  "T5o",
  "T5s",
  "T4o",
  "T4s",
  "T3o",
  "T3s",
  "T2o",
  "T2s",
  "97o",
  "96o",
  "95o",
  "95s",
  "94o",
  "94s",
  "93o",
  "93s",
  "92o",
  "92s",
  "86o",
  "85o",
  "85s",
  "84o",
  "84s",
  "83o",
  "83s",
  "82o",
  "82s",
  "76o",
  "75o",
  "75s",
  "74o",
  "74s",
  "73o",
  "73s",
  "72o",
  "72s",
  "65o",
  "65s",
  "64o",
  "64s",
  "63o",
  "63s",
  "62o",
  "62s",
  "54o",
  "54s",
  "53o",
  "53s",
  "52o",
  "52s",
  "43o",
  "43s",
  "42o",
  "42s",
  "32o",
  "32s",
];

const allPairs = [
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

const Step1 = (props) => {
  const { formData, setFormData, currentStep, setCurrentStep } = props;
  const [message, setMessage] = useState(null);

  const hand = (cards) => {
    const replace = (num) => {
      if (num in royalty) {
        return (num = royalty[num]);
      }
      return num;
    };

    const royalty = { 14: "A", 13: "K", 12: "Q", 11: "J", 10: "T" };
    const sorted = cards.sort((a, b) => b - a);
    const toLetter = sorted.map(replace);

    const suited = allPairs.includes(toLetter.join(""))
      ? ""
      : formData.suited
      ? "s"
      : "o";

    return toLetter.join("") + suited;
  };

  const cards =
    formData.card2 !== "" && formData.card2 !== ""
      ? hand([formData.card1, formData.card2])
      : "No hand";

  const fold = neverPlay.includes(cards) ? true : false;

  const evaluate = () => {
    if (cards !== "No hand") {
      fold ? setCurrentStep(3) : setCurrentStep(currentStep + 1);
      fold
        ? setFormData({ ...formData, action: "Fold" })
        : setFormData({ ...formData, hand: cards });
    } else {
      setMessage("Select both cards");
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
        <Card sx={{ width: 325, border: 0, boxShadow: 5, borderRadius: 5 }}>
          <CardContent>
            <Grid item xs={12}>
              <Box textAlign="center">
                <FormControl>
                  <div className="navigator-title step1">
                    <svg
                      id="app-icon"
                      version="1.1"
                      viewBox="0 0 60 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="path2"
                        d="m13.725 46.275 21.75-10.725 10.725-21.75-21.75 10.725zm16.275-13.275q-1.275 0-2.1375-0.8625t-0.8625-2.1375 0.8625-2.1375 2.1375-0.8625 2.1375 0.8625 0.8625 2.1375-0.8625 2.1375-2.1375 0.8625zm0 27q-6.15 0-11.625-2.3625t-9.5625-6.45-6.45-9.5625-2.3625-11.625q0-6.225 2.3625-11.7t6.45-9.525 9.5625-6.4125 11.625-2.3625q6.225 0 11.7 2.3625t9.525 6.4125 6.4125 9.525 2.3625 11.7q0 6.15-2.3625 11.625t-6.4125 9.5625-9.525 6.45-11.7 2.3625zm0-4.5q10.65 0 18.075-7.4625t7.425-18.038q0-10.65-7.425-18.075t-18.075-7.425q-10.575 0-18.038 7.425t-7.4625 18.075q0 10.575 7.4625 18.038t18.038 7.4625z"
                        fill="#2d2d2d"
                        stroke-width="1.5"
                      />
                    </svg>

                    <p className="step1">Poker Navigator</p>
                    <small>
                      Get the upper hand with powerful insights at your
                      fingertips.
                    </small>
                    <br />
                  </div>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ m: 0.5, width: 135 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  className="navigator-dropdown-label"
                  color="secondary"
                >
                  First Card
                </InputLabel>
                <Select
                  className="navigator-dropdown"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="secondary"
                  displayEmpty
                  value={formData.card1}
                  label="First Card"
                  onChange={(e) =>
                    setFormData({ ...formData, card1: e.target.value })
                  }
                >
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={14}
                  >
                    A
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={13}
                  >
                    K
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={12}
                  >
                    Q
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={11}
                  >
                    J
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={10}
                  >
                    T
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={9}
                  >
                    9
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={8}
                  >
                    8
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={7}
                  >
                    7
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={6}
                  >
                    6
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={5}
                  >
                    5
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={4}
                  >
                    4
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={3}
                  >
                    3
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={2}
                  >
                    2
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 0.5, width: 135 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  className="navigator-dropdown-label"
                  color="secondary"
                >
                  Second Card
                </InputLabel>
                <Select
                  className="navigator-dropdown"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  value={formData.card2}
                  label="Second Card"
                  color="secondary"
                  onChange={(e) =>
                    setFormData({ ...formData, card2: e.target.value })
                  }
                >
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={14}
                  >
                    A
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={13}
                  >
                    K
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={12}
                  >
                    Q
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={11}
                  >
                    J
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={10}
                  >
                    T
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={9}
                  >
                    9
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={8}
                  >
                    8
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={7}
                  >
                    7
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={6}
                  >
                    6
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={5}
                  >
                    5
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={4}
                  >
                    4
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={3}
                  >
                    3
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#505050",
                    }}
                    value={2}
                  >
                    2
                  </MenuItem>
                </Select>
              </FormControl>
              <div className="px-2">
                <p style={{ color: "red" }}>{message}</p>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ m: 1.5, width: 120 }}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          suited: e.target.checked,
                        });
                        console.log(
                          e.target.name,
                          e.target.value,
                          e.target.checked
                        );
                      }}
                      value={formData.suited}
                      checked={formData.suited}
                      name="suited"
                    />
                  }
                  label="Suited"
                  className="navigator-switch"
                />
              </FormControl>

              <FormControl sx={{ m: 1.5, width: 125 }}>
                <Button
                  variant="contained"
                  className="navigator-btn"
                  onClick={evaluate}
                >
                  Continue
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={12} alignItems="center" justify="center">
              <Box textAlign="center">
                <FormControl className="navigator-link">
                  <Link href="/blog/the-legal-poker-bot">Learn More</Link>
                </FormControl>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
export default Step1;
