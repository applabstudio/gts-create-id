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

interface Article {
  name: string;
  uniqueId: string;
}

interface Options {
  productType: boolean;
  brand: boolean;
  model: boolean;
  serialNumber: boolean;
}

function GenerateUniqueId(): JSX.Element {
  const [options, setOptions] = useState<Options>({
    productType: false,
    brand: false,
    model: false,
    serialNumber: false,
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [idHistory, setIdHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<number>(1);

  function handleOptionChange(option: keyof Options) {
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
    const newArticle: Article = {
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
      <Header title=""/>
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center">
          Genera il codice commessa 
        </Typography>
        <Box sx={{ mt: 10 }}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
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
              )}
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
        <Typography variant="h6" align="left" sx={{ mt: 10 }} id="search">
          Cerca gli id commesse generate oggi
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
