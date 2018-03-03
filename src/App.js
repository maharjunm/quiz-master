import React, {Component} from 'react';
import './App.css';
import Option from "./jsx/Option";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {questions: [], selectedQuestion: {}, questionValue: "", questionOptions: [], optionValue: ""};
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.selectedQuestion = this.selectedQuestion.bind(this);
        this.updateQuestionValue = this.updateQuestionValue.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.getOptionForSelectedQuestion = this.getOptionForSelectedQuestion.bind(this);
        this.setOption = this.setOption.bind(this);
        this.addOptions = this.addOptions.bind(this);
        this.deleteLastOption = this.deleteLastOption.bind(this);
        this.deleteSelectedQuestion = this.deleteSelectedQuestion.bind(this);
    }

    setOption(value, number) {
        let options = Object.assign(this.state.questionOptions, []);
        let index = options.findIndex(option => option.number === number);
        options[index] = {value: value, number: number};
        this.setState({questionOptions: options});
        this.setState({optionValue: value, selectedQuestion: this.state.selectedQuestion});
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

    addOptions() {
        let option = {value: "", number: this.state.questionOptions.length + 1};
        let options = Object.assign(this.state.questionOptions, []);
        if (options.length < 6) {
            options.push(option);
            this.setState({questionOptions: options});
        }
    }

    deleteLastOption() {
        let options = Object.assign(this.state.questionOptions, []);
        if (options.length > 2) {
            options.pop();
            this.setState({questionOptions: options});
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

    getOptionForSelectedQuestion() {
        let options = [];
        console.log("Before rendering");
        console.log(this.state.questionOptions);
        this.state.questionOptions.map((option, index) => {
            options.push(
                <Option setOptionsForSelectedQuestion={this.setOption} value={option.value}
                        number={option.number}></Option>
            )
        });
        return options;
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

    saveQuestion() {
        let questions = Object.assign(this.state.questions, []);
        let options = Object.assign(this.state.questionOptions, []);
        let index = questions.findIndex(question => question.number === this.state.selectedQuestion.number);
        let updatedQuestion = {
            value: this.state.questionValue,
            number: this.state.selectedQuestion.number,
            options: options
        };
        questions[index] = updatedQuestion;
        console.log(this.state.questionOptions);
        this.setState({questions: questions, selectedQuestion: updatedQuestion, questionOptions: options});
    }

    updateQuestionValue(e) {
        this.setState({questionValue: e.target.value});
    }

    selectedQuestion() {
        return this.state.selectedQuestion && this.state.selectedQuestion.number ?
            <div>
                <p>Design Question</p>
                <p>Question : <input type="text" value={this.state.questionValue} onChange={this.updateQuestionValue}/> </p>
                <p>Options: </p>
                {this.getOptionForSelectedQuestion()}
                <button onClick={this.addOptions}>Add</button>
                <button onClick={this.deleteLastOption}>Delete</button>
                <button onClick={this.saveQuestion}>Save</button>
            </div> : null;
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
                <div>
                    {this.selectedQuestion()}
                </div>
            </div>
        );
    }
}

export default App;
