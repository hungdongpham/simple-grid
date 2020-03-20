import React from "react";
import ReactDataGrid from "react-data-grid";
import { createRowData, prepareAlphabets, generateColName, createFakeRow } from "./createRowData";
import { Menu } from "react-data-grid-addons";
import { Button } from 'semantic-ui-react';
import CustomContextMenu from './customContextMenu';

const { ContextMenuTrigger } = Menu;
const ROW_COUNT = 100000;
const MORE_ROWS = 1000;

const columns = prepareAlphabets();
const rows = createRowData(ROW_COUNT, 0);



class CustomGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = { columns, rows, rowCount: ROW_COUNT };
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  handleAddCol = () => {
    const { columns } = this.state;

    const cols = columns.slice();
    const colName = generateColName(cols.length - 1);

    const newCol = {
      key: colName,
      name: colName,
      editable: true
    };
    cols.push(newCol);

    this.setState({ columns: cols });
  }

  handleAddRows = () => {
    const { rows, rowCount } = this.state;

    const newRowCount = rowCount + MORE_ROWS;
    const newRows = createRowData(MORE_ROWS, rows.length);

    this.setState({ rowCount: newRowCount, rows: rows.concat(newRows) });
  }

  deleteRow = (rowIdx)  => {
    const { rows } = this.state;
    const nextRows = [...rows];
    nextRows.splice(rowIdx, 1);
    this.setState({ rows: nextRows  });
  };
  
  insertRow = (rowIdx) => {
    const { rows } = this.state;
    const newRow = createFakeRow("--");
    const nextRows = [...rows];
    nextRows.splice(rowIdx, 0, newRow);
    this.setState({ rows: nextRows  });
  };

  render() {
    const { rows, columns, rowCount } = this.state;
    return (
      <div>
        <Button primary onClick={this.handleAddCol}>Add Column</Button>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => rows[i]}
          rowsCount={rowCount}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          cellRangeSelection={{
            onStart: args => console.log(rows),
            onUpdate: args => console.log(rows),
            onComplete: args => console.log(rows)
          }}

          contextMenu={
            <CustomContextMenu
              onRowDelete={(e, { rowIdx }) => this.deleteRow(rowIdx)}
              onRowInsertAbove={(e, { rowIdx }) => this.insertRow(rowIdx)}
              onRowInsertBelow={(e, { rowIdx }) => this.insertRow(rowIdx + 1)}
            />
          }
          RowsContainer={ContextMenuTrigger}
        />
        <React.Fragment>
          <Button primary onClick={this.handleAddRows}>Add</Button>
          <span> {MORE_ROWS} rows at bottom.</span>
        </React.Fragment>
      </div>
    );
  }
}

export default CustomGrid;
