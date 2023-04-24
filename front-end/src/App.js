import React, { Component } from "react";
import "./App.css";
import DataTable from "./components/dataTable";
import UserPage from "./components/userPage";
import { Route, Routes, Navigate } from "react-router-dom";

class App extends Component {
  state = {
    data: [
      {
        key: "0",
        name: "Black Tea",
        amountPerBox: 40,
        amount: 65,
        sku: "t1-pop",
        imageUrl: "https://i.imgur.com/wRkSSgU.png",
      },
      {
        key: "1",
        name: "Green Tea",
        amountPerBox: 40,
        amount: 85,
        sku: "t2-pop",
        imageUrl: "https://i.imgur.com/FjMCMnH.png",
      },
      {
        key: "2",
        name: "Earl Grey Tea",
        amountPerBox: 40,
        amount: 33,
        sku: "t3-pop",
        imageUrl: "https://i.imgur.com/9kTatwQ.png",
      },
      {
        key: "3",
        name: "Oolong Tea",
        amountPerBox: 40,
        amount: 74,
        sku: "t4-pop",
        imageUrl: "https://i.imgur.com/C7Z1ZCi.png",
      },
      {
        key: "4",
        name: "Thai Tea",
        amountPerBox: 20,
        amount: 99,
        sku: "t5",
        imageUrl: "https://i.imgur.com/GmyGjGJ.png",
      },
      {
        key: "5",
        name: "Brown Sugar Syrup",
        amountPerBox: 12,
        amount: 163,
        sku: "s1",
        imageUrl: "https://i.imgur.com/3G43zcT.png",
      },
      {
        key: "6",
        name: "Strawberry Syrup",
        amountPerBox: 12,
        amount: 22,
        sku: "s2",
        imageUrl: "https://i.imgur.com/6XXbZmd.png",
      },
      {
        key: "7",
        name: "Passionfruit Syrup",
        amountPerBox: 12,
        amount: 44,
        sku: "s3",
        imageUrl: "https://i.imgur.com/X4JLAE3.png",
      },
      {
        key: "8",
        name: "Mango Syrup",
        amountPerBox: 12,
        amount: 23,
        sku: "s4",
        imageUrl: "https://i.imgur.com/1gLpmg9.png",
      },
      {
        key: "9",
        name: "Grapefruit Syrup",
        amountPerBox: 12,
        amount: 31,
        sku: "s5",
        imageUrl: "https://i.imgur.com/8ZvVpFj.png",
      },
      {
        key: "10",
        name: "Lychee Syrup",
        amountPerBox: 12,
        amount: 15,
        sku: "s6",
        imageUrl: "https://i.imgur.com/JPSYf9j.png",
      },
      {
        key: "11",
        name: "Plant Creamer Powder",
        amountPerBox: 15,
        amount: 21,
        sku: "p1-pop",
        imageUrl: "https://i.imgur.com/iQnYLZc.png",
      },
      {
        key: "12",
        name: "Taro Powder",
        amountPerBox: 30,
        amount: 35,
        sku: "p2",
        imageUrl: "https://i.imgur.com/RydmmJn.png",
      },
      {
        key: "13",
        name: "Matcha Powder",
        amountPerBox: 30,
        amount: 22,
        sku: "p3",
        imageUrl: "https://i.imgur.com/ZfWED3A.png",
      },
      {
        key: "14",
        name: "Pearls",
        amountPerBox: 20,
        amount: 34,
        sku: "o1-pop",
        imageUrl: "https://i.imgur.com/FsrluI2.png",
      },
    ],
  };

  handleDataUpdate = (updatedData) => {
    //console.log(this.state.data);
    //console.log(updatedData);
    this.setState({ data: updatedData });
  };

  handleDecrement = (tile) => {
    const data = [...this.state.data];
    const index = data.indexOf(tile);
    data[index] = { ...tile };
    data[index].amount--;

    this.setState({ data: data });
  };

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Navigate to="/dataTable" replace />} />
          <Route
            path="/dataTable"
            element={
              <DataTable
                data={this.state.data}
                onDataUpdate={this.handleDataUpdate}
              />
            }
          />
          <Route
            path="/user"
            element={
              <UserPage
                data={this.state.data}
                onDecrement={this.handleDecrement}
              />
            }
          />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
