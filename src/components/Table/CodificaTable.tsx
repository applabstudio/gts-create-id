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
import { tableData } from "src/data";

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
      maxWidth: "100%",
      marginBottom: "14px",
      fontSize: '12px'
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
