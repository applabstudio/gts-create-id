/*
prende un array di oggetti come prop data, dove ogni oggetto rappresenta una riga della tabella. 
*/

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Download } from "@mui/icons-material";

interface CodificaTableProps {
  data: {
    versione: string;
    codiceCliente: string;
    tipoHardware: string;
    categoriaSoftware: string;
    numeroProgressivo: string;
    tipologiaUtilizzo: string;
    tipoSoftware: string;
  }[];
}

const tableData = [
  {
    versione: "A1",
    codiceCliente: "001",
    tipoHardware: "HA",
    categoriaSoftware: "CSA",
    numeroProgressivo: "000",
    tipologiaUtilizzo: "DH",
    tipoSoftware: "V",
  },
  {
    versione: "A2",
    codiceCliente: "003",
    tipoHardware: "HB",
    categoriaSoftware: "CSA",
    numeroProgressivo: "001",
    tipologiaUtilizzo: "DH",
    tipoSoftware: "V",
  },
  {
    versione: "B1",
    codiceCliente: "004",
    tipoHardware: "HA",
    categoriaSoftware: "CSB",
    numeroProgressivo: "002",
    tipologiaUtilizzo: "DH",
    tipoSoftware: "V",
  },
  {
    versione: "C1",
    codiceCliente: "002",
    tipoHardware: "HA",
    categoriaSoftware: "CSC",
    numeroProgressivo: "003",
    tipologiaUtilizzo: "DH",
    tipoSoftware: "V",
  },
  {
    versione: "D1",
    codiceCliente: "005",
    tipoHardware: "HA",
    categoriaSoftware: "CSD",
    numeroProgressivo: "004",
    tipologiaUtilizzo: "DH",
    tipoSoftware: "V",
  },
];

function downloadCsv() {
  const csvData = tableData
    .map((item) => Object.values(item).join(","))
    .join("\n");
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  link.click();
}

function CodificaTable({ data }: CodificaTableProps) {
  return (
    <>
     <Box sx={{
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: 'start',
  textAlign: 'center',
  '@media (min-width: 600px)': {
    flexDirection: "row",
    justifyContent: 'space-between',
    textAlign: 'left',
    alignItems: 'baseline'
  }
}}>
  <h2 style={{marginBottom: "16px"}}>Tabella di codifica commesse</h2>
  <Button
    variant="contained"
    color="success"
    onClick={downloadCsv}
    style={{
      height: "40px",
      minWidth: "120px",
      whiteSpace: "nowrap",
      marginBottom: "16px",
    }}
    startIcon={<Download />}
  >
    Scarica la tabella di codifica commesse
  </Button>
</Box>

      <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
        <Table sx={{ minWidth: 650, overflowX: 'auto' }} aria-label="codifica table">
          <TableHead>
            <TableRow>
              <TableCell width="10%">Versione</TableCell>
              <TableCell width="15%">Codice cliente</TableCell>
              <TableCell width="10%">Tipo hardware</TableCell>
              <TableCell width="15%">Categoria software</TableCell>
              <TableCell width="10%">Numero progressivo</TableCell>
              <TableCell width="15%">Tipologia utilizzo</TableCell>
              <TableCell width="10%">Tipo software</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.numeroProgressivo}>
                <TableCell>{item.versione}</TableCell>
                <TableCell>{item.codiceCliente}</TableCell>
                <TableCell>{item.tipoHardware}</TableCell>
                <TableCell>{item.categoriaSoftware}</TableCell>
                <TableCell>{item.numeroProgressivo}</TableCell>
                <TableCell>{item.tipologiaUtilizzo}</TableCell>
                <TableCell>{item.tipoSoftware}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CodificaTable;
