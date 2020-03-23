import React, { useReducer,useContext, createContext} from 'react';
import {data} from '../mocks/data';
import {assets} from '../mocks/assets';
import {companies} from '../mocks/companyData';

//action types
const SET_DATA = 'SET_DATA';
const SET_COMPANIES = 'SET_COMPANIES';

const initialState = {
  data: data,
  assets: assets,
  companies: companies
}

const GlobalStateContext = createContext();

const globalStateReducer = (state, action) => {
	switch (action.type) {
		case SET_DATA:
			return {
				...state,
				template: {...action.payload},
			};
    case SET_COMPANIES:
      return {
        ...state,
        template: {...action.payload},
      };
		default: 
			return state;
	}
}

export const GlobalStateProvider = ({children}) => {
  //debugger;
	const [state, dispatch] = useReducer(globalStateReducer, initialState);
	return (
		<GlobalStateContext.Provider value={[state, dispatch]}>
			{children}
		</GlobalStateContext.Provider>
	)
}

export const useGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const setData = (data) => {
		dispatch({
			type: SET_DATA,
			payload: data
		});
	}

	return {
		setData,
		data: {...state.data},
		assets: [...state.assets],
		companies: [...state.companies]
	}
}