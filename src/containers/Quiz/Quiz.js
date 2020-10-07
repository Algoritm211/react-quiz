import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import classes from './Quiz.module.css'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById } from '../../store/actions/quizActions'

class Quiz extends React.Component {

    // state = {
    //     results: {}, // {[id]: 'success' or 'error'}
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null, // {[id]: 'success' 'error'}
    //     quiz: [],
    //     loading: true
    // }

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

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
        
        // console.log(`Quiz ID = ${this.props.match.params.id}`);
    }

    

    render() {
        console.log(this.props);
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>


                    {this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz 
                                results = {this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                                />
                            : <ActiveQuiz 
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                                /> 
                    }

                    

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, // {[id]: 'success' or 'error'}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // {[id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)