// Puoi rinominare questo file data.ts in data.tsx, non ci sono problemi. 
// Tuttavia, considera che TypeScript (che presumibilmente stai usando) compila il codice TypeScript in JavaScript, 
// e tsx è l'estensione che viene usata per i file che contengono codice TypeScript e JSX (JavaScript XML).
// In altre parole, se il file data.tsx contiene solo l'array tableData, 
//non è necessario utilizzare JSX e potresti considerare di utilizzare l'estensione ts anziché tsx. 
// Questo non influisce sulla funzionalità dell'importazione dell'array all'interno del tuo componente.
// Ad ogni modo, sia che tu utilizzi l'estensione ts o tsx, 
// dovresti comunque impostare il percorso di importazione del tuo componente.
export const tableData = [
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