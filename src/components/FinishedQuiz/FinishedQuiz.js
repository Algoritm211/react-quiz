import React from 'react'
import Button from '../UI/Button/Button'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = (props) => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)


    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]] //берем класс success или error, в строке props.results[quizItem.id] он известен
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>

            <p>
                Правильно {successCount} из {props.quiz.length}
            </p>
            <div>
                <Button onClick={props.onRetry} type="primary">
                    Повторить
                </Button>
                <Button onClick={() => {}} type="success">
                    Перейти в список тестов
                </Button>
            </div>
        </div>
    )
}

export default FinishedQuiz