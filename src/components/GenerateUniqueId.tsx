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
  ListItemIcon,
  ListItemText,
  IconButton,
  InputAdornment,
  Divider,
  Paper
} from "@mui/material";
import {
  Add,
  Delete,
  SearchOutlined,
  AccessTimeOutlined
} from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import Papa from "papaparse";
import Header from "./Header";
import BannerBackground from "./BannerBackground";
import CodificaTable from "./CodificaTable";
import CommessaIcon from '../assets/images/commessa.png';

const tableData = [
  {
    versione: '[A1]: Sigla in ordine alfabetico con numero progressivo per versione del progetto indicato a cliente (es: versione A1, A2, ...)',
    codiceCliente: '[001]: Numero progressivo per codice cliente esempio (es: 001,002,003 ecc)',
    tipoHardware: '[HA]: Sigla per tipo hardware utilizzato vedi schema legenda tecnica in ordine alfabetico es: HA(es: HA, HB)',
    categoriaSoftware: '[CSA]: Sigla in ordine alfabetico per categoria del software impiegato (es: CSA, CSB, CSC, CSD ecc)',
    numeroProgressivo: '[000]: Numero progressivo del progetto indipendente dalla tipologia di utilizzo',
    tipologiaUtilizzo: '[DH]: Sigla per tipologia di utilizzo (es: DH= domotica)',
    tipoSoftware: '[V]: Sigla per identificazione del tipo di software vedi legenda',
  }
];


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

  const removeIdFromHistory = (idToRemove: string) => {
    setIdHistory((prevHistory) =>
      prevHistory.filter((id) => id !== idToRemove)
    );
    localStorage.setItem("idHistory", JSON.stringify(idHistory));
  };


  const handleRemoveAll = () => {
    localStorage.removeItem("idHistory");
    setIdHistory([]);
  };
  

  // function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setSearchTerm(event.target.value);
  // }



  // function handleSerialNumberChange(
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   setSerialNumber(Number(event.target.value));
  // }

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

  function exportToTxt(filteredArticles: Article[]): void {
    const content = filteredArticles
      .map((article) => `${article.name}, ${article.uniqueId}`)
      .join("\r\n")
      .replace(/^, /, "");
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "filtered_articles.txt";
    document.body.appendChild(element);
    element.click();
  }

  function exportToCsv(filteredArticles: Article[]): void {
    const rows: any[] = [["ID Commessa"]];
    filteredArticles.forEach((article) => {
      rows.push([article.uniqueId]);
    });
    const csvContent = Papa.unparse(rows);
    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    element.href = URL.createObjectURL(file);
    element.download = "filtered_articles.csv";
    document.body.appendChild(element);
    element.click();
  }
  
  function exportAllToCsv(articles: Article[]): void {
    const rows: any[] = [["ID Commessa"]];
    articles.forEach((article) => {
      rows.push([article.uniqueId]);
    });
    const csvContent = Papa.unparse(rows);
    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    element.href = URL.createObjectURL(file);
    element.download = "filtered_articles.csv";
    document.body.appendChild(element);
    element.click();
  }
  
  

  return (
    <>
      <Header title="" />
      <BannerBackground />
      <Container sx={{ py: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Grid>
            <Grid>

              <CodificaTable data={tableData}/>

              <div>
                <h3><i>Step 1.</i> Versione del progetto indicato a cliente</h3>
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
                <h3><i>Step 2.</i>Codice Cliente</h3>
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
                <h3><i>Step 3.</i>Seleziona il Tipo di hardware utilizzato</h3>
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
                <h3><i>Step 4.</i>Seleziona la categoria del software impiegato</h3>
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
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" startIcon={<Add />} onClick={addArticle}>
            Aggiungi ID Commessa
          </Button>
        </Box>
        
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>

      
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
  <Typography variant="h6" align="left">
    Commesse generate oggi
  </Typography>

  {articles.length > 0 && (
      <Button
        variant="contained"
        color="secondary"
        sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
        startIcon={<ArticleIcon />}
        onClick={() => exportAllToCsv(articles)}
      >
        Esporta tutti in CSV
      </Button>
    )}
</Box>
</Paper>
        {/* <Box sx={{ mt: 4 }}>
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
        </Box> */}

        <Box sx={{ mt: 4 }}>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          
            {filteredArticles.map((article) => (
              <ListItem
                key={article.uniqueId}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'start',
                }}
                secondaryAction={
                  <div style={{ display: 'flex' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => exportToTxt([article])}
              startIcon={<ArticleIcon />}
              sx={{ marginRight: '8px' }}
            >
              Esporta in TXT
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => exportToCsv([article])}
              startIcon={<ArticleIcon />}
              sx={{ marginRight: '8px' }}
            >
              Esporta in CSV
            </Button>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeArticle(article)}
            >
              <Delete />
            </IconButton>
            
          </div>
          
                }
              >
           
           <Box sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  '@media (min-width:600px)': {
    flexDirection: 'row',
    alignItems: 'center',
  }
}}>
  <img src={CommessaIcon} alt="commessa" width={42}/>
  <ListItemText
    primary={article.name}
    secondary={article.uniqueId}
    sx={{ display: 'flex', flexDirection: 'column' }}
  />
</Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'primary.main' }} />

    <Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <AccessTimeOutlined sx={{ mr: 1 }} />
  <Typography variant="h5" component="h3">
    Cronologia ID Commesse generate
  </Typography>
</Box>

<TextField
sx={{ my: 2 }}
            label="Cerca"
            type="text"
            value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined></SearchOutlined>
                </InputAdornment>
              ),
            }}
            id="search"
            />

<List sx={{ bgcolor: "background.paper" }}>
          {idHistory
            .filter((id) => id.includes(searchTerm))
            .map((id) => (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeIdFromHistory(id)}
              
              
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                <img src={CommessaIcon} alt="commessa" width={42}/>
                </ListItemIcon>
                <ListItemText primary={id} />
              </ListItem>
            ))}
        </List>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveAll}
        >
          Elimina cronologia
        </Button>
      </Box>
      </Container>
    </>
  );
}

export default GenerateUniqueId;
