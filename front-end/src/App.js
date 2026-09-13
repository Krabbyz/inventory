import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./components/dataTable";
import UserPage from "./components/userPage";
// import TestTable from "./components/test";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  getNextInventoryId,
  loadInventory,
  normalizeInventory,
  saveInventory,
} from "./inventoryStore";

const App = () => {
  const [dataSource, setDataSource] = useState([]);

  // Load demo data from a static JSON file so the app can run on GitHub Pages.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataSource(await loadInventory());
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Keeps the local demo store in sync after row edits.
  const handleUpdateRow = (id, newData) => {
    const updatedData = normalizeInventory(
      dataSource.map((item) =>
        item.key === id
          ? { ...item, ...newData, id: item.id, key: item.key }
          : item
      )
    );
    saveInventory(updatedData);
  };

  // Removes rows from the local demo store.
  const handleDeleteRow = (id) => {
    saveInventory(dataSource.filter((item) => item.key !== id));
  };

  // Adds rows to the local demo store.
  const handleAddNewRow = (newData) => {
    const newId = getNextInventoryId(dataSource);
    const updatedData = normalizeInventory([
      ...dataSource,
      { ...newData, id: newId, key: newId },
    ]);
    saveInventory(updatedData);
    return newId;
  };

  // update local data state
  const handleDataUpdate = (updatedData) => {
    const normalizedData = normalizeInventory(updatedData);
    setDataSource(normalizedData);
    saveInventory(normalizedData);
  };

  // decrements an item and updates local state and the browser demo store
  const handleDecrement = (tile) => {
    setDataSource((dataSource) => {
      const updatedData = normalizeInventory(
        dataSource.map((item) => {
          if (item === tile) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
      );

      saveInventory(updatedData);
      return updatedData;
    });
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
