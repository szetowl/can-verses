import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material/";

import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

import { songsDB, storage } from "../firebase";

import InputForm from "./InputForm";
import ConfirmForm from "./ConfirmForm";

const steps = ["資料輸入", "確認資料", "上載資料"];

function getStepContent(step, song, handleChange, selectedFile, handleSelect) {
  switch (step) {
    case 0:
      return (
        <InputForm
          song={song}
          handleChange={handleChange}
          selectedFile={selectedFile}
          handleSelect={handleSelect}
        />
      );
    case 1:
      return <ConfirmForm song={song} selectedFile={selectedFile} />;

    default:
      throw new Error("Unknown step");
  }
}

const Mytheme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function Input() {
  const [activeStep, setActiveStep] = useState(0);
  const [song, setSong] = useState({
    name: "",
    no: "",
    reference: "",
  });
  const [finished, setFinished] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");

  const handleChange = (input) => (e) => {
    setSong({ ...song, [input]: e.target.value });
  };
  const handleSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleEnd = () => {};
  const handleNewInput = () => {
    setActiveStep(0);
    setSong({
      name: "",
      no: "",
      reference: "",
    });
    setSelectedFile("");
  };
  const handleConfirm = () => {
    addNewItem();
    setActiveStep(2);
  };

  // FireBase Function
  const addNewItem = () => {
    //e.preventDefualt();
    let docRef = songsDB.collection("福音粵曲").doc();
    docRef
      .set({
        name: song.name,
        no: song.no,
        src: "福音粵曲"+song.no+"/" + selectedFile.name,
        id: docRef.id,
      })
      .then(() => {
        uploadCanSongFile({ selectedFile });
        //setSong({ name: "", no: "", reference:"" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const uploadCanSongFile = () => {
    let storageRef = storage.ref("福音粵曲"+song.no+"/" + selectedFile.name);
    storageRef.put(selectedFile).then(() => {
      console.log("Upload audio file " + selectedFile.name + " OK!");
      setFinished(true);
    });
  };

  return (
    <ThemeProvider theme={Mytheme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={4}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            福音粵曲
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 5 }}>
        <Paper elevation={4} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h6" align="center">
            福音粵曲資料上載
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 5, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === 2 ? (
              //LAST PAGE
              <React.Fragment>
                <Box sx={{p :4,height:150}}>
                  {finished ? (
                    <Typography variant="h6" gutterBottom>
                      資料上載完成
                    </Typography>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && finished && (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleEnd}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        結束上載
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleNewInput}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        下一首
                      </Button>
                    </>
                  )}
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  song,
                  handleChange,
                  selectedFile,
                  handleSelect
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* PAGE 1 INPUT_PAGE_BUTTON */}
                  {activeStep === 0 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      繼續
                    </Button>
                  )}
                  {/* PAGE 2 COMFIRM_PAGE_BUTTON */}
                  {activeStep === 1 && (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        返回
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleConfirm}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        確認
                      </Button>
                    </>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          JL-MetaVerse
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}
