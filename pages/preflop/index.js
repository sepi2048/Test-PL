import React from "react";
import Layout from "@/components/Layout";

import { useRouter } from "next/router";
import updateAction from "./updateAction";
import { useStateMachine } from "little-state-machine";

import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

import { useForm, Controller } from "react-hook-form";
//import { object, string } from "yup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#45ca63",
    },
  },
});

const Step1 = (props) => {
  const { actions, state } = useStateMachine({ updateAction });
  const router = useRouter();

  /*   const schema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  }); */

  const { register, handleSubmit, control } = useForm();

  //const { control } = useFormContext();

  const onSubmit = (data) => {
    actions.updateAction(data);
    router.push("/preflop/step2");
    console.log(data);
  };

  const onChange = (data) => {};

  return (
    <Layout metaTitle={"Preflop Helper"}>
      <section className="section-sm pb-0">
        <div className="container pb-5">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <ThemeProvider theme={theme}>
                  <Box sx={{ minWidth: 150 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <section>
                        <label>Select your Hand</label>
                        <br />
                        <FormControl sx={{ m: 1, width: 130 }}>
                          <InputLabel id="demo-multiple-chip-label">
                            First Card
                          </InputLabel>
                          <Controller
                            defaultValue={""}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <Select
                                displayEmpty
                                value={value}
                                onChange={onChange}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="First Card"
                                  />
                                }
                              >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value="A">Thirty</MenuItem>
                              </Select>
                            )}
                            name="card1"
                            label="Age"
                            control={control}
                            rules={{ required: "Select your first card" }}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 130 }}>
                          <InputLabel id="demo-multiple-chip-label">
                            Second Card
                          </InputLabel>
                          <Controller
                            defaultValue={""}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <Select
                                error={!!error}
                                helperText={error ? error.message : "yo"}
                                displayEmpty
                                value={value}
                                onChange={onChange}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Second Card"
                                  />
                                }
                              >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value="A">Thirty</MenuItem>
                              </Select>
                            )}
                            name="card2"
                            label="Age"
                            control={control}
                            rules={{ required: "Select your second card" }}
                          />
                          <FormHelperText></FormHelperText>
                        </FormControl>
                      </section>

                      <FormControl sx={{ m: 1, width: 130 }}>
                        <section>
                          <label>Hand Suited?</label>
                          <br />

                          <Controller
                            name="suited"
                            control={control}
                            defaultValue={false}
                            render={({ field: { onChange, value } }) => (
                              <Switch
                                label="Suited?"
                                onChange={onChange}
                                value={value}
                                checked={value}
                              />
                            )}
                          />
                        </section>
                      </FormControl>

                      {/*                       <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            label="First Name"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : "yo"}
                            fullWidth
                          />
                        )}
                        rules={{ required: "First name required" }}
                      /> */}
                      <FormControl sx={{ m: 1, width: 130 }}>
                        <section>
                          <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={false}
                          >
                            Submit
                          </Button>
                        </section>
                      </FormControl>
                    </form>
                  </Box>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Step1;
