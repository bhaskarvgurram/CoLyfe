import React, { Component } from 'react'
import { Button, Input, Divider, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
    state = {
        home: "",
        people: [{
            name: "",
            email: ""
        }]
    }

    handleChange = (e, i) => {
        const { people } = this.state;
        people[i][e.target.name] = e.target.value;
        this.setState({
            people
        })
    }

    handleRemove = (i) => {
        const { people } = this.state
        people.splice(i, 1)
        this.setState({
            people
        })
    }

    handleAddPerson = () => {
        const { people } = this.state
        const newPerson = {
            name: "",
            email: ""
        }
        people.push(newPerson)
        this.setState({
            people
        })
    }

    handleHomeChange = (e) => {
        this.setState({
            home: e.target.value
        })
    }
    handleRegister = () => {
        console.log(this.state.people)
        console.log(this.state.home)
        this.props.history.push("/")
    }
    render() {
        const { people, home } = this.state;
        const { toggleForms } = this.props;
        return (
            <div style={{ margin: "40px 0" }}>
                <div>
                    <Input name="name" prefix={<Icon type="home" />} onChange={this.handleHomeChange} value={home} placeholder="Home name"/>
                </div>
                {
                    people.map((person, i) => (
                        <div style={{ display: "flex", marginTop: "10px" }} key={i}>
                            <Input prefix={<Icon type="user" />} value={people[i].name} name="name" onChange={(e) => this.handleChange(e, i)} placeholder="name" style={{ marginRight: "10px" }} />
                            <Input prefix={<Icon type="mail" />} value={people[i].email} name="email" type="email" onChange={(e) => this.handleChange(e, i)} placeholder="email" style={{ marginRight: "10px" }} />
                            <Button type="danger" icon="minus" ghost onClick={() => this.handleRemove(i)} />
                        </div>
                    ))
                }
                <div>
                    <Button icon="user-add" style={{ width: "40%", marginTop:"10px" }} type="default" onClick={this.handleAddPerson}>Add More</Button>
                </div>

                <Button type="primary" ghost onClick={this.handleRegister} style={{ width: "40%", marginTop: "40px" }} icon="user">Register</Button>
                <Divider />
                <p>Already have an account?</p>
                <Button type="default" onClick={toggleForms} style={{ width: "40%" }} icon="login">Login</Button>
            </div>
        )
    }
}

export default withRouter(RegisterForm);