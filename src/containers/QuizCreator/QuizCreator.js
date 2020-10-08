import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import classes from "./QuizCreator.module.css";
import { connect } from "react-redux";
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/createActions";

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends React.Component {
  state = {
    // quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  addQuestionHandler = (event) => {
      event.preventDefault()

      const {
          question,
          option1,
          option2,
          option3,
          option4,
      } = this.state.formControls

      const questionItem = {
        question: question.value,
        id: this.props.quiz.length + 1,
        rightAnswerId: this.state.rightAnswerId,
        answers: [
           {text: option1.value, id: option1.id},
           {text: option2.value, id: option2.id},
           {text: option3.value, id: option3.id},
           {text: option4.value, id: option4.id},
        ]
      }

      this.props.createQuizQuestion(questionItem)

      this.setState({
          isFormValid: false,
          rightAnswerId: 1,
          formControls: createFormControls(),
      })

  };

  createQuizHandler = (event) => {
      event.preventDefault()
        
        this.setState({
          quiz: [],
          isFormValid: false,
          rightAnswerId: 1,
          formControls: createFormControls(),
        })

        this.props.finishCreateQuiz()

      // axios.post('https://react-quiz-9fec7.firebaseio.com/quizes.json', this.state.quiz)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => console.log(error))

      // console.log(this.state.quiz);
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  сhangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.сhangeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr></hr> : null}
        </React.Fragment>
      );
    });
  };

  selectChangeHandler = (event) => {
    //   console.log(event.target.value);
    this.setState({
      rightAnswerId: parseInt(event.target.value, 10), //Приводим к числу
    });
  };

  render() {
    //   console.log(this.state);
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
