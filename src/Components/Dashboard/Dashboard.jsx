import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Dashboard.css";

Chart.register(ArcElement);

function Dashboard() {
  const [rowData, setRowData] = useState([]);
  const [failedData, setFailedData] = useState([]);
  const [successData, setSuccessData] = useState([]);

  const MissionResultRenderer = ({ value }) => (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      {
        <img
          alt={`${value}`}
          src={`https://www.ag-grid.com/example-assets/icons/${
            value ? "tick-in-circle" : "cross-in-circle"
          }.png`}
          style={{ width: "auto", height: "auto" }}
        />
      }
    </span>
  );

  const [colDefs] = useState([
    {
      field: "mission",
      width: 150,
    },
    {
      field: "company",
      width: 130,
    },
    {
      field: "location",
      width: 225,
    },
    {
      field: "date",
    },
    {
      field: "price",
      width: 130,
      valueFormatter: (params) => {
        return "£" + params.value.toLocaleString();
      },
    },
    {
      field: "successful",
      width: 120,
      cellRenderer: MissionResultRenderer,
    },
    { field: "rocket" },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData);
        const unsuccessfulMissions = rowData.filter(
          (mission) => mission.successful === false
        );
        setFailedData(unsuccessfulMissions);
        const successfulMissions = rowData.filter(
          (mission) => mission.successful === true
        );

        setSuccessData(successfulMissions);
      });
  }, []);

  const pieChartData = {
    labels: ["Successful Missions", "Failed Missions"],
    datasets: [
      {
        data: [successData.length, failedData.length],
        backgroundColor: ["green", "red"],
      },
    ],
  };
  
  const pieChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
        },
      },
    },
  };

  return (
    <>
      <div className="container">
        <div
          className="ag-theme-alpine"
          style={{ height: "71vh", width: "51vw", float: "left" }}
        >
          <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            pagination={true}
          />
        </div>
        <div
          className="chart-container"
          style={{
            width: "50%",
            margin: "auto",
            marginTop: "20px",
            height: "77vh",
          }}
        >
          <Doughnut data={pieChartData} options={pieChartOptions} />
          <label className="chart-label"><b>Success vs Failure Data</b></label>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
