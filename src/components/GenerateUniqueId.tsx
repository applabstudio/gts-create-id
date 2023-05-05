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
  Dialog,
  DialogActions,
  DialogContent, 
  DialogContentText,
  DialogTitle
} from "@mui/material";
import {
  Add,
  Delete,
  SearchOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import Papa from "papaparse";
import CodificaTable from "./CodificaTable";
import CommessaIcon from "../assets/images/commessa.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const tableData = [
  {
    versione:
      "[A1]: Sigla in ordine alfabetico con numero progressivo per versione del progetto indicato a cliente (es: versione A1, A2, ...)",
    codiceCliente:
      "[001]: Numero progressivo per codice cliente esempio (es: 001,002,003 ecc)",
    tipoHardware:
      "[HA]: Sigla per tipo hardware utilizzato vedi schema legenda tecnica in ordine alfabetico es: HA(es: HA, HB)",
    categoriaSoftware:
      "[CSA]: Sigla in ordine alfabetico per categoria del software impiegato (es: CSA, CSB, CSC, CSD ecc)",
    numeroProgressivo:
      "[000]: Numero progressivo del progetto indipendente dalla tipologia di utilizzo",
    tipologiaUtilizzo:
      "[DH]: Sigla per tipologia di utilizzo (es: DH= domotica)",
    tipoSoftware:
      "[V]: Sigla per identificazione del tipo di software vedi legenda",
  },
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
    if (options.serialNumber) uniqueId += `SN${serialNumber}`;
    return uniqueId;
  }

  function addArticle() {
    if (
      (options.hardwareUsedA ||
        options.hardwareUsedB ||
        options.hardwareUsedC ||
        options.hardwareUsedD ||
        options.hardwareUsedE ||
        options.hardwareUsedF ||
        options.hardwareUsedG ||
        options.hardwareUsedH ||
        options.hardwareUsedI ||
        options.hardwareUsedL ||
        options.hardwareUsedM ||
        options.hardwareUsedN ||
        options.hardwareUsedO ||
        options.hardwareUsedP) &&
      (options.categorySoftwareA ||
        options.categorySoftwareB ||
        options.categorySoftwareC)
    ) {
      // Codice per creare l'articolo
      // tutte le checkbox sono selezionate
      // puoi creare l'articolo qui
      const newArticle: Article = {
        name: "codice commessa",
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
      toast.success("Commessa creata con successo!");
    } else {
      // non tutte le checkbox sono selezionate
      // mostra un messaggio di errore o fai qualcosa per impedire la creazione dell'articoloa
      toast.error("Non tutti i campi sono compilati!");
    }
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


  const [open, setOpen] = useState(false);
  const handleRemoveAll = () => {
    setOpen(true);
  };

  const handleConfirmRemoveAll = () => {
    // Aggiungi qui la logica per eliminare la cronologia
        localStorage.removeItem("idHistory");
    setIdHistory([]);
    setOpen(false);
  };

  const handleCancelRemoveAll = () => {
    setOpen(false);
  };

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
      <Container sx={{ py: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Grid>
            <Grid>
              <CodificaTable data={tableData} />

              <div>
                <h3>
                  <i>Step 1.</i> Versione del progetto indicato a cliente
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.versionProject}
                      onChange={() => handleOptionChange("versionProject")}
                      required
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
                    required
                  />
                )}
              </div>
              <div>
                <h3>
                  <i>Step 2.</i>Codice Cliente
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.codeCustomer}
                      onChange={() => handleOptionChange("codeCustomer")}
                      required
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
                    required
                  />
                )}
              </div>
              <div>
                <h3>
                  <i>Step 3.</i>Seleziona il Tipo di hardware utilizzato
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedA}
                      onChange={() => handleOptionChange("hardwareUsedA")}
                      required
                    />
                  }
                  label="Bilancia intelligente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedB}
                      onChange={() => handleOptionChange("hardwareUsedB")}
                      required
                    />
                  }
                  label="Processore Verticale"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedC}
                      onChange={() => handleOptionChange("hardwareUsedC")}
                      required
                    />
                  }
                  label="PressLog"
                />
              </div>

              <div>
                <h3>
                  <i>Step 4.</i>Seleziona la categoria del software impiegato
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareA}
                      onChange={() => handleOptionChange("categorySoftwareA")}
                      required
                    />
                  }
                  label="Sviluppo Web Based"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareB}
                      onChange={() => handleOptionChange("categorySoftwareB")}
                      required
                    />
                  }
                  label="Firmware ESP32"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.categorySoftwareC}
                      onChange={() => handleOptionChange("categorySoftwareC")}
                      required
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
           <ToastContainer />
          <Button variant="contained" startIcon={<Add />} onClick={addArticle}>
            Crea codice commessa
          </Button>
        </Box>

        <Divider sx={{ my: 2, borderColor: "primary.main" }} />

        <Box
          sx={{
            my: 6,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            align="left"
            sx={{
              fontSize: { xs: "1.2rem", md: "2rem" },
              mb: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Commesse generate oggi
          </Typography>

          {articles.length > 0 && (
            <>
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    bgcolor: "green",
                    "&:hover": { bgcolor: "darkgreen" },
                    fontSize: { xs: "small" },
                    width: { xs: "100%", md: "300px" },
                  }}
                  startIcon={<ArticleIcon />}
                  onClick={() => exportAllToCsv(articles)}
                >
                  <Typography sx={{ fontSize: { xs: "small" } }}>
                    Esporta tutti in CSV
                  </Typography>
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {filteredArticles.map((article) => (
              <ListItem
                key={article.uniqueId}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
                secondaryAction={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      flexWrap: "wrap",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: { xs: "space-between", md: "flex-end" },
                      marginTop: { xs: "8px", md: 0 },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => exportToTxt([article])}
                      startIcon={<ArticleIcon />}
                      sx={{
                        marginRight: { xs: "8px", md: "16px" },
                        marginBottom: { xs: "8px", md: 0 },
                      }}
                    >
                      Esporta in TXT
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => exportToCsv([article])}
                      startIcon={<ArticleIcon />}
                      sx={{
                        marginRight: { xs: "8px", md: "16px" },
                        marginBottom: { xs: "8px", md: 0 },
                      }}
                    >
                      Esporta in CSV
                    </Button>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeArticle(article)}
                      sx={{ display: { xs: "none", sm: "inline-flex" } }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    "@media (min-width:600px)": {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  }}
                >
                  <img src={CommessaIcon} alt="commessa" width={42} />
                  <ListItemText
  primary={article.name}
  secondary={article.uniqueId}
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "200px",
    "& .MuiListItemText-secondary": {
      alignSelf: "flex-start",
    },
    "@media (min-width: 600px)": {
      flexDirection: "row",
      alignItems: "left",
      "& .MuiListItemText-secondary": {
        alignSelf: "left",
        marginLeft: "auto",
      },
    },
  }}
/>



                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2, borderColor: "primary.main" }} />

        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeOutlined sx={{ mr: 1 }} />
            <Typography variant="h5" component="h3">
              Cronologia commesse generate
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
                    <img src={CommessaIcon} alt="commessa" width={42} />
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
      <Dialog open={open} onClose={handleCancelRemoveAll}>
        <DialogTitle>Sei sicuro di voler eliminare la cronologia?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Questa azione è irreversibile. Sei sicuro di voler eliminare la
            cronologia?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveAll}>Annulla</Button>
          <Button onClick={handleConfirmRemoveAll} autoFocus>
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
      </Container>
    </>
  );
}

export default GenerateUniqueId;
