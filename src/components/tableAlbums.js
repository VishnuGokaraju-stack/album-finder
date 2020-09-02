import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
class TableAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: this.props.albumData,
    };
  }

  render() {
    return (
      <div>
        <h1>Table Album</h1>
        <TableBody>
          {this.state.albumData.map((n) => (
            <TableRow key={n.id}>
              <TableCell>{n.id}</TableCell>
              <TableCell component="th" scope="row">
                {n.title}
              </TableCell>
              <TableCell>
                <img src={n.url} alt={n.title} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </div>
    );
  }
}

export default TableAlbum;
