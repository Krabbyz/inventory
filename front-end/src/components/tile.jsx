import { Card } from "antd";
import "./tile.css";
const { Meta } = Card;

const colorMapping = {
  "black tea": "#ffcc00",
  "earl grey tea": "red",
  "green tea": "#449e48",
  "oolong tea": "#c48a47",
};

const Tile = ({ onDecrement, tile }) => {
  const color = colorMapping[tile.name.toLowerCase()] || "defaultColor";

  return (
    <div>
      <Card
        hoverable
        bordered={true}
        size="small"
        cover={<img alt="example" src={tile.imageUrl} className="cardImage" />}
        onClick={() => onDecrement(tile)}
        className="card"
      >
        <Meta
          title={
            <div className="cardTitleText" style={{ color: color }}>
              {tile.name}
            </div>
          }
          description={tile.amount}
        />
      </Card>
    </div>
  );
};

export default Tile;
