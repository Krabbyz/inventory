import { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Tile from "./tile";
import "./userPage.css";

const popular = [
  "black tea",
  "brown sugar syrup",
  "earl grey tea",
  "green tea",
  "oolong tea",
  "pearls",
  "plant creamer powder",
];
const teas = ["tea"];
const syrups = ["syrup", "puree", "brown sugar"];
const powders = ["powder", "creamer"];
const toppings = ["pearls", "jelly"];
const other = [...teas, ...syrups, ...powders, ...toppings];

const UserPage = ({ data, onDecrement }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="margin">
      <h2>Popular</h2>
      <div className="scrollContainer">
        {data
          .filter((item) => popular.includes(item.name.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <h2>Teas</h2>
      <div className="scrollContainer">
        {data
          .filter((item) =>
            teas.some((word) => item.name.toLowerCase().includes(word))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <h2>Syrups</h2>
      <div className="scrollContainer">
        {data
          .filter((item) =>
            syrups.some((word) => item.name.toLowerCase().includes(word))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <h2>Powders</h2>
      <div className="scrollContainer">
        {data
          .filter((item) =>
            powders.some((word) => item.name.toLowerCase().includes(word))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <h2>Toppings</h2>
      <div className="scrollContainer">
        {data
          .filter((item) =>
            toppings.some((word) => item.name.toLowerCase().includes(word))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <h2>Other</h2>
      <div className="scrollContainer">
        {data
          .filter(
            (item) =>
              !other.some((word) => item.name.toLowerCase().includes(word))
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
            <Tile key={tile.key} onDecrement={onDecrement} tile={tile}></Tile>
          ))}
      </div>
      <div style={{ paddingInline: 2, paddingBlock: 20 }}>
        <Link to="/">
          <Button>data table</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
