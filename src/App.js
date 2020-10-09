import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/authActions';

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }
 
  render() {
    let routes = (
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/' exact component={QuizList} />
            <Redirect to={'/'} />
          </Switch>
    )
  
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path='/quiz-creator' component={QuizCreator} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/' exact component={QuizList} />
            <Route path='/logout' component={Logout}/>
            <Redirect to={'/'} />
        </Switch>
      )
    }
  
    return (
        <Layout>
          {routes}
        </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
