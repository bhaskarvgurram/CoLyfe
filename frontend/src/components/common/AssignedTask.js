import React, { Component } from 'react'
import { Avatar, Typography, Icon, Card, Select, Button } from 'antd'
import "./AssignedTask.css";
const { Text, Title } = Typography;
const { Option } = Select;


class AssignedTask extends Component {
    
    handleTaskClick = (_id) => {
        console.log(_id)
    }
    handleChange = (_id) => {
        console.log(_id)

    }
    handleRemind = () => {
        const { personId } = this.props.task;
        console.log(personId)
    }
   
    render() {
        const {handleMarkComplete, task} = this.props
        let people = JSON.parse(localStorage.getItem("personData"))
        console.log(people)
        return (
            <Card
                title={task.rotationType}
               
                extra={
                    <>
                        <Button style={{backgroundColor:"#D4A59A", color:"black"}} icon="bell" onClick={this.handleRemind}>Remind</Button> &nbsp;
                        {task.done ?
                            <><Icon type="check-circle" /> Completed</>
                            :
                            <Button type="primary" icon="check-circle" onClick={() => handleMarkComplete(task.id)}>Mark Complete</Button>}
                    </>
                }
                style={{ width: "100%", marginBottom: "20px" }}>
                <div >
                    <Avatar icon="user" style={{ marginRight: "5px" }} />
                    <Select defaultValue={task.personId} onChange={this.handleChange}>
                        {
                            people.map(d => (
                                <Option key={d.id} >{d.name}</Option>
                            ))
                        }
                    </Select>
                    &nbsp; has been assigned
                    <Title level={4} className="task_name" style={{fontSize:"16px"}}
                        onClick={() => this.handleTaskClick(task.id)}

                    >{task.taskName}</Title>
                </div>
            </Card >
        )
    }
}

export default AssignedTask;