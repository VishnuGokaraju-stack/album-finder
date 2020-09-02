import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));
class GridAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: this.props.albumData,
    };
  }

  render() {
    return (
      <div>
        <h1>Grid Album</h1>
        <GridList cellHeight={180} className={useStyles.gridList}>
          {this.state.albumData.map((photo) => (
            <GridListTile key={photo.url}>
              <img src={photo.url} alt={photo.title} />
              <GridListTileBar
                title={photo.title}
                subtitle={<span>{photo.id}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${photo.title}`}
                    className={useStyles.icon}
                  >
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default GridAlbum;
