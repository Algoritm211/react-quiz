import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends React.Component {

    state = {
        quizes: [], //{[id]: id, [name]: name}
        loading: true,
    }

    async componentDidMount() {

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

            this.setState({
                quizes: quizes,
                loading: false
            })
        } catch(e) {
            console.log(e);
        }
    }

    renderQuizes = () => {
        return this.state.quizes.map((quiz) => {
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

                    {this.state.loading 
                        ? <Loader />
                        : <ul> {this.renderQuizes()} </ul>
                    }
                    
                </div>
            </div>
        )
    }
}



export default QuizList