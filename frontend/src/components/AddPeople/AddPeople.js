import React, { Component } from 'react'
import { Table, Button, Icon, Modal, Form, Input, Alert } from 'antd';

const { Column } = Table;

const data = [{
  key: '1',
  email: 'gurram.bhaskar1608@gmail.com',
  name: 'Bhaskar Gurram',
},
{
  key: '2',
  email: 'gurram.bhaskar1608@gmail.com',
  name: 'Bhaskar Gurram',
},
{
  key: '3',
  email: 'gurram.bhaskar1608@gmail.com',
  name: 'Bhaskar Gurram',
}];

class AddPeople extends Component {
  state = {
    people: [],
    visible: false,
    error: ""
  }

  componentDidMount() {
    let people = [{
      _id: '1',
      email: 'gurram.bhaskar1608@gmail.com',
      name: 'Bhaskar Gurram',
      status: true
    },
    {
      _id: '2',
      email: 'gurram.bhaskar1608@gmail.com',
      name: 'Bhaskar Gurram',
      status: false
    },
    {
      _id: '3',
      email: 'gurram.bhaskar1608@gmail.com',
      name: 'Bhaskar Gurram',
      status: true
    }]

    people = people.map(p => ({
      key: p._id,
      ...p
    }))
    this.setState({
      people
    })
  }
  newPerson = {
    status: false
  }

  handleDelete = (_id) => {
    console.log(_id)
    let { people } = this.state;
    people = people.filter(p => p._id !== _id);
    this.setState({
      people
    })
  }
  toggleModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  handleChange = (e) => {
    this.newPerson[e.target.name] = e.target.value;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { people } = this.state;
        console.log('Received values of form: ', values);
        values.key = "4"
        people.push(values)
        this.setState({
          people,
          visible: false
        })
      }
    });
  }

  // handleSubmit = () => {
  //   console.log("this.newPerson", this.newPerson)
  //   let { people, error } = this.state;
  //   if (this.newPerson.name && this.newPerson.email) {
  //     this.newPerson.key = "4"
  //     people.push(this.newPerson)
  //     this.setState({
  //       people,
  //       visible: false
  //     })
  //   } else {
  //     error += "Please enter";
  //     error += !this.newPerson.name ? "name " : "";
  //     error += !this.newPerson.email ? "email " : ""
  //     this.setState({
  //       error
  //     })
  //   }
  // }
  render() {
    const { people, visible, error } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button onClick={this.toggleModal} icon="plus" style={{ display: "flex", marginLeft: "auto", marginBottom: "20px" }}>Add New</Button>
        <Table
          bordered
          pagination={false}
          dataSource={people}
        >
          <Column
            title="Name"
            dataIndex="name"
            key="name"
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(text, record) => {

              return text ?
                <><Icon type="check-circle" /> Joined</> :
                <><Icon type="info-circle" /> Waiting for confirmation</>
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button onClick={() => this.handleDelete(record._id)} type="danger" ghost>Remove</Button>
            )}
          />
        </Table>
        <Modal
          title="Add New"
          visible={visible}
          // onOk={this.handleSubmit}
          onCancel={this.toggleModal}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter name" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ type: "email", message: 'Enter valid email' }, { required: true, message: "Please input email!" }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Enter email" />
              )}
            </Form.Item>
            <Form.Item>

              <Button type="primary" htmlType="submit" className="login-form-button" style={{ float: "right" }}>
                Add
            </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedAddPeople = Form.create({ name: 'normal_login' })(AddPeople);
export default WrappedAddPeople