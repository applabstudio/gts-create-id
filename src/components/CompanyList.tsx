import * as React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import {
  Save,
  Refresh,
  Search,
  ArticleOutlined,
  PersonAdd,
} from "@mui/icons-material";
import { saveAs } from "file-saver";

interface Data {
  id: number;
  codice: string;
  ragioneSociale: string;
}

const initialData: Data[] = [];

const CompanyList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [newUserData, setNewUserData] = useState({
    id: 0,
    codice: "",
    ragioneSociale: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("clienti");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    // aggiungiamo i dati iniziali qui
    setData((prevData) => [
      ...prevData,
      { id: 54, codice: "54", ragioneSociale: "A.M.V.P snc di Parrinelli" },
      { id: 52, codice: "52", ragioneSociale: "AVINATURA SRL" },
      { id: 31, codice: "31", ragioneSociale: "AZ. AGRICOLA PERLINI ALDO" },
      {
        id: 29,
        codice: "29",
        ragioneSociale: "AZ. AGRICOLA PITTALIS ROSALIA",
      },
      { id: 12, codice: "12", ragioneSociale: "AZICHEM SRL" },
      { id: 53, codice: "53", ragioneSociale: "BCI BAUTECHNIK GROUP SRL" },
      {
        id: 76,
        codice: "76",
        ragioneSociale: "BOTTI MAURO TECNOLOGIE PER L'INDUSTRIA",
      },
      { id: 67, codice: "67", ragioneSociale: "CALABRO BELTHENGS SNC" },
      { id: 65, codice: "65", ragioneSociale: "CHRYSO ITALIA SRL" },
      { id: 69, codice: "69", ragioneSociale: "CO.GE.DI.F. S.R.L." },
      { id: 77, codice: "77", ragioneSociale: "DIGILEN SRL" },
      { id: 75, codice: "75", ragioneSociale: "G PANTANI SRL" },
      { id: 62, codice: "62", ragioneSociale: "GESSI ROCCASTRADA SRL" },
      {
        id: 73,
        codice: "73",
        ragioneSociale: "IVAS INDUSTRIA VERNICI S.p.A.",
      },
      { id: 58, codice: "58", ragioneSociale: "KRONA KOBLENZ SPA" },
      {
        id: 27,
        codice: "27",
        ragioneSociale: "L.S. LAVANDERIA SAMMARINESE SPA",
      },
      { id: 70, codice: "70", ragioneSociale: "LAIFE SPA" },
      { id: 71, codice: "71", ragioneSociale: "LAMIER-PRESS S.R.L." },
      {
        id: 35,
        codice: "35",
        ragioneSociale: "NUOVA S.O.A.V. SNC DI GRENDENE GIOVANNI & C.",
      },
      { id: 56, codice: "56", ragioneSociale: "OPERA S.R.L. UNIPERSONALE" },
      { id: 72, codice: "72", ragioneSociale: "PLANTECH SRL" },
      { id: 79, codice: "79", ragioneSociale: "SANTA CATERINA SRL" },
      { id: 26, codice: "26", ragioneSociale: "SCUTTI SRL" },
      {
        id: 74,
        codice: "74",
        ragioneSociale: "SOCIETA' AGRICOLA BOARINI DI BOARINI ONELIO E MONICA",
      },
      { id: 80, codice: "80", ragioneSociale: "START & GO SRL" },
      { id: 78, codice: "78", ragioneSociale: "TOMMASO PRONTI" },
    ]);
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.codice.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleEdit = (
    id: number,
    codice: string,
    newRagioneSociale: string
  ) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ragioneSociale: newRagioneSociale } : item
      )
    );
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ragioneSociale: newRagioneSociale } : item
      )
    );
  };

  const saveDataToLocal = (id: number) => {
    localStorage.setItem(
      `cliente-${id}`,
      JSON.stringify(data.filter((item) => item.id === id)[0].ragioneSociale)
    );
  };

  const handleLoadFromLocal = (id: number) => {
    const ragioneSociale = localStorage.getItem(`cliente-${id}`);
    if (ragioneSociale) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ragioneSociale } : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ragioneSociale } : item
        )
      );
    }
  };

  const handleNewUserSubmit = () => {
    const newId = data.length + 1;
    const newUserDataWithId = { ...newUserData, id: newId };
    setData((prevData) => [...prevData, newUserDataWithId]);
    setNewUserData({ id: 0, codice: "", ragioneSociale: "" });
    localStorage.setItem(
      "clienti",
      JSON.stringify([...data, newUserDataWithId])
    );
    handleCloseModal();
  };

  const exportToCSV = (data: Data[]) => {
    const csvData = [
      ["ID", "Codice", "Ragione Sociale"],
      ...data.map((item) => [item.id, item.codice, item.ragioneSociale]),
    ];

    const csvString = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "export.csv");
  };

  const handleCodiceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewUserData({ ...newUserData, codice: event.target.value });
  };

  const handleRagioneSocialeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewUserData({ ...newUserData, ragioneSociale: event.target.value });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            paddingY: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Lista codici clienti
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => exportToCSV(data)}
              startIcon={<ArticleOutlined />}
              sx={{
                marginRight: { xs: 1, md: 2 },
                fontSize: { xs: "0.8rem", md: "inherit" },
              }}
            >
              Esporta tutti in CSV
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              startIcon={<PersonAdd />}
              sx={{
                fontSize: { xs: "0.8rem", md: "inherit" },
              }}
            >
              Aggiungi nuovo utente
            </Button>
          </Box>
        </Typography>

        <TextField
          id="search"
          label="Cerca codice cliente"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <Search sx={{ color: "black" }} />,
            sx: {
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
            },
            classes: {
              notchedOutline: "notched-outline",
            },
          }}
          InputLabelProps={{
            sx: { color: "black" },
            className: "input-label",
          }}
          variant="outlined"
        />
      </Stack>

      <Grid container spacing={3} sx={{ marginTop: "16px" }}>
        {filteredData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "8px",
                      color: "white",
                      backgroundColor: "black",
                      padding: "4px",
                      borderRadius: "6px",
                      fontSize: "16px",
                    }}
                  >
                    {item.codice}
                  </span>
                  {item.ragioneSociale}
                </Typography>

                <TextField
                  id={`ragioneSociale-${item.id}`}
                  label="Ragione Sociale"
                  variant="outlined"
                  size="small"
                  defaultValue={item.ragioneSociale}
                  fullWidth
                  onChange={(e) =>
                    handleEdit(item.id, item.codice, e.target.value)
                  }
                  sx={{ marginTop: "12px" }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleLoadFromLocal(item.id)}
                >
                  <Refresh /> Aggiorna
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => saveDataToLocal(item.id)}
                >
                  <Save /> Salva
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Aggiungi nuovo utente</DialogTitle>
        <DialogContent>
          <form onSubmit={handleNewUserSubmit}>
            <TextField
              id="codice"
              label="Codice"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.codice}
              onChange={handleCodiceInputChange}
              required
            />
            <TextField
              id="ragioneSociale"
              label="Ragione Sociale"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.ragioneSociale}
              onChange={handleRagioneSocialeInputChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annulla</Button>
          <Button variant="contained" onClick={handleNewUserSubmit}>
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyList;
