import React, { Component } from "react";
import { Table, Input, Button } from "antd";
import "./dataTable.css";

class dataTable extends Component {
  state = {
    dataSource: [
      {
        key: "1",
        item: "Black Tea",
        boxes: 2,
        amount: 46,
      },
      {
        key: "2",
        item: "Green Tea",
        boxes: 1,
        amount: 23,
      },
      {
        key: "3",
        item: "Earl Grey Tea",
        boxes: 2,
        amount: 76,
      },
      {
        key: "4",
        item: "Oolong Tea",
        boxes: 3,
        amount: 105,
      },
    ],

    columns: [
      {
        title: "Item",
        dataIndex: "item",
        key: "item",
        sorter: (a, b) => a.item.localeCompare(b.item),
      },
      {
        title: "Boxes",
        dataIndex: "boxes",
        key: "boxes",
        sorter: (a, b) => {
          if (a.boxes === b.boxes) {
            return a.amount - b.amount;
          } else {
            return a.boxes - b.boxes;
          }
        },
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "",
        dataIndex: "deleteButton",
        key: "deleteButton",
        width: 1,
        render: (text, record) => (
          <Button onClick={() => this.deleteRow(record.key)} danger>
            Delete
          </Button>
        ),
      },
    ],

    searchText: "",
  };

  filterData = () => {
    const { searchText, dataSource } = this.state;
    if (searchText.trim() === "") {
      return dataSource;
    }

    return dataSource.filter((item) =>
      item.item.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  onSearch = (e) => {
    const searchText = e.target.value;
    this.setState({ searchText });
  };

  deleteRow = (key) => {
    this.setState((prevState) => ({
      dataSource: prevState.dataSource.filter((item) => item.key !== key),
    }));
  };

  render() {
    const { columns, searchText } = this.state;
    return (
      <div>
        <Input.Search
          className="searchBar-big"
          placeholder="Search item name"
          value={searchText}
          onChange={this.onSearch}
          //size="large"
        />
        <Table
          dataSource={this.filterData()}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

export { dataTable as DataTable };
