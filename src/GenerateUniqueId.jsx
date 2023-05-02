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
} from "@mui/material";
import { Add, Delete, Inventory2Outlined } from "@mui/icons-material";
import Logo from "./assets/logo.png";

function GenerateUniqueId() {
  const [options, setOptions] = useState({
    productType: false,
    brand: false,
    model: false,
    serialNumber: false,
  });
  const [articles, setArticles] = useState([]);
  const [idHistory, setIdHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [serialNumber, setSerialNumber] = useState(1);

  function handleOptionChange(option) {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  }

  function generateUniqueId() {
    let uniqueId = "";
    if (options.productType) uniqueId += "TP";
    if (options.brand) uniqueId += "BR";
    if (options.model) uniqueId += "MD";
    if (options.serialNumber) uniqueId += `SN${serialNumber}`;
    return uniqueId;
  }

  function addArticle() {
    const newArticle = {
      name: "",
      uniqueId: generateUniqueId(),
    };
    setArticles([...articles, newArticle]);
    setIdHistory([...idHistory, newArticle.uniqueId]);
    setSerialNumber(serialNumber + 1);
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

  function removeArticle(article) {
    const newArticles = articles.filter((a) => a !== article);
    setArticles(newArticles);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSerialNumberChange(event) {
    setSerialNumber(Number(event.target.value));
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Box sx={{ pt: 2, pb: 2 }} style={{backgroundColor: 'black'}}>
    <img src={Logo} alt="logo" />
    <Typography variant="h4" sx={{ mb: 1 }} style={{color: 'white'}}>
      GTS - Generatore ID Articoli
    </Typography>
  </Box>
    <Container sx={{ py: 8 }}>
    <Typography variant="h3">
      Genera il codice articolo univoco del magazzino
    </Typography>
      <Box sx={{ mt: 10 }}>
        <Grid container spacing={2} style={{justifyContent:'center'}}>
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.productType}
                  onChange={() => handleOptionChange("productType")}
                />
              }
              label="Tipo di prodotto"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={options.brand}
                  onChange={() => handleOptionChange("brand")}
                />
              }
              label="Marca"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.model}
                  onChange={() => handleOptionChange("model")}
                />
              }
              label="Modello"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.serialNumber}
                  onChange={() => handleOptionChange("serialNumber")}
                />
              }
              label="Serial Number"
            />
              {options.serialNumber && (
                <TextField
                  label="Inizio numero seriale"
                  type="number"
                  value={serialNumber}
                  onChange={handleSerialNumberChange}
                  fullWidth
                />
          )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" startIcon={<Add />} onClick={addArticle}>
          Aggiungi Articolo
        </Button>
      </Box>
      <Typography variant="h6" align="left" sx={{ mt: 10 }}>
      Cerca gli articoli generati oggi
    </Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Cerca"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          fullWidth
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
      Storico Articoli Generati
    </Typography>
    
    <List sx={{ bgcolor: 'background.paper' }}>
      {idHistory.map((id) => (
        <ListItem key={id}>
        <Inventory2Outlined></Inventory2Outlined><ListItemText primary={id} />
        </ListItem>
      ))}
    </List>
  </Box>
    </Container>
    </>

  );
}

export default GenerateUniqueId;
