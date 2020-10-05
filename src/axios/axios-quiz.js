import axios from 'axios'


export default axios.create({
    baseURL: 'https://react-quiz-9fec7.firebaseio.com/'
})