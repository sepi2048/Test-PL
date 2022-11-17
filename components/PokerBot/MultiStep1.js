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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    backgroundImage: "linear-gradient(45deg, #2d2d2d, #45ca63);",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: "16px",
    fontWeight: "bolder",
  },
});

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

const neverPlay = [
  "K6o",
  "K5o",
  "K4o",
  "K3o",
  "K2o",
  "T6o",
  "96o",
  "86o",
  "T5o",
  "95o",
  "85o",
  "T4o",
  "94o",
  "84o",
  "T3o",
  "93o",
  "83o",
  "T2o",
  "92o",
  "82o",
  "75o",
  "65o",
  "74o",
  "64o",
  "73o",
  "63o",
  "72o",
  "62o",
  "54o",
  "53o",
  "52o",
  "43o",
  "42o",
  "32o",
  "Q7o",
  "J7o",
  "Q6o",
  "J6o",
  "Q5o",
  "J5o",
  "Q4o",
  "J4o",
  "Q3o",
  "J3o",
  "Q2o",
  "J2o",
  "Q2s",
  "J2s",
  "T2s",
  "92s",
  "82s",
  "72s",
  "62s",
  "52s",
  "42s",
  "32s",
  "Q3s",
  "J3s",
  "T3s",
  "93s",
  "83s",
  "73s",
  "63s",
  "53s",
  "J4s",
  "T4s",
  "94s",
  "84s",
  "74s",
  "J5s",
  "T5s",
  "95s",
  "85s",
  "J6s",
  "T6s",
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

  //const classes = useStyles();

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
              <FormControl
                sx={{ m: 1.5, width: 250 }} /* className={classes.root} */
              >
                🤖 PreFlop Poker Bot (NL2) 🤖
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ m: 0.5, width: 135 }}>
                <InputLabel id="demo-simple-select-label">
                  First Card
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  value={formData.card1}
                  label="First Card"
                  onChange={(e) =>
                    setFormData({ ...formData, card1: e.target.value })
                  }
                >
                  <MenuItem value={14}>A</MenuItem>
                  <MenuItem value={13}>K</MenuItem>
                  <MenuItem value={12}>Q</MenuItem>
                  <MenuItem value={11}>J</MenuItem>
                  <MenuItem value={10}>T</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 0.5, width: 135 }}>
                <InputLabel id="demo-simple-select-label">
                  Second Card
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  value={formData.card2}
                  label="Second Card"
                  onChange={(e) =>
                    setFormData({ ...formData, card2: e.target.value })
                  }
                >
                  <MenuItem value={14}>A</MenuItem>
                  <MenuItem value={13}>K</MenuItem>
                  <MenuItem value={12}>Q</MenuItem>
                  <MenuItem value={11}>J</MenuItem>
                  <MenuItem value={10}>T</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
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
                />
              </FormControl>

              <FormControl sx={{ m: 1.5, width: 125 }}>
                <Button variant="contained" onClick={evaluate}>
                  Continue
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={12} alignItems="center" justify="center">
              <Box textAlign="center">
                <FormControl className="flop-calc-link">
                  <Link href="/blog/the-legal-poker-bot">
                    How does this bot work?
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
export default Step1;
