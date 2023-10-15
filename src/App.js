import './App.css';
import React from 'react';
import { useState } from "react";
import Papa from "papaparse";
import icon from './icon.png';
import Collapsible from 'react-collapsible';
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
    "Club-Speed (mph)": 113,
    "Attack-Angle (deg)": "-1.3°",
    "Ball-Speed (mph)": 167,
    "Smash": 1.48,
    "Factor (deg)": "10.9°",
    "Spin (rpm)": 2686,
    "Apex (m)": 29,
    "Land-Angle (deg)": "38°",
    "Carry (m)": 251
  },
  {
    "Club": "3 Wood",
    "Club-Speed (mph)": 107,
    "Attack-Angle (deg)": "-2.9°",
    "Ball-Speed (mph)": 158,
    "Smash": 1.48,
    "Factor (deg)": "9.2°",
    "Spin (rpm)": 3655,
    "Apex (m)": 27,
    "Land-Angle (deg)": "43°",
    "Carry (m)": 222
  },
  {
    "Club": "5 Wood",
    "Club-Speed (mph)": 103,
    "Attack-Angle (deg)": "-3.3°",
    "Ball-Speed (mph)": 152,
    "Smash": 1.47,
    "Factor (deg)": "9.4°",
    "Spin (rpm)": 4350,
    "Apex (m)": 28,
    "Land-Angle (deg)": "47°",
    "Carry (m)": 210
  },
  {
    "Club": "Hybrid",
    "Club-Speed (mph)": 100,
    "Attack-Angle (deg)": "-3.5°",
    "Ball-Speed (mph)": 146,
    "Smash": 1.46,
    "Factor (deg)": "10.2°",
    "Spin (rpm)": 4437,
    "Apex (m)": 27,
    "Land-Angle (deg)": "47°",
    "Carry (m)": 206
  },
  {
    "Club": "3 Iron",
    "Club-Speed (mph)": 98,
    "Attack-Angle (deg)": "-3.1°",
    "Ball-Speed (mph)": 142,
    "Smash": 1.45,
    "Factor (deg)": "10.4°",
    "Spin (rpm)": 4630,
    "Apex (m)": 25,
    "Land-Angle (deg)": "46°",
    "Carry (m)": 194
  },
  {
    "Club": "4 Iron",
    "Club-Speed (mph)": 96,
    "Attack-Angle (deg)": "-3.4°",
    "Ball-Speed (mph)": 137,
    "Smash": 1.43,
    "Factor (deg)": "11.0°",
    "Spin (rpm)": 4836,
    "Apex (m)": 26,
    "Land-Angle (deg)": "48°",
    "Carry (m)": 186
  },
  {
    "Club": "5 Iron",
    "Club-Speed (mph)": 94,
    "Attack-Angle (deg)": "-3.7°",
    "Ball-Speed (mph)": 132,
    "Smash": 1.41,
    "Factor (deg)": "12.1°",
    "Spin (rpm)": 5361,
    "Apex (m)": 28,
    "Land-Angle (deg)": "49°",
    "Carry (m)": 177
  },
  {
    "Club": "6 Iron",
    "Club-Speed (mph)": 92,
    "Attack-Angle (deg)": "-4.1°",
    "Ball-Speed (mph)": 127,
    "Smash": 1.38,
    "Factor (deg)": "14.1°",
    "Spin (rpm)": 6231,
    "Apex (m)": 27,
    "Land-Angle (deg)": "50°",
    "Carry (m)": 167
  },
  {
    "Club": "7 Iron",
    "Club-Speed (mph)": 90,
    "Attack-Angle (deg)": "-4.3°",
    "Ball-Speed (mph)": 120,
    "Smash": 1.33,
    "Factor (deg)": "16.3°",
    "Spin (rpm)": 7097,
    "Apex (m)": 29,
    "Land-Angle (deg)": "50°",
    "Carry (m)": 157
  },
  {
    "Club": "8 Iron",
    "Club-Speed (mph)": 87,
    "Attack-Angle (deg)": "-4.5°",
    "Ball-Speed (mph)": 115,
    "Smash": 1.32,
    "Factor (deg)": "18.1°",
    "Spin (rpm)": 7998,
    "Apex (m)": 28,
    "Land-Angle (deg)": "50°",
    "Carry (m)": 146
  },
  {
    "Club": "9 Iron",
    "Club-Speed (mph)": 85,
    "Attack-Angle (deg)": "-4.7°",
    "Ball-Speed (mph)": 109,
    "Smash": 1.28,
    "Factor (deg)": "20.4°",
    "Spin (rpm)": 8647,
    "Apex (m)": 27,
    "Land-Angle (deg)": "51°",
    "Carry (m)": 135
  },
  {
    "Club": "Pitching Wedge",
    "Club-Speed (mph)": 83,
    "Attack-Angle (deg)": "-5.0°",
    "Ball-Speed (mph)": 102,
    "Smash": 1.23,
    "Factor (deg)": "24.2°",
    "Spin (rpm)": 9304,
    "Apex (m)": 27,
    "Land-Angle (deg)": "52°",
    "Carry (m)": 124
  }
]

function Metric(props) {
  {
    var average = props.avg.map(v => v.replace("°", ""))
      .filter(v => v !== "")
      .reduce((p, c) => parseFloat(p) + parseFloat(c), 0) / props.avg.length
  }
  var pgaAvg;
  if (props.data !== undefined) {
    pgaAvg = props.data[props.name];
  } else {
    pgaAvg = "";
  }
  return (
    < div className="clubs" >
      <p className="cold">{props.name}</p>
      <p>{isNaN(+parseFloat(average).toFixed(1)) ? "" : +parseFloat(average).toFixed(1)}</p>
      <sup className="gray">{pgaAvg}</sup>
    </div >
  );
}

function Clubb(props) {
  // console.log(props.club);
  var thisClub = props.data.filter(v => v[1] === props.club);
  if (thisClub === "") {
    return;
  }
  // console.log(thisClub);
  var tourData = tour.find(v => v.Club === props.club);
  // console.log(tour);
  // console.log(tourData);

  // const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    < div className='cont2'>
      <div className='clubsymbol'>
        <b>{props.club.substring(0, 1)}</b>
      </div>
      <Collapsible trigger={props.club} open="true">
        <div className="container">
          <Metric data={tourData} name={"Carry (m)"} avg={thisClub.map(x => x[6])} />
          <Metric data={tourData} name={"Total (m)"} avg={thisClub.map(x => x[7])} />
          <Metric data={tourData} name={"Club-Speed (mph)"} avg={thisClub.map(x => x[4])} />
          <Metric data={tourData} name={"Attack-Angle (deg)"} avg={thisClub.map(x => x[18])} />
          <Metric data={tourData} name={"Ball-Speed (mph)"} avg={thisClub.map(x => x[5])} />
          <Metric data={tourData} name={"Smash"} avg={thisClub.map(x => x[9])} />
          {/* <Metric data={props.data} name={"Factor (deg)"} avg={thisClub.map(x => x[4])} /> */}
          <Metric data={tourData} name={"Spin (rpm)"} avg={thisClub.map(x => x[21])} />
          <Metric data={tourData} name={"Apex (m)"} avg={thisClub.map(x => x[11])} />
          {/* <Metric data={props.data} name={"Land-Angle (deg)"} /> */}
          <Collapsible trigger="Shots" className='select'>
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
          </Collapsible>
        </div >
        <p>{thisClub.length} shots</p>
      </Collapsible>
    </div >
  );
}

var avgOrTot = "Average";

function App() {

  const options = {
    plugins: {
      legend: {
        align: 'center',
        fullSize: false,
        labels: {
          boxWidth: 10,
          padding: 5,
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 300,
        ticks: {
          stepSize: 50,
        }
      },
      x: {
        ticks: {
          stepSize: 10,
        },
        min: -50,
        max: 50,
      },
    },
  };

  function avg(array) {
    var total = 0;
    var count = 0;
    array.forEach(function (item) {
      total += parseFloat(item);
      count++;
    });
    return total / count;
  }

  function std(array) {
    const n = array.length
    const mean = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / n
    return Math.log2(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n) ** 2
  }


  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [dataPlot, setDataPlot] = useState([]);

  var clubs = new Set(values.map(v => v[1]).filter(v => v !== ""));

  function getShots() {
    return Array.from(clubs.values()).map(club => {
      var group = values.filter(v => v[1] === club)
      return {
        label: club,
        data: group.map(v => ({
          x: v[15],
          y: v[6],
          pointStyle: "circle",
        })),
        pointRadius: 3,
      }
    });
  }

  function getAverageShots() {
    return Array.from(clubs.values()).map(club => {
      var group = values.filter(v => v[1] === club);
      var xStd = std(group.map(v => v[15]));
      var xAvg = avg(group.map(v => v[15]));
      var yAvg = avg(group.map(v => v[6]));
      return ({
        label: club,
        data: [{
          x: xAvg,
          y: yAvg,
        }],
        pointRadius: xStd,
        pointStyle: "circle",
      })
    })
  }

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
        setValues(valuesArray, setDataPlot({
          datasets: getShots(),
        }));
      },
    });
  };

  function handleClick() {
    // Changing state
    avgOrTot = avgOrTot === "All shots" ? "Average" : "All shots";
    setDataPlot({
      datasets: avgOrTot === "All shots" ? getShots() : getAverageShots(),
    });
  }

  return (
    <div className="App">
      <div>Golf analysis</div>
      <img src={icon} alt="golf analysis" className='icon' />
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
        {/* {console.log(tableRows)} */}
      </div>

      <div className='container-plot'>
        <div className='plot'>
          {values.length === 0 ? "" : <Scatter
            redraw="true"
            height={750}
            options={options}
            data={dataPlot}
          />}
        </div>
      </div>
      <button onClick={handleClick}>{avgOrTot}</button>

      <div className='holder'>
        {Array.from(new Set(values.map(v => v[1]).filter(v => v !== ""))).map(x => <Clubb key={x} club={x} data={values} tableRows={tableRows} />)}
      </div>
      {/* {tour.map(x => <Clubb key={x.Club} data={x} values={values} tableRows={tableRows} />)} */}
    </div>
  );
}


export default App;
