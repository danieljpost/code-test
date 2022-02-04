import React, { useEffect } from "react"
import { useDispatch } from "react-redux"; //
import { useAppSelector } from "../app/hooks";
import { toHhMmSs } from "../time";
import { fetchResults, selectResults } from "./resultsSlice";
import { RankedResult } from "./types";

const Results = () => {

  const dispatch = useDispatch();
  const resultsState = useAppSelector(state => state.results);

  useEffect(() => {
    dispatch(fetchResults());
  },[dispatch, resultsState]);



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
          {resultsState.data.map((x: RankedResult) => (
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