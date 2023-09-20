import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./components/dataTable";
import UserPage from "./components/userPage";
// import TestTable from "./components/test";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [dataSource, setDataSource] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/items/");
        const data = await response.json();

        console.log(data);
        data.sort((a, b) => a.id - b.id);
        const dataWithKeys = data.map((item) => ({ key: item.id, ...item }));
        setDataSource(dataWithKeys);
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // updates the database with new data
  const handleUpdateRow = async (id, newData) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const updatedData = await response.json();
      if (response.ok) {
        console.log("Successfully updated row with:", updatedData);
      } else {
        console.log("Error:", updatedData);
      }
    } catch (error) {
      console.error("There was a problem adding the item:", error);
    }
  };

  // deletes a row in the database using a corresponding id
  const handleDeleteRow = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Successfully deleted item with ID: ${id}`);
      } else {
        const responseData = await response.json();
        console.log("Error:", responseData);
      }
    } catch (error) {
      console.error("There was a problem deleting the item:", error);
    }
  };

  // adds a new row to the database
  const handleAddNewRow = async (newData) => {
    try {
      const response = await fetch("http://localhost:8000/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const createdData = await response.json();

      if (response.ok) {
        console.log("Successfully created new item:", createdData);
        return createdData.id;
      } else {
        console.log("Error:", createdData);
        return null;
      }
    } catch (error) {
      console.error("There was a problem adding the item:", error);
    }
  };

  // update local data state
  const handleDataUpdate = (updatedData) => {
    //console.log(dataSource);
    //console.log(updatedData);
    setDataSource(updatedData);
  };

  // decrements an item and updates local state and the row in the database
  const handleDecrement = (tile) => {
    setDataSource((dataSource) =>
      dataSource.map((item) => {
        if (item === tile) {
          handleUpdateRow(tile.key, { ...item, amount: item.amount - 1 });
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
    );
  };

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/dataTable" replace />} />
        <Route
          path="/user"
          element={<UserPage data={dataSource} onDecrement={handleDecrement} />}
        />
        <Route
          path="/dataTable"
          element={
            <DataTable
              data={dataSource}
              onDataUpdate={handleDataUpdate}
              onUpdateRow={handleUpdateRow}
              onAddNewRow={handleAddNewRow}
              onDeleteRow={handleDeleteRow}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
