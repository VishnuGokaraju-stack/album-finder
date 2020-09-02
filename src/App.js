import React from "react";
import axios from "axios";
//import debounce from "debounce";
import "./App.css";
import GridAlbum from "../src/components/gridAlbum";
import TableAlbum from "../src/components/tableAlbums";

class App extends React.Component {
  //albumData;
  constructor(props) {
    super(props);
    this.state = {
      gridDisplay: false,
      tableDisplay: false,
      albumId: 0,
      albumData: [],
      renderChild: false,
      inputValue: "",
      filteredAlbums: [],
      options: localStorage.getItem("albums")
        ? JSON.parse(localStorage.getItem("albums"))
        : [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  addOption(option) {
    this.setState({ options: [...this.state.options, option] }, () => {
      localStorage.setItem("albums", JSON.stringify(this.state.options));
    });
  }
  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      const userInput = event.target.value;
      this.addOption(userInput);
      this.setState({ inputValue: "" });
    }
  };
  handleClick = (event) => {
    this.setState({ renderChild: true, albumId: event.target.value });
  };
  // handleOnChange = debounce((event) => {
  //   let searchTerm = event.target.value;
  //   if (searchTerm === "") {
  //     this.setState({
  //       renderChild: false,
  //       inputValue: "",
  //     });
  //   } else {
  //     this.setState({
  //       inputValue: searchTerm,
  //     });
  //     const filteredAlbums = this.state.options.filter(
  //       (option) =>
  //         option.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  //     );
  //     this.setState({ filteredAlbums });
  //   }
  // }, 1000);

  handleOnChange = (event) => {
    const albumInput = event.target.value;
    if (albumInput === "") {
      this.setState({
        renderChild: false,
        inputValue: "",
      });
    } else {
      this.setState({
        inputValue: event.target.value,
      });
      const filteredAlbums = this.state.options.filter(
        (option) =>
          option.title.toLowerCase().indexOf(albumInput.toLowerCase()) > -1
      );
      this.setState({ filteredAlbums });
    }
  };
  handleButton = (event) => {
    let val = event.target.name;
    try {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${this.state.albumId}`
        )
        .then((res) => {
          this.setState({ albumData: res.data });
        })
        .catch((err) => {
          console.log("Handle API Error");
        });
    } catch (error) {
      console.log("Error Handling");
    }
    if (val === "grid") {
      this.setState({
        gridDisplay: true,
        tableDisplay: false,
      });
    } else {
      this.setState({
        gridDisplay: false,
        tableDisplay: true,
      });
    }
  };

  // onChange = (event) => {
  //   event.persist();
  //   if (!this.debouncedFn) {
  //     this.debouncedFn = _.debounce(() => {
  //       let searchString = event.target.value;
  //       searchAlbum(searchString);
  //     }, 300);
  //   }
  //   this.debouncedFn();
  // };
  async fetchAlbums() {
    try {
      await axios
        .get(`https://jsonplaceholder.typicode.com/albums`)
        .then((res) => {
          localStorage.setItem("albums", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log("Handle API Error");
        });
    } catch (error) {
      console.log("Error Handling");
    }
  }
  componentDidMount() {
    this.fetchAlbums();
  }
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="albumText"
              name="albumText"
              type="text"
              placeholder="search album"
              //onChange={this.handleOnChange}
              onChange={this.handleOnChange}
              //onKeyDown={this.handleKeyDown}
              value={this.state.inputValue}
            />
            {!this.state.renderChild && (
              <ul className="collection">
                {
                  //console.log("sssss " + this.state.filteredAlbums)
                  // this.state.inputValue > 0 &&
                  this.state.filteredAlbums.map(
                    (option) => (
                      //console.log("option  " + option.title)
                      <li
                        key={option.id}
                        value={option.id}
                        onClick={this.handleClick}
                        className="collection-item"
                      >
                        {option.title}
                      </li>
                    ),
                    this
                  )
                }
              </ul>
            )}
            <label htmlFor="email">search</label>
          </div>
        </div>
        {this.state.renderChild && (
          <div>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="grid"
              onClick={this.handleButton}
            >
              Grid
              <i className="material-icons right">send</i>
            </button>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="table"
              onClick={this.handleButton}
            >
              Table
              <i className="material-icons right">send</i>
            </button>

            {this.state.gridDisplay && (
              <GridAlbum albumData={this.state.albumData} />
            )}
            {this.state.tableDisplay && (
              <TableAlbum albumData={this.state.albumData} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
