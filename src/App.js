import './App.css';
import React from 'react';
import { useState } from "react";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  Colors,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, Colors)



const tour = [
  {
    "Club": "Driver",
    "Club-Speed(mph)": 113,
    "Attack-Angle(deg)": "-1.3°",
    "Ball-Speed(mph)": 167,
    "Smash": 1.48,
    "Factor(deg)": "10.9°",
    "Launch-Ang.-Spin-Rate(rpm)": 2686,
    "Max-Height(meters)": 29,
    "Land-Angle(deg)": "38°",
    "Carry(meters)": 251
  },
  {
    "Club": "3 Wood",
    "Club-Speed(mph)": 107,
    "Attack-Angle(deg)": "-2.9°",
    "Ball-Speed(mph)": 158,
    "Smash": 1.48,
    "Factor(deg)": "9.2°",
    "Launch-Ang.-Spin-Rate(rpm)": 3655,
    "Max-Height(meters)": 27,
    "Land-Angle(deg)": "43°",
    "Carry(meters)": 222
  },
  {
    "Club": "5 Wood",
    "Club-Speed(mph)": 103,
    "Attack-Angle(deg)": "-3.3°",
    "Ball-Speed(mph)": 152,
    "Smash": 1.47,
    "Factor(deg)": "9.4°",
    "Launch-Ang.-Spin-Rate(rpm)": 4350,
    "Max-Height(meters)": 28,
    "Land-Angle(deg)": "47°",
    "Carry(meters)": 210
  },
  {
    "Club": "Hybrid",
    "Club-Speed(mph)": 100,
    "Attack-Angle(deg)": "-3.5°",
    "Ball-Speed(mph)": 146,
    "Smash": 1.46,
    "Factor(deg)": "10.2°",
    "Launch-Ang.-Spin-Rate(rpm)": 4437,
    "Max-Height(meters)": 27,
    "Land-Angle(deg)": "47°",
    "Carry(meters)": 206
  },
  {
    "Club": "3 Iron",
    "Club-Speed(mph)": 98,
    "Attack-Angle(deg)": "-3.1°",
    "Ball-Speed(mph)": 142,
    "Smash": 1.45,
    "Factor(deg)": "10.4°",
    "Launch-Ang.-Spin-Rate(rpm)": 4630,
    "Max-Height(meters)": 25,
    "Land-Angle(deg)": "46°",
    "Carry(meters)": 194
  },
  {
    "Club": "4 Iron",
    "Club-Speed(mph)": 96,
    "Attack-Angle(deg)": "-3.4°",
    "Ball-Speed(mph)": 137,
    "Smash": 1.43,
    "Factor(deg)": "11.0°",
    "Launch-Ang.-Spin-Rate(rpm)": 4836,
    "Max-Height(meters)": 26,
    "Land-Angle(deg)": "48°",
    "Carry(meters)": 186
  },
  {
    "Club": "5 Iron",
    "Club-Speed(mph)": 94,
    "Attack-Angle(deg)": "-3.7°",
    "Ball-Speed(mph)": 132,
    "Smash": 1.41,
    "Factor(deg)": "12.1°",
    "Launch-Ang.-Spin-Rate(rpm)": 5361,
    "Max-Height(meters)": 28,
    "Land-Angle(deg)": "49°",
    "Carry(meters)": 177
  },
  {
    "Club": "6 Iron",
    "Club-Speed(mph)": 92,
    "Attack-Angle(deg)": "-4.1°",
    "Ball-Speed(mph)": 127,
    "Smash": 1.38,
    "Factor(deg)": "14.1°",
    "Launch-Ang.-Spin-Rate(rpm)": 6231,
    "Max-Height(meters)": 27,
    "Land-Angle(deg)": "50°",
    "Carry(meters)": 167
  },
  {
    "Club": "7 Iron",
    "Club-Speed(mph)": 90,
    "Attack-Angle(deg)": "-4.3°",
    "Ball-Speed(mph)": 120,
    "Smash": 1.33,
    "Factor(deg)": "16.3°",
    "Launch-Ang.-Spin-Rate(rpm)": 7097,
    "Max-Height(meters)": 29,
    "Land-Angle(deg)": "50°",
    "Carry(meters)": 157
  },
  {
    "Club": "8 Iron",
    "Club-Speed(mph)": 87,
    "Attack-Angle(deg)": "-4.5°",
    "Ball-Speed(mph)": 115,
    "Smash": 1.32,
    "Factor(deg)": "18.1°",
    "Launch-Ang.-Spin-Rate(rpm)": 7998,
    "Max-Height(meters)": 28,
    "Land-Angle(deg)": "50°",
    "Carry(meters)": 146
  },
  {
    "Club": "9 Iron",
    "Club-Speed(mph)": 85,
    "Attack-Angle(deg)": "-4.7°",
    "Ball-Speed(mph)": 109,
    "Smash": 1.28,
    "Factor(deg)": "20.4°",
    "Launch-Ang.-Spin-Rate(rpm)": 8647,
    "Max-Height(meters)": 27,
    "Land-Angle(deg)": "51°",
    "Carry(meters)": 135
  },
  {
    "Club": "PW",
    "Club-Speed(mph)": 83,
    "Attack-Angle(deg)": "-5.0°",
    "Ball-Speed(mph)": 102,
    "Smash": 1.23,
    "Factor(deg)": "24.2°",
    "Launch-Ang.-Spin-Rate(rpm)": 9304,
    "Max-Height(meters)": 27,
    "Land-Angle(deg)": "52°",
    "Carry(meters)": 124
  }
]

function Metric(props) {
  {
    var average = props.avg.map(v => v.replace("°", ""))
      .filter(v => v !== "")
      .reduce((p, c) => parseFloat(p) + parseFloat(c), 0) / props.avg.length
  }
  return (
    < div className="clubs" >
      <p className="cold">{props.name}</p>
      <p>{isNaN(+parseFloat(average).toFixed(1)) ? "" : +parseFloat(average).toFixed(1)}</p>
      <p className="cold">{props.data[props.name]}</p>
    </div >
  );
}


function Clubb(props) {
  var thisClub = props.values.filter(value => value[1] === props.data.Club);
  if (thisClub.length === 0) {
    return
  }
  return (
    < div >
      <h4>{props.data.Club}</h4>
      <div className="container">
        <Metric data={props.data} name={"Club-Speed(mph)"} avg={thisClub.map(x => x[4])} />
        <Metric data={props.data} name={"Attack-Angle(deg)"} avg={thisClub.map(x => x[18])} />
        <Metric data={props.data} name={"Ball-Speed(mph)"} avg={thisClub.map(x => x[5])} />
        <Metric data={props.data} name={"Smash"} avg={thisClub.map(x => x[9])} />
        {/* <Metric data={props.data} name={"Factor(deg)"} avg={thisClub.map(x => x[4])} /> */}
        <Metric data={props.data} name={"Launch-Ang.-Spin-Rate(rpm)"} avg={thisClub.map(x => x[21])} />
        <Metric data={props.data} name={"Max-Height(meters)"} avg={thisClub.map(x => x[11])} />
        {/* <Metric data={props.data} name={"Land-Angle(deg)"} /> */}
        <Metric data={props.data} name={"Carry(meters)"} avg={thisClub.map(x => x[6])} />
        <div className='table'>
          {<table>
            <thead>
              <tr>
                {props.tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {thisClub.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>}
        </div>

      </div >
    </div >
  );
}



function App() {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  var clubs = new Set(values.map(v => v[1]));

  var data = {
    datasets:
      Array.from(clubs.values()).map(club => {
        var group = values.filter(v => v[1] === club)
        return {
          label: club,
          data: group.map(v => ({
            x: v[15],
            y: v[6],
          })),
        }
      }).filter(v => v !== [])
  };


  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };


  return (
    <div className="App">
      <div>
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        {console.log(tableRows)}
      </div>

      <Scatter options={options} data={data} />

      {/* {console.log(tour)} */}
      {tour.map(x => <Clubb key={x.Club} data={x} values={values} tableRows={tableRows} />)}
    </div>
  );
}


export default App;
