import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import classes from './Quiz.module.css'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends React.Component {

    state = {
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [],
        loading: true
    }

    isQuizfinished = () =>  {
        return this.state.activeQuestion + 1 === this.state.quiz.length 
    }

    onAnswerClickHandler = (answerId) => {
        // console.log('answerId ', answerId);

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results


        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizfinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 700);
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            results: {},
            isFinished: false,
        })
    }

    async componentDidMount() {
        try {
            const quizId = this.props.match.params.id
            const response = await axios.get(`quizes/${quizId}.json`)
            console.log(response.data);
            const quiz = response.data

            this.setState({
                quiz: quiz,
                loading: false
            })
        } catch(e) {

        }
        // console.log(`Quiz ID = ${this.props.match.params.id}`);
    }

    

    render() {
        // console.log(this.state);
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>


                    {this.state.loading
                        ? <Loader />
                        : this.state.isFinished
                            ? <FinishedQuiz 
                                results = {this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                                />
                            : <ActiveQuiz 
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                                /> 
                    }

                    

                </div>
            </div>
        )
    }
}


export default Quiz