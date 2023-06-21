import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Link from "@mui/material/Link";

import Grid from "@mui/material/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    backgroundImage: "linear-gradient(45deg, #2d2d2d, #45ca63);",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: "26px",
    margin: "auto",
    textAlign: "center",
    fontWeight: "bolder",
  },
});

const theme = createTheme({
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

const Submit = (props) => {
  const { formData, setCurrentStep, setFormData, setSteal, getPreFlopAction } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [raisedII, setRaisedII] = useState(false);
  const [raisedI, setRaisedI] = useState(false);
  const [allin, setAllIn] = useState(false);
  const [fold, setFold] = useState(false);
  const [action, setAction] = useState(formData.action);

  useEffect(() => {
    if (formData.action === "All-in") {
      setAllIn(true);
      setRaisedI(true);
    } else if (formData.action === "Fold") {
      setFold(true);
      setRaisedI(true);
    }
  }, []);

  useEffect(() => {
    // setAction(formData.action);
  });

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

  const gotRaised = () => {
    setIsLoading(true);

    // SubState, Action, preFlopBetRound = 2
    const actionToTake = getPreFlopAction(2, "IVbet", formData.potState);
    setAction(actionToTake);

    setFormData({
      ...formData,
      action: actionToTake,
      potSubState: "IVbet",
      preFlopBetRound: 2,
    });

    setTimeout(() => {
      setIsLoading(false);
      setRaisedI(true);

      if (actionToTake === "All-in") {
        setAllIn(true);
      } else if (actionToTake === "Fold") {
        setFold(true);
        setNewBtn(true);
      } else {
        setRaisedII(true);
      }

      console.log(raisedI, raisedII, allin, fold, action);
    }, 1200);
  };

  const toPostFlop = () => {
    console.log("Hello Post-Flop");
  };

  const raisedAgain = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setRaisedII(false);
      setAllIn(false);
      setFold(true);
      setAction("Fold");
      console.log(raisedI, raisedII, allin, fold, action);
    }, 1200);

    console.log("Hello Raised Again");
  };

  const classes = useStyles();

  console.log(formData);

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
                <FormControl
                  sx={{ mx: 1.5, width: 200, height: 75 }}
                  className={classes.root}
                >
                  {isLoading ? (
                    <div class="jumping-dots-loader">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <p className="navigator-action">
                      {" "}
                      {action} <br />
                      <small>Be aware of player type</small>
                    </p>
                  )}
                </FormControl>
              </Box>
            </Grid>
            {!raisedI && (
              <>
                <Box
                  component="span"
                  m={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={gotRaised}
                      className="navigator-btn"
                    >
                      Re-Raised?
                    </Button>
                  </FormControl>

                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={toPostFlop}
                      className="navigator-btn"
                    >
                      Post-Flop
                    </Button>
                  </FormControl>
                </Box>
              </>
            )}
            {raisedII && (                
              <>
                <Box
                  component="span"
                  m={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={raisedAgain}
                      className="navigator-btn"
                    >
                      New Raise?
                    </Button>
                  </FormControl>

                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={toPostFlop}
                      className="navigator-btn"
                    >
                      Post-Flop
                    </Button>
                  </FormControl>
                </Box>
              </>
            )}
            {allin && (
              <>
                <Box m={1}>
                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={toPostFlop}
                      className="navigator-btn"
                    >
                      Post-Flop
                    </Button>
                  </FormControl>
                </Box>
              </>
            )}
            {fold && (
              <>
                <Box m={1}>
                  <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
                    <Button
                      variant="contained"
                      onClick={newHand}
                      className="navigator-btn"
                    >
                      New Hand
                    </Button>
                  </FormControl>
                </Box>
              </>
            )}
            {/*  
            0)          
            1) If !All-in or Fold  = Raised Again
            ( If you get 5bet, All-in or Fold based on ? then Only New Hand btn )
            2) If All-in or Fold = New Hand BTN
            */}

            {!fold && (
              <>
                <Grid item xs={12} alignItems="center" justify="center">
                  <Box textAlign="center">
                    <FormControl className="navigator-link">
                      <Link component="button" onClick={newHand}>
                        New Hand
                      </Link>
                    </FormControl>
                  </Box>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
export default Submit;
