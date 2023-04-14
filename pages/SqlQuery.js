import SqlQueryForm from "@/components/SqlQueryForm";
import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

const SqlQuery = () => {
  useEffect(() => {
    const useEffectAsync = async () => {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "SHOW TABLES",
        }),
      };

      setLoading(true);
      const resp = await fetch("http://localhost:3005/runQuery", reqOptions);
      setLoading(false);

      const allTables = await resp.json();

      console.log(allTables);

      setAllTables(allTables);
    };

    useEffectAsync();
  }, []);

  const [loading, setLoading] = useState(false);
  const [allTables, setAllTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableHeaders, setTableHeaders] = useState([]);

  const handleTableSelection = async (e) => {
    setSelectedTable(e.target.textContent);
    const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableName: e.target.textContent
        }),
      };

    const resp = await fetch('http://localhost:3005/fetchHeaderNames', reqOptions)
    const fetchedTableHeaders = await resp.json();
    console.log(fetchedTableHeaders);
    setTableHeaders(fetchedTableHeaders)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {loading ? <RingLoader color="#36d7b7" /> : null}
      <div className="flex flex-col border border-black w-1/5 min-h-screen">
        <h2>All DataBase tables</h2>
        {allTables.map((table, i) => {
          return (
            <span onClick={handleTableSelection} className={selectedTable === table.Tables_in_mydb ? 'bg-red-400' : null}>{table.Tables_in_mydb}</span>
          );
        })}
      </div>
      <div className="flex flex-col border border-black w-1/5 min-h-screen">
        <h2>Selected Table Headers</h2>
        {tableHeaders.map((header, i) => (
            <span>{header.COLUMN_NAME}</span>
        ))}
      </div>
      <SqlQueryForm />
    </div>
  );
};

export default SqlQuery;
