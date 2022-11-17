import React from "react";
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
    fontSize: "32px",
    margin: "auto",
    textAlign: "center",
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

const Submit = (props) => {
  const { formData, setCurrentStep, setFormData } = props;
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
  };

  const classes = useStyles();

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
                  sx={{ m: 1.5, width: 200 }}
                  className={classes.root}
                >
                  {formData.action}
                </FormControl>
              </Box>
            </Grid>
            {/*             <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
              <Button variant="contained" onClick={newHand}>
                Did opponet raise?
              </Button>
            </FormControl> */}

            <FormControl sx={{ my: 1, ml: 1.25, width: 265 }}>
              <Button variant="contained" onClick={newHand}>
                New Hand
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
export default Submit;
