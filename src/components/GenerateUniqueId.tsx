import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Delete,
  Inventory2Outlined,
  SearchOutlined,
} from "@mui/icons-material";
import Header from "./Header";
import BannerBackground from "./BannerBackground";

interface Article {
  name: string;
  uniqueId: string;
}

interface Options {
  hardwareUsedA: boolean;
  hardwareUsedB: boolean;
  hardwareUsedC: boolean;
  hardwareUsedD: boolean;
  hardwareUsedE: boolean;
  hardwareUsedF: boolean;
  hardwareUsedG: boolean;
  hardwareUsedH: boolean;
  hardwareUsedI: boolean;
  hardwareUsedL: boolean;
  hardwareUsedM: boolean;
  hardwareUsedN: boolean;
  hardwareUsedO: boolean;
  hardwareUsedP: boolean;
  categorySoftwareA: boolean;
  categorySoftwareB: boolean;
  categorySoftwareC: boolean;
  brand: boolean;
  model: boolean;
  serialNumber: boolean;
  versionProject: boolean;
  codeCustomer: boolean;
}

function GenerateUniqueId(): JSX.Element {
  const [options, setOptions] = useState<Options>({
    hardwareUsedA: false,
    hardwareUsedB: false,
    hardwareUsedC: false,
    hardwareUsedD: false,
    hardwareUsedE: false,
    hardwareUsedF: false,
    hardwareUsedG: false,
    hardwareUsedH: false,
    hardwareUsedI: false,
    hardwareUsedL: false,
    hardwareUsedM: false,
    hardwareUsedN: false,
    hardwareUsedO: false,
    hardwareUsedP: false,
    categorySoftwareA: false,
    categorySoftwareB: false,
    categorySoftwareC: false,
    brand: false,
    model: false,
    serialNumber: false,
    versionProject: false,
    codeCustomer: false,
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [idHistory, setIdHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<number>(1);
  const [versionProject, setVersionProject] = useState<number>(1);
  const [codeCustomer, setCodeCustomer] = useState<number>(1);

  function handleOptionChange(option: keyof Options) {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  }

  function generateUniqueId() {
    let uniqueId = "";
    if (options.versionProject) uniqueId += `A0${versionProject}`;
    if (options.codeCustomer) uniqueId += `${codeCustomer}`;
    if (options.hardwareUsedA) uniqueId += "HA";
    if (options.hardwareUsedB) uniqueId += "HB";
    if (options.hardwareUsedC) uniqueId += "HC";
    if (options.hardwareUsedD) uniqueId += "HD";
    if (options.hardwareUsedE) uniqueId += "HE";
    if (options.hardwareUsedF) uniqueId += "HF";
    if (options.hardwareUsedG) uniqueId += "HG";
    if (options.hardwareUsedH) uniqueId += "HH";
    if (options.hardwareUsedI) uniqueId += "HI";
    if (options.hardwareUsedL) uniqueId += "HL";
    if (options.hardwareUsedM) uniqueId += "HM";
    if (options.hardwareUsedN) uniqueId += "HN";
    if (options.hardwareUsedO) uniqueId += "HO";
    if (options.hardwareUsedP) uniqueId += "HP";
    if (options.categorySoftwareA) uniqueId += "CSA";
    if (options.categorySoftwareB) uniqueId += "CSB";
    if (options.categorySoftwareC) uniqueId += "CSC";

    if (options.brand) uniqueId += "BR";
    if (options.model) uniqueId += "MD";
    if (options.serialNumber) uniqueId += `SN${serialNumber}`;
    return uniqueId;
  }

  function addArticle() {
    const newArticle: Article = {
      name: "",
      uniqueId: generateUniqueId(),
    };
    setArticles([...articles, newArticle]);
    setIdHistory([...idHistory, newArticle.uniqueId]);
    setSerialNumber(serialNumber + 1);
    setVersionProject(versionProject + 1);
    setCodeCustomer(codeCustomer + 1);
    const newIdHistory = [...idHistory, newArticle.uniqueId];
    setIdHistory(newIdHistory);
    // Salva gli ID storici nel localStorage
    localStorage.setItem("idHistory", JSON.stringify(newIdHistory));
  }

  function loadIdHistory() {
    const idHistoryString = localStorage.getItem("idHistory");
    if (idHistoryString) {
      const parsedIdHistory = JSON.parse(idHistoryString);
      setIdHistory(parsedIdHistory);
    }
  }
  // Carica gli ID storici quando l'app viene montata
  useEffect(() => {
    loadIdHistory();
  }, []);

  function removeArticle(article: Article) {
    const newArticles = articles.filter((a) => a !== article);
    setArticles(newArticles);
  }

  function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSerialNumberChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSerialNumber(Number(event.target.value));
  }

  function handleVersionProjectChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setVersionProject(Number(event.target.value));
  }

  function handleCodeCustomerChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCodeCustomer(Number(event.target.value));
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <Box
        sx={{ pt: 2, pb: 2 }}
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
        }}
      >
        <img src={Logo} alt="logo" width={160} style={{ margin: "0 auto" }} />
        <Typography
          variant="h4"
          sx={{ mb: 1 }}
          style={{ color: "white" }}
          align="center"
        >
          GTS - Generatore ID Articoli
        </Typography>
      </Box> */}
      <Header title="" />
      <BannerBackground />
      <Container sx={{ py: 2 }}>
        <Box sx={{ mt: 5 }}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Grid>
              <div>
                <h3>Versione del progetto indicato a cliente</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.versionProject}
                      onChange={() => handleOptionChange("versionProject")}
                    />
                  }
                  label="Inserisci Versione Progetto"
                />
                {options.versionProject && (
                  <TextField
                    label="Inizio versione progetto"
                    type="number"
                    value={versionProject}
                    onChange={handleVersionProjectChange}
                    fullWidth
                  />
                )}
              </div>
              <div>
                <h3>Codice Cliente</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.codeCustomer}
                      onChange={() => handleOptionChange("codeCustomer")}
                    />
                  }
                  label="Inserisci Codice Cliente"
                />
                {options.codeCustomer && (
                  <TextField
                    label="Inizio codice cliente"
                    type="number"
                    value={codeCustomer}
                    onChange={handleCodeCustomerChange}
                    fullWidth
                  />
                )}
              </div>
              <div>
                <h3>Seleziona il Tipo di hardware utilizzato</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedA}
                      onChange={() => handleOptionChange("hardwareUsedA")}
                    />
                  }
                  label="Bilancia intelligente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedB}
                      onChange={() => handleOptionChange("hardwareUsedB")}
                    />
                  }
                  label="Processore Verticale"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedC}
                      onChange={() => handleOptionChange("hardwareUsedC")}
                    />
                  }
                  label="PressLog"
                />
              </div>

              <div>
                <h3>Seleziona la categoria del software impiegato</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareA}
                      onChange={() => handleOptionChange("categorySoftwareA")}
                    />
                  }
                  label="Sviluppo Web Based"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareB}
                      onChange={() => handleOptionChange("categorySoftwareB")}
                    />
                  }
                  label="Firmware ESP32"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareC}
                      onChange={() => handleOptionChange("categorySoftwareC")}
                    />
                  }
                  label="Firmware STM32"
                />
              </div>

              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={options.model}
                    onChange={() => handleOptionChange("model")}
                  />
                }
                label="Modello"
              /> */}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={options.serialNumber}
                    onChange={() => handleOptionChange("serialNumber")}
                  />
                }
                label="Numero Progressivo"
              />
              {options.serialNumber && (
                <TextField
                  label="Inizio numero progressivo"
                  type="number"
                  value={serialNumber}
                  onChange={handleSerialNumberChange}
                  fullWidth
                />
              )} */}
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{ mt: 4 }}
          style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" startIcon={<Add />} onClick={addArticle}>
            Aggiungi ID Commessa
          </Button>
        </Box>
        <Typography variant="h6" align="left" sx={{ mt: 10 }} id="search">
          Cerca le commesse generate oggi
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Cerca"
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined></SearchOutlined>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <List>
            {filteredArticles.map((article) => (
              <ListItem
                key={article.uniqueId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeArticle(article)}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <Inventory2Outlined></Inventory2Outlined>
                <ListItemText
                  primary={article.name}
                  secondary={article.uniqueId}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
            Cronologia ID Commesse generate
          </Typography>

          <List sx={{ bgcolor: "background.paper" }}>
            {idHistory.map((id) => (
              <ListItem key={id}>
                <Inventory2Outlined></Inventory2Outlined>
                <ListItemText primary={id} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}

export default GenerateUniqueId;
