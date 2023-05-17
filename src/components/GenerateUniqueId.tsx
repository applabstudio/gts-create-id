import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  Collapse,
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
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import {
  Add,
  Delete,
  SearchOutlined,
  AccessTimeOutlined,
  CloseOutlined,
  QrCodeOutlined,
  Announcement
} from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import PrintIcon from "@mui/icons-material/Print";
import TodayIcon from "@mui/icons-material/Today";
import Papa from "papaparse";
import CommessaIcon from "../assets/images/commessa.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QrCodeIcon from "../assets/images/qrcode_icon.png";
import BarCodeIcon from "../assets/images/barcodeicon.png";
import QRCode from "qrcode.react";
import TableToggleButton from "./Table/TableToggleButton";
import { tableData } from "../data";
import { useReactToPrint } from "react-to-print";
import JsBarcode from "jsbarcode";

interface Article {
  name: string;
  uniqueId: string;
  date: string;
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

  function handleOptionChange1(option: keyof Options) {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  }

  interface Options2 {
    categorySoftwareA: boolean;
    categorySoftwareB: boolean;
    categorySoftwareC: boolean;
  }
  interface OptionItem {
    value: keyof Options2;
    label: string;
  }

  const options2: OptionItem[] = [
    { value: "categorySoftwareA", label: "Sviluppo Web Based" },
    { value: "categorySoftwareB", label: "Firmware ESP32" },
    { value: "categorySoftwareC", label: "Firmware STM32" },
  ];

  const [selected2, setSelected2] =
    useState<keyof Options2>("categorySoftwareA");

  function handleSelectChange2(
    event: SelectChangeEvent<
      "categorySoftwareA" | "categorySoftwareB" | "categorySoftwareC"
    >
  ) {
    const { value } = event.target;
    setSelected2(value as keyof Options2);
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
      selected2
    ) {
      // Codice per creare l'articolo
      // tutte le checkbox sono selezionate
      // puoi creare l'articolo qui
      const now = new Date();
      const newArticle: Article = {
        name: "codice commessa: ",
        uniqueId: generateUniqueId(),
        date: now.toLocaleDateString(), // o now.toISOString()
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
         // Verifica se è un dispositivo mobile
                            const isMobile = window.innerWidth <= 768;
                          
                            if (!isMobile) {
                              toastQrCode(newArticle.uniqueId);
                            }
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

  // Stato per dialog
  const [open, setOpen] = useState(false);

  const [openQrCode, setOpenQrCode] = useState(false);
  const [openQrCodeHistory, setOpenQrCodeHistory] = useState(false);

  const handleGenerateQrCode = (articleId: string) => {
    setOpenQrCode(true);
  };

  const [isPrinting, setIsPrinting] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [showButtonPrint, setShowButtonPrint] = useState(true);

  // useEffect(() => {
  //   if (isPrinting) {
  //     setShowButtonPrint(false);
  //     const node = componentRef.current;
  //     if (node) {
  //       html2canvas(node).then((canvas) => {
  //         setQrCodeImage(canvas.toDataURL());
  //       });
  //     }
  //   }
  // }, [isPrinting]);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setIsPrinting(false);
      setShowButtonPrint(true);
    },
  });
  
  const [selectedArticleId, setSelectedArticleId] = useState<Article | null>(null);
  const [selectedArticleId2, setSelectedArticleId2] = useState<string>("");


  // const handleClickArticle = (article: Article) => {

  //   setSelectedArticleId(article);
  // };

  const handleGenerateQrCodeHistory = (idHistory: string) => {
    setOpenQrCodeHistory(true);
  };

  const handleCloseQrCode = () => {
    setOpenQrCode(false);
  };

  const handleCloseQrCodeHistory = () => {
    setOpenQrCodeHistory(false);
  };

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

  const handleGenerateBarcode = (uniqueId: string) => {
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, uniqueId, {
      format: "CODE128",
      displayValue: true,
      fontSize: 12,
      width: 2,
      height: 50,
      margin: 10,
    });
    const barcodeImageUrl = barcodeCanvas.toDataURL();
    return barcodeImageUrl;
  };

  const handleShowBarcode = (uniqueId: string) => {
    const barcodeImageUrl = handleGenerateBarcode(uniqueId);
    toast.info(
      <div>
        <p>Codice a barre</p>
        <img src={barcodeImageUrl} alt="Barcode" />
      </div>
    );
  };

  const toastQrCode = (uniqueId: string) => {
    toast.info(
      <div>
        <p>QR Code Commessa</p>
        <p><b>{uniqueId}</b></p>
       <QRCode value={uniqueId} />
      </div>
    );
  };
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

  function exportAllHistoryToCsv(): void {
    const rows: any[] = [["ID Commessa"]];
    idHistory.forEach((id) => {
      rows.push([id]);
    });
    const csvContent = Papa.unparse(rows);
    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    element.href = URL.createObjectURL(file);
    element.download = "history.csv";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Grid>
            <Grid>
              <TableToggleButton data={tableData} />

              <div>
<Typography variant="h5">
<i>Step 1.</i> Versione del progetto indicato a cliente
</Typography>
<FormControlLabel
control={
<Checkbox
checked={options.versionProject}
onChange={() => handleOptionChange1("versionProject")}
required
/>
}
label="Inserisci Versione Progetto"
/>
<Collapse in={options.versionProject}>
<TextField
label="Inizio versione progetto"
type="number"
value={versionProject}
onChange={handleVersionProjectChange}
fullWidth
required
sx={{ mb: 2, mt:2 }}
/>
</Collapse>
</div>
              <div>
                <h3>
                  <i>Step 2.</i>Codice Cliente
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.codeCustomer}
                      onChange={() => handleOptionChange1("codeCustomer")}
                      required
                    />
                  }
                  label="Inserisci Codice Cliente"
                />
                <Collapse in={options.codeCustomer}>
                {options.codeCustomer && (
                  <TextField
                    label="Inizio codice cliente"
                    type="number"
                    value={codeCustomer}
                    onChange={handleCodeCustomerChange}
                    fullWidth
                    required
                    sx={{ mb: 2, mt:2 }}
                  />
                )}
                </Collapse>
              </div>
              <div>
                <h3>
                  <i>Step 3.</i>Seleziona il Tipo di hardware utilizzato
                </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedA}
                      onChange={() => handleOptionChange1("hardwareUsedA")}
                      required
                    />
                  }
                  label="Bilancia intelligente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedB}
                      onChange={() => handleOptionChange1("hardwareUsedB")}
                      required
                    />
                  }
                  label="Processore Verticale"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.hardwareUsedC}
                      onChange={() => handleOptionChange1("hardwareUsedC")}
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

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="software-category-label">
                    Categorie software
                  </InputLabel>
                  <Select
                    labelId="software-category-label"
                    id="software-category-select"
                    value={selected2}
                    onChange={handleSelectChange2}
                    label="Categoria Software"
                  >
                    {options2.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{ mt: 4 }}
          style={{ display: "flex", justifyContent: "center" }}
          id="start"
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
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography
            variant="h6"
            align="left"
            sx={{
              fontSize: { xs: "1.2rem", md: "2rem" },
              mb: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <TodayIcon />
             &nbsp; Commesse generate 
          </Typography>
          
          <Typography
            variant="h6"
            align="left"
            sx={{
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              mb: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "left" },
              opacity: '0.75',
              color: 'orange',
              fontWeight:'600'
            }}
          >
            <Announcement />
             &nbsp; Ricordati di salvare il QrCode della commessa
          </Typography>
</Box>
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
                className="list-item"
                secondaryAction={
                  <>
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
                      <div style={{padding: '4px', flexDirection: 'row'}}>
                      <div key={article.uniqueId} >
                        <img
                          src={QrCodeIcon}
                          alt="QR code commessa"
                          style={{
                            width: 36,
                            marginRight: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedArticleId(article);
                            handleGenerateQrCode(article.uniqueId);
                          }}
                        />
                         <img
        onClick={() => handleShowBarcode(article.uniqueId)}
                        src={BarCodeIcon}
                        alt="Barcode"
                        style={{
                          width: 36,
                          marginRight: 12,
                          marginBottom: 3,
                          cursor: "pointer",
                        }}
                      />
                      </div>

                      <Dialog open={openQrCode} onClose={handleCloseQrCode}>
  <DialogContent style={{ textAlign: "center" }}>
    <article ref={componentRef}>
      {qrCodeImage ? (
        <div className="print-content">
          <img
            src={qrCodeImage}
            alt={`Articolo ${selectedArticleId?.uniqueId}`}
          />
          <p>{`Commessa: ${selectedArticleId?.uniqueId}`}</p>
        </div>
      ) : (
        <div
          style={{
            display: isPrinting ? "none" : "block",
          }}
          ref={componentRef}
        >
          <QRCode value={selectedArticleId?.uniqueId ?? ''} />
          <p>{`Commessa: ${selectedArticleId?.uniqueId}`}</p>
        </div>
      )}
                            {showButtonPrint && (
                              <Button
                                variant="outlined"
                                startIcon={<PrintIcon />}
                                onClick={handlePrint}
                              >
                                Stampa
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              onClick={handleCloseQrCode}
                              sx={{ marginLeft: 1 }}
                            >
                              <CloseOutlined />
                              Chiudi
                            </Button>
                          </article>
                        </DialogContent>
                      </Dialog>
             
                      </div>
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
                  </>
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
                    primary={
                      <>
                        <span className="name">{article.name}</span>
                        <br />
                        <span>{article.date}</span>
                      </>
                    }
                    secondary={article.uniqueId}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "200px",
                      "& .uniqueId": {
                        background: "rgb(14, 14, 14);",
                        color: "white",
                        padding: "4px",
                        borderRadius: "6px",
                        fontWeight: 800,
                      },
                      "& .MuiListItemText-secondary": {
                        alignSelf: "flex-start",
                      },
                      "@media (max-width: 600px)": {
                        flexDirection: "column",
                        alignItems: "left",
                        "& .name": {
                          fontSize: "10px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      },
                      "@media (min-width: 600px)": {
                        flexDirection: "row",
                        alignItems: "left",
                        "& .MuiListItemText-secondary": {
                          alignSelf: "left",
                          marginLeft: "2px",
                        },
                        "& .name": {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      },
                    }}
                    classes={{ secondary: "uniqueId" }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2, borderColor: "primary.main" }} />

        <Box>
          <Box >
            <Typography
            variant="h6"
            align="left"
            sx={{
              fontSize: { xs: "1.2rem", md: "2rem" },
          
              textAlign: { xs: "center", md: "left" },
            }}
          >
                        <AccessTimeOutlined sx={{ mr: 1 }} />

              Cronologia commesse
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {idHistory.length > 0 && (
              <>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleRemoveAll}
                    sx={{ width: "100%", mb: { xs: 0, sm: 0 } }}
                  >
                    Elimina cronologia
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeOutlined />}
                    onClick={() =>
                      handleGenerateQrCodeHistory(JSON.stringify(idHistory))
                    }
                    sx={{ width: "100%", ml: { xs: 0, sm: 2 } }}
                  >
                    Genera QR Code della cronologia
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<ArticleIcon />}
                    onClick={exportAllHistoryToCsv}
                    sx={{ width: "100%", ml: { xs: 0, sm: 2 } }}
                  >
                    Esporta cronologia completa
                  </Button>
                </Stack>

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
              </>
            )}
          </Box>
          <List sx={{ bgcolor: "background.paper" }}>
            {idHistory
              .filter((id) => id.includes(searchTerm))
              .map((id) => (
                <ListItem
                  key={id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeIdFromHistory(id)}
                      >
                        <Delete />
                      </IconButton>
                    </>
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
        <Dialog open={openQrCodeHistory} onClose={handleCloseQrCodeHistory}>
          <DialogTitle>Cronologia commesse</DialogTitle>
          <DialogContent>
            <QRCode value={idHistory.join(",")} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseQrCodeHistory}>
              <CloseOutlined />
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleCancelRemoveAll}>
          <DialogTitle>
            Sei sicuro di voler eliminare la cronologia?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Questa azione è irreversibile. Sei sicuro di voler eliminare la
              cronologia?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelRemoveAll}>Annulla</Button>
            <Button variant="contained" color="error" onClick={handleConfirmRemoveAll} autoFocus >
              Elimina
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default GenerateUniqueId;
