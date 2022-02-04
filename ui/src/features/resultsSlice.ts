import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store';
import resultsApi from './resultsApi';
import { RankedResult } from './types';

export interface ResultsState {
  data: RankedResult[]
  status: string
}

export const INITIAL_STATE: ResultsState = {
  data: resultsApi.getResults(),
  status: 'pending'
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState: INITIAL_STATE,
  reducers: {
    getResults: (state, action) => {

      if(state.status === 'pending') {
        state.status = 'idle'
        state.data = action.payload
      }
    },
    getResultsLoading: (state, action) => {

      if(state.status === 'pending') {
        state.status = 'idle'
      }
    }
  }

})

export const selectResults = (state: RootState) => state.results

export const { getResults, getResultsLoading } = resultsSlice.actions

export const fetchResults = () => async (dispatch: any)  => {
  dispatch(getResultsLoading);
  fetch('http://localhost:5000/results')
  .then((res) => {
   res.json().then(data => {
     dispatch(getResults(data));
   })
  });
  

}

export default resultsSlice.reducer