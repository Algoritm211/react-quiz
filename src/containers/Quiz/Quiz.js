import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import classes from './Quiz.module.css'

class Quiz extends React.Component {

    state = {
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [
            {   
                question: 'Какого цвета небо?',
                rigthAnswerId: 2, 
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4},
                ]
            },
            {   
                question: 'В каком году основали Санкт-Петербург?',
                rigthAnswerId: 3, 
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1805', id: 4},
                ]
            }
    ]
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

        if (question.rigthAnswerId === answerId) {

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

    render() {
        // console.log(this.state);
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
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