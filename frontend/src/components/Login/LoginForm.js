import React, { Component } from 'react'
import { Input, Button, Divider, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    state = {
        passcode: "",
        account_name: ""
    }

    handleChange = (e) => {
        this.setState({
            passcode: e.target.value
        })
    }
    handleLogin = () => {
        console.log(this.state.passcode)
        const { account_name, passcode } = this.state;
        axios({
            method: 'post',
            data: {
                account_name,
                passcode
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        this.props.history.push("/")
    }
    render() {
        const { passcode, } = this.state;
        const { toggleForms } = this.props;
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "40%", margin: "40px 30%" }}>
                <Input value={passcode} onChange={this.handleChange} placeholder="Please enter passcode" prefix={<Icon type="lock" />} style={{ textAlign: "center" }} />
                <Input value={passcode} onChange={this.handleChange} placeholder="Please enter passcode" prefix={<Icon type="lock" />} style={{ textAlign: "center" }} />
                <Button type="primary" ghost onClick={this.handleLogin} style={{ marginTop: "20px" }} icon="login">Enter</Button>
                <Divider />
                <Button onClick={toggleForms} icon="user">Register</Button>

            </div>
        )
    }
}

export default withRouter(LoginForm)