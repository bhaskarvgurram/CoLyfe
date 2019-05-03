import React, { Component } from 'react'
import { Avatar, Typography, Icon, Card, Select, Button } from 'antd'
import "./AssignedTask.css";
const { Text, Title } = Typography;
const { Option } = Select;
const people = [
    {
        name: "Bhaskar Gurram",
        _id: "1"
    },
    {
        name: "Rohit",
        _id: "2"
    },
    {
        name: "Sagar",
        _id: "3"
    },
    {
        name: "Hrishikesh",
        _id: "4"
    },
    {
        name: "Vinit",
        _id: "5"
    },
]
class AssignedTask extends Component {
    state = {
        person: {
            name: "Bhaskar Gurram",
            _id: "1"
        },
        task: {
            name: "Cleaning",
            _id: "1",
            type: "Weekly Task",
            isComplete: false
        }

    }
    handleTaskClick = (_id) => {
        console.log(_id)
    }
    handleChange = (e) => {
        console.log(e)
    }
    handleRemind = () => {
        const { person } = this.state;
        console.log(person._id)
    }
    handleMarkComplete = () => {
        const { task } = this.state;
        task.isComplete = true;
        this.setState({
            task
        })
    }
    render() {
        const { person, task } = this.state;
        return (
            <Card
                title={task.type}
                actions={[
                    task.isComplete ?
                        <><Icon type="check-circle" /> Completed</>
                        :
                        <Button icon="check-circle" onClick={this.handleMarkComplete}>Mark Complete</Button>
                ]}
                extra={<Button icon="bell" onClick={this.handleRemind}>Remind</Button>}
                style={{ width: "50%" }}>
                <div >
                    <Avatar icon="user" style={{ marginRight: "5px" }} />
                    <Select defaultValue={person._id} onChange={this.handleChange}>
                        {
                            people.map(d => (
                                <Option key={d._id} >{d.name}</Option>
                            ))
                        }
                    </Select>
                    &nbsp; has been assigned
                    <Title level={4} className="task_name"
                        onClick={() => this.handleTaskClick(task._id)}

                    >{task.name}</Title>
                </div>
            </Card>
        )
    }
}

export default AssignedTask;