import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS } from './actionTypes'

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            
            // console.log(response.data);
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch(e) {
            // console.log(e);
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            console.log(response.data);
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
        // console.log(`Quiz ID = ${this.props.match.params.id}`);
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}


export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}


export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_START,
        error: e
    }
}

