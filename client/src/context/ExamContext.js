import React, { useReducer } from 'react'
import {createContext} from 'react'
import { useExamsContext } from '../hooks/useExamsContext'
export const ExamsContext = createContext()
const initialState = {
  exams: [],
  exam: null,
  loading: false,
  initialExam: null, // new state variable to store initial exam data
  error: null,
};

export const examsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXAMS':
          return {
            ...state,
            exams: action.payload
          }

          case 'GET_EXAM':
            return {
              ...state,
              exam: action.payload
            };

      case 'CREATE_EXAM':
        return {
        exams: [action.payload, ...state.exams]
        }
        case 'DELETE_EXAM':
      return {
        ...state,
        exams: state.exams.filter((exam) => exam._id !== action.payload),
      }
      
      case 'SORT_EXAMS':
        return {
          ...state,
          exams: action.payload
        }
        
        case 'SET_EXAM':
          return {
            ...state,
            exam: action.payload,
          }

    default:
        return state
}
}
export const ExamsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(examsReducer,{ 
        exams:[],
        exam: {}
    });

    return (
        <ExamsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExamsContext.Provider>


    )

}