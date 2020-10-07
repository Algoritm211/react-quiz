import {combineReducers} from 'redux'
import quizReducer from './reducers/quiz'

export default combineReducers({
    quiz: quizReducer
})

