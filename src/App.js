import React, {Component} from 'react';
import './App.css';
import Question from "./jsx/Question";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {questions: [], selectedQuestion: {}, questionValue: "", questionOptions: [], optionValue: ""};
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteSelectedQuestion = this.deleteSelectedQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    deleteSelectedQuestion() {
        if (this.state.selectedQuestion && this.state.selectedQuestion.number) {
            let index = this.state.selectedQuestion.number;
            let questions = Object.assign(this.state.questions, []);
            if (index > 0) {
                questions.splice(index-1, 1);
                this.setState({questions: questions, selectedQuestion: {}});
            }
        }
    }

    getAllQuestions() {
        let questions = [];
        this.state.questions.map((question, index) => {
            questions.push(
                <div key={index + 1}><span
                    onClick={() => {
                        let selectedQuestion = {
                            value: question.value,
                            options: question.options,
                            number: index + 1
                        };
                        this.setState({
                            selectedQuestion: selectedQuestion,
                            questionValue: question.value,
                            questionOptions: question.options
                        });
                    }}> {index + 1}&nbsp; &nbsp; {question.value || "New Question"}</span></div>
            );
        });
        return questions;
    }

    addQuestion() {
        let questions = Object.assign(this.state.questions, []);
        questions.push({
            value: "",
            number: questions.length + 1,
            options: [{value: "", number: 1}, {value: "", number: 2}]
        });
        this.setState({questions: questions});
    }

    saveQuestion(selectedQuestion, options, questionValue) {
        let questions = Object.assign(this.state.questions, []);
        let index = questions.findIndex(question => question.number === selectedQuestion.number);
        let updatedQuestion = {
            value: questionValue,
            number: selectedQuestion.number,
            options: options
        };
        questions[index] = updatedQuestion;
        this.setState({questions: questions, selectedQuestion: updatedQuestion, questionOptions: options});
    }


    render() {
        return (
            <div className="full_question" >
                <div>
                    <div>
                        <p>Questions</p>
                        {this.getAllQuestions()}
                        <button onClick={this.addQuestion}>Add Question</button>
                        <button onClick={this.deleteSelectedQuestion}>Delete Question</button>
                    </div>
                </div>
                <Question saveQuestionToList={this.saveQuestion} questionValue={this.state.questionValue} selectedQuestion={this.state.selectedQuestion} options={this.state.questionOptions}/>
            </div>
        );
    }
}

export default App;
