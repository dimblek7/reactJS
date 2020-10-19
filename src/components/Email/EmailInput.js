import React from "react";
import { emailRegEx } from "constants/regex";
import cx from 'classnames';

export default class EmailInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.email || [],
            value: "",
            error: null
        };
    }

    onBlur = () => {
        const value = this.state.value.trim();

        if (value && this.isValid(value)) {
            this.setState({
                items: [...this.state.items, this.state.value],
                value: ""
            }, () => this.props.getEmailId(this.props.label, this.state.items.toString()));
        }
    }

    handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            this.onBlur();
        }
    };

    handleChange = evt => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };

    handleDelete = item => {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        }, () => this.props.getEmailId(this.props.label, this.state.items.toString()));
    };

    handlePaste = evt => {
        evt.preventDefault();

        const paste = evt.clipboardData.getData("text");
        const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            const toBeAdded = emails.filter(email => this.isValid(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            }, () => this.props.getEmailId(this.props.label, this.state.items.toString()));
        }
    };

    isValid = (email) => {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ error });
            return false;
        }

        return true;
    }

    isInList = (email) => this.state.items.includes(email);

    isEmail = (email) => emailRegEx.test(email);

    render() {
        const {
            items,
            error,
            value,
        } = this.state;
        return (
            <>
                {items.map(item => (
                    <span className="tag-item d-inline-block mr-1 mb-1" key={item}>
                        {item}
                    </span>
                ))}

                <input
                    className={cx("multiemail-input", { error: !!error })}
                    value={value}
                    placeholder="Enter email address"
                    onBlur={this.onBlur}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                />
            </>
        );
    }
}
