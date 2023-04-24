import React, { Component } from "react";
import { Card } from "antd";
import "./tile.css";
const { Meta } = Card;

class Tile extends Component {
  state = {};
  render() {
    return (
      <div>
        <Card
          hoverable
          bordered={true}
          size="small"
          cover={
            <img
              alt="example"
              src={this.props.tile.imageUrl}
              className="cardImage"
            />
          }
          onClick={() => this.props.onDecrement(this.props.tile)}
          className="card"
        >
          <Meta
            title={<div className="cardTitleText">{this.props.tile.name}</div>}
            description={this.props.tile.amount}
          />
        </Card>
      </div>
    );
  }
}

export default Tile;
