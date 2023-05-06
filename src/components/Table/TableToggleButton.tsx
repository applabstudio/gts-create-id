import * as React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CodificaTable from "./CodificaTable";
import  {tableData}  from "../../data";

type TableToggleButtonProps = {
    data: any[];
  };
  
  type TableToggleButtonState = {
    isTableVisible: boolean;
  };
  
  class TableToggleButton extends React.Component<TableToggleButtonProps, TableToggleButtonState> {
    constructor(props: TableToggleButtonProps) {
      super(props);
      this.state = {
        isTableVisible: true,
      };
    }
  
  
    handleClick = () => {
      this.setState((prevState) => ({
        isTableVisible: !prevState.isTableVisible,
      }));
    };
  
    render() {
      const { isTableVisible } = this.state;
      return (
        <div>
  <IconButton onClick={this.handleClick}>
    {isTableVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
  </IconButton>
  <span onClick={this.handleClick} style={{cursor: 'pointer'}}>Nascondi o mostra tabella di codifica</span>
  {isTableVisible && <CodificaTable data={tableData} />}
</div>
      );
    }
  }

export default TableToggleButton;
