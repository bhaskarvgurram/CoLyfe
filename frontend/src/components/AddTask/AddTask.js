import React, { Component } from 'react'
import { Card, DatePicker, Input, Select, Button, Icon } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

class AddTask extends Component {
  state = {
    people: [
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
    ],

  }
  handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  handleChange = (e) => {
    console.log(e)
  }
  render() {
    const { people } = this.state
    return (
      <div>
        <Card
          title="New Task"
          style={{ width: "50%" }}
          actions={[
            <Button>Create Task</Button>
          ]}
        >
          <div  style={{marginBottom:"15px"}}>

            <Input placeholder="Task name" onChange={this.handleChange} name="name" prefix={<Icon type="check-square" />} />
          </div>
          <div  style={{marginBottom:"15px"}}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChange}
            >
              {people.map(p => (
                <Option key={p.name}>{p.name}</Option>
              ))}
            </Select>
          </div>
          <div style={{margin:"15px 0"}}>
            <Select defaultValue="once" onChange={this.handleChange} style={{ width: "100%" }}>
              <Option key="once">Once</Option>
              <Option key="daily">Daily</Option>
              <Option key="weekly">Weekly</Option>
              <Option key="monthly">Monthly</Option>
            </Select>
          </div>

          <RangePicker onChange={this.handleChange} style={{ width: "100%" }} />

        </Card>
      </div>
    )
  }
}
export default AddTask