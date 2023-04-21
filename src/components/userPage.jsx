import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Tile from "./tile";
import "./userPage.css";

class UserPage extends Component {
  render() {
    const other = ["tea", "syrup", "powder"];

    return (
      <div className="margin">
        <h2>Popular</h2>
        <div className="scrollContainer">
          {this.props.data
            .filter((tile) => tile.sku.toLowerCase().includes("pop"))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tile) => (
              <Tile
                key={tile.key}
                onDecrement={this.props.onDecrement}
                tile={tile}
              ></Tile>
            ))}
        </div>
        <h2>Teas</h2>
        <div className="scrollContainer">
          {this.props.data
            .filter((tile) => tile.name.toLowerCase().includes("tea"))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tile) => (
              <Tile
                key={tile.key}
                onDecrement={this.props.onDecrement}
                tile={tile}
              ></Tile>
            ))}
        </div>
        <h2>Syrups</h2>
        <div className="scrollContainer">
          {this.props.data
            .filter((tile) => tile.name.toLowerCase().includes("syrup"))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tile) => (
              <Tile
                key={tile.key}
                onDecrement={this.props.onDecrement}
                tile={tile}
              ></Tile>
            ))}
        </div>
        <h2>Powders</h2>
        <div className="scrollContainer">
          {this.props.data
            .filter((tile) => tile.name.toLowerCase().includes("powder"))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tile) => (
              <Tile
                key={tile.key}
                onDecrement={this.props.onDecrement}
                tile={tile}
              ></Tile>
            ))}
        </div>
        <h2>Other</h2>
        <div className="scrollContainer">
          {this.props.data
            .filter((item) => {
              const lowerCaseName = item.name.toLowerCase();
              return !other.some((word) => lowerCaseName.includes(word));
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tile) => (
              <Tile
                key={tile.key}
                onDecrement={this.props.onDecrement}
                tile={tile}
              ></Tile>
            ))}
        </div>
        <div style={{ paddingInline: 2, paddingBlock: 20 }}>
          <Link to="/">
            <Button>data table</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default UserPage;
