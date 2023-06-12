import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import DataTable from "./components/dataTable";
import UserPage from "./components/userPage";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/tracking-list/getData"
      );
      const data = await response.json();

      //console.log(data);
      setDataSource(data);
      setIsFirstRender(false);
    };

    fetchData();
  }, []);

  const updatejson = useCallback(async () => {
    /* const response = */
    await fetch("http://localhost:8000/tracking-list/postData/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSource),
    });
    //const payload = await response.json();
    //console.log(payload);
  }, [dataSource]);

  // update json when dataSource changes
  useEffect(() => {
    if (!isFirstRender) {
      updatejson();
    }
  }, [dataSource, isFirstRender, updatejson]);

  const handleDataUpdate = (updatedData) => {
    //console.log(dataSource);
    //console.log(updatedData);
    setDataSource(updatedData);
  };

  const handleDecrement = (tile) => {
    setDataSource((dataSource) =>
      dataSource.map((item) => {
        if (item === tile) {
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
          path="/dataTable"
          element={
            <DataTable data={dataSource} onDataUpdate={handleDataUpdate} />
          }
        />
        <Route
          path="/user"
          element={<UserPage data={dataSource} onDecrement={handleDecrement} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
