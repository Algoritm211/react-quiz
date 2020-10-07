import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizes } from '../../store/actions/quizActions'

class QuizList extends React.Component {

    componentDidMount() {
        this.props.fetchQuizes()
        
    }

    renderQuizes = () => {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    {this.props.loading
                        ? <Loader />
                        : <ul> {this.renderQuizes()} </ul>
                    }
                    
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList)