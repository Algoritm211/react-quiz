import {combineReducers} from 'redux'
import authReducer from './reducers/auth'
import { createReducer } from './reducers/create'
import quizReducer from './reducers/quiz'

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
})

