import React, {Component} from "react";
import Option from "./Option";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {options: this.props.options || [], selectedQuestion: this.props.selectedQuestion || {},
                questionValue: this.props.questionValue || "", optionValue: ""};
        this.setOption = this.setOption.bind(this);
        this.addOptions = this.addOptions.bind(this);
        this.updateQuestionValue = this.updateQuestionValue.bind(this);
        this.getOptionForSelectedQuestion = this.getOptionForSelectedQuestion.bind(this);
        this.deleteLastOption = this.deleteLastOption.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedQuestion: nextProps.selectedQuestion, options: nextProps.options});
        this.setState({questionValue: nextProps.questionValue, optionValue: nextProps.optionValue});
    }

    setOption(value, number) {
        let options = Object.assign(this.state.options, []);
        let index = options.findIndex(option => option.number === number);
        options[index] = {value: value, number: number};
        this.setState({options: options});
        this.setState({optionValue: value, selectedQuestion: this.state.selectedQuestion});
    }

    addOptions() {
        let option = {value: "", number: this.state.options.length + 1};
        let options = Object.assign(this.state.options, []);
        if (options.length < 6) {
            options.push(option);
            this.setState({options: options});
        }
    }

    updateQuestionValue(e) {
        this.setState({questionValue: e.target.value});
    }


    getOptionForSelectedQuestion() {
        let options = [];
        this.state.options.map((option, index) => {
            options.push(
                <Option setOptionsForSelectedQuestion={this.setOption} value={option.value}
                        number={option.number}></Option>
            )
        });
        return options;
    }

    deleteLastOption() {
        let options = Object.assign(this.state.options, []);
        if (options.length > 2) {
            options.pop();
            this.setState({options: options});
        }
    }

    saveQuestion() {
        this.props.saveQuestionToList(this.state.selectedQuestion, this.state.options, this.state.questionValue);
    }

    render() {
        return this.state.selectedQuestion && this.state.selectedQuestion.number ?(
            <div>
                <p>Design Question</p>
                <p>Question : <input type="text" value={this.state.questionValue} onChange={this.updateQuestionValue}/>
                </p>
                <p>Options: </p>
                {this.getOptionForSelectedQuestion()}
                <button onClick={this.addOptions}>Add</button>
                <button onClick={this.deleteLastOption}>Delete</button>
                <button onClick={this.saveQuestion}>Save</button>
            </div>) : null;
    }
}

export default Question;
