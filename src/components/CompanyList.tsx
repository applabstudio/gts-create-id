import * as React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Container,
} from "@mui/material";
import { Save, Refresh, Search, ArticleOutlined } from "@mui/icons-material";
import { saveAs } from 'file-saver';

interface Data {
  id: number;
  codice: string;
  ragioneSociale: string;
}

const initialData: Data[] = [];




const CompanyList = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulazione data fetching
    setTimeout(() => {
      setData([
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
          ragioneSociale:
            "SOCIETA' AGRICOLA BOARINI DI BOARINI ONELIO E MONICA",
        },
        { id: 80, codice: "80", ragioneSociale: "START & GO SRL" },
        { id: 78, codice: "78", ragioneSociale: "TOMMASO PRONTI" },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.codice.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleEdit = (id: number, codice: string, ragioneSociale: string) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { id, codice, ragioneSociale };
      }
      return item;
    });
    setData(newData);
  };

  const saveDataToLocal = (id: number) => {
    const newData = data.find((item) => item.id === id);
    if (newData) {
      localStorage.setItem(`data-${id}`, JSON.stringify(newData));
    }
  };

  const loadDataFromLocal = (id: number): Data | undefined => {
    const dataStr = localStorage.getItem(`data-${id}`);
    if (dataStr) {
      return JSON.parse(dataStr) as Data;
    }
    return undefined;
  };

  const handleLoadFromLocal = (id: number) => {
    const newData = loadDataFromLocal(id);
    if (newData) {
      handleEdit(newData.id, newData.codice, newData.ragioneSociale);
    }
  };

  const exportToCSV = (data: Data[]) => {
    const csvData = [
      ['ID', 'Codice', 'Ragione Sociale'],
      ...data.map(item => [item.id, item.codice, item.ragioneSociale])
    ];
  
    const csvString = csvData.map(row => row.join(',')).join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingY: 4 }}
          >
            Lista codici clienti
          </Typography>

          <TextField
            id="search"
            label="Cerca codice cliente"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <Search sx={{ color: "#fff" }} />,
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
              sx: { color: "#fff" },
              className: "input-label",
            }}
            variant="outlined"
          />

        </Toolbar>
        
      </AppBar>

<Button
                      variant="contained"
                      color="secondary"
                      onClick={() => exportToCSV(data)}
                      startIcon={<ArticleOutlined />}
                      sx={{
                        marginRight: { xs: "8px", md: "16px" },
                        marginBottom: { xs: "8px", md: 0 },
                        marginTop: {xs: '8px', md: '32px'},
                      }}
                    >  Esporta tutti in CSV
</Button>
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
                      backgroundColor: "#1E74C3",
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
    </Container>
  );
};

export default CompanyList;
