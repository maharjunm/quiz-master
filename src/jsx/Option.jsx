import React, {Component} from "react";

class Option extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.value);
        this.state = {value: this.props.value || ""};
        this.setOption = this.setOption.bind(this);
        this.saveOption = this.saveOption.bind(this);
    }

    componentWillMount() {
        this.setState({value: this.props.value || ""});
        console.log("===>", this.props.value);
    }

    setOption(e) {
        this.setState({value: e.target.value});
    }

    saveOption() {
        console.log("in setOptions");
        console.log(this.props.number);
        this.props.setOptionsForSelectedQuestion(this.state.value, this.props.number);
    }


    render() {
        return (<div>
            {`Option ${this.props.number} :`}
            <input
                key={this.props.number}
                onChange={this.setOption}
                onBlur={this.saveOption}
                value={this.state.value}
                type="text"/>
        </div>);
    }
};

export default Option;
