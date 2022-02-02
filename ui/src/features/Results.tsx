import React, { useEffect, useState } from "react"
import { useAppSelector } from "../app/hooks";
import { toHhMmSs } from "../time";
import { selectResults } from "./resultsSlice";
import axios from 'axios';
import { RankedResult } from "./types";

const Results = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:5000/results`)
      .then(res => {
        setResults(res.data);
      })

  }, []);



  return (
    <div className='results' data-testid='results'>
      <table>
        <thead>
          <tr>
            <th>Bib</th>
            <th>Name</th>
            <th>Time</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {results.map((x: RankedResult) => (
            <tr key={x.bib}>
              <td data-testclass='bib'>{x.bib}</td>
              <td data-testclass='name'>{x.name}</td>
              <td data-testclass='time'>{toHhMmSs(x.time)}</td>
              <td data-testclass='rank'>{x.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Results;