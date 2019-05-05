import React, { Component } from 'react'
import { Card, DatePicker, Input, Select, Button, Icon, Checkbox } from 'antd';
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
    startNow: false,

  }
  data = {
    taskDuration: "once",
    taskName: "",
    startNow: false,
    selectedIds:  [],
    startDate: null
  }
  handleDateChange = (date, dateString) => {
    console.log(date, dateString)
    this.data.startDate = date;
  }

  toggleCheckbox = (e) => {
    this.setState({
      startNow: e.target.checked
    })
    this.data.startNow = e.target.checked
  }

  handlePeopleSelect = (name) => {
    console.log(name)
    const { people } = this.state;
    const selectedIds = [];
    people.forEach(p => {
      if (name.indexOf(p.name) !== -1) selectedIds.push(p._id)
    })
    console.log(selectedIds)
    this.data.selectedIds = selectedIds;
  }

  handleChange = (e) => {
    this.data.taskName = e.target.value
  }
  handleDurationSelect = (name) => {
    this.data.taskDuration = name;
  }

  handleSubmit = () => {
    console.log(this.data)
  }
  render() {
    const { people, startNow } = this.state
    return (
      <div>
        <Card
          title="New Task"
          style={{ width: "50%" }}
          actions={[
            <Button onClick={this.handleSubmit}>Create Task</Button>
          ]}
        >
          <div style={{ marginBottom: "15px" }}>

            <Input placeholder="Task name" onChange={this.handleChange} name="name" />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handlePeopleSelect}
            >
              {people.map(p => (
                <Option key={p.name}>{p.name}</Option>
              ))}
            </Select>
          </div>
          <div style={{ margin: "15px 0" }}>
            <Select defaultValue="once" onChange={this.handleDurationSelect} style={{ width: "100%" }}>
              <Option key="once">Once</Option>
              <Option key="daily">Daily</Option>
              <Option key="weekly">Weekly</Option>
              <Option key="monthly">Monthly</Option>
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox onChange={this.toggleCheckbox} value={startNow}>Start Now</Checkbox>
            <DatePicker onChange={this.handleDateChange} disabled={startNow} />
          </div>

        </Card>
      </div>
    )
  }
}
export default AddTask