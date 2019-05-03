import React, { Component } from 'react'
import { Input, Button, Divider, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        code: ""
    }

    handleChange = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    handleLogin = () => {
        console.log(this.state.code)
        this.props.history.push("/")
    }
    render() {
        const { code } = this.state;
        const { toggleForms } = this.props;
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "40%", margin: "40px 30%" }}>
                <Input value={code} onChange={this.handleChange} placeholder="Please enter code" prefix={<Icon type="lock" />} style={{ textAlign: "center" }} />
                <Button type="primary" ghost onClick={this.handleLogin} style={{ marginTop: "20px" }} icon="login">Enter</Button>
                <Divider />
                <Button onClick={toggleForms} icon="user">Register</Button>

            </div>
        )
    }
}

export default withRouter(LoginForm)