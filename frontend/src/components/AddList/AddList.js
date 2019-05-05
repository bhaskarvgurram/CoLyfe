import React, { Component } from "react";
import {
  Card,
  DatePicker,
  Input,
  Select,
  Button,
  Icon,
  Row,
  Modal,
  Col
} from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
//import "./AddList.css";

class AddList extends Component {
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
      }
    ],
    items: [
      {
        name: "",
        quantity: 0,
        people: []
      }
    ],
    title: "",
    // list: [{ listName: "" }, [{ name: "" }, { quantity: "" }, { people: [] }]],
    visible: false
  };

  // data = {
  //   title: "",
  //   items: [
  //     {
  //       name: "",
  //       quantity: 0,
  //       people: []
  //     }
  //   ]
  // }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const { items, title } = this.state;
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleChange = (e, i) => {
    // e.persist();
    const { items } = this.state;
    items[i][e.target.name] = e.target.value;
    this.setState({
      items
    });
  };

  handleRemove = i => {
    const { items } = this.state;
    items.splice(i, 1);
    this.setState({
      items
    });
  };

  handleAddItem = () => {
    let { items } = this.state;
    const newAddItem = {
      name: "",
      quntity: 0,
      people: []
    };
    items.push(newAddItem);
    this.setState({
      items
    });
  };

  handleSelectChange = (name, i) => {
    // const id = parseInt(name);
    // console.log(id);
    const { items, people } = this.state;
    const selectedIds = [];
    people.forEach(p => {
      if (name.indexOf(p.name) !== -1) selectedIds.push(p._id)
    })
    items[i]["people"] = selectedIds;
    this.setState({
      items
    })
  };

  handlTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  render() {
    const { items, people } = this.state;

    return (
      <Row>
        <Button style={{ float: "right" }} onClick={this.showModal}>
          <Icon type="plus" />
          Add List
        </Button>
        <Modal
          className="addListModal"
          title="Add List"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ height: "500px !important" }}
          width="700px"
        >
          <Row>
            {/* <Input placeholder="Item Name" style={{ marginBottom: "15px" }} />
            <div style={{ marginBottom: "5px" }}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={this.handleChange}
              >
                {people.map(p => (
                  <Option key={p.name}>{p.name}</Option>
                ))}
              </Select>
            </div> */}
            <Input
              placeholder="List Title"
              style={{ marginBottom: "15px" }}
              // value={list.listName}]
              onChange={this.handlTitleChange}
            />
            {items.map((item, i) => (
              <div style={{ marginTop: "10px" }} key={i}>
                <Row>
                  <Col span={15}>
                    <Input
                      prefix={<Icon type="shopping" />}
                      value={items[i].name}
                      name="name"
                      onChange={e => this.handleChange(e, i)}
                      placeholder="name"
                      style={{ marginRight: "10px" }}
                    />
                  </Col>
                  <Col span={1} />
                  <Col span={4}>
                    <Input
                      prefix={<Icon type="shopping-cart" />}
                      value={items[i].quantity}
                      name="quantity"
                      onChange={e => this.handleChange(e, i)}
                      placeholder="quantity"
                      style={{ marginRight: "10px" }}
                    />
                  </Col>
                  <Col span={1} />

                  <Col span={3}>
                    <Button
                      type="danger"
                      icon="minus"
                      ghost
                      onClick={() => this.handleRemove(i)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    span={20}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="add people"
                      onChange={(name) => this.handleSelectChange(name, i)}
                    >
                      {people.map(p => (
                        <Option key={p.name}>{p.name}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </div>
            ))}
          </Row>

          <div>
            <Button
              icon="shopping"
              style={{ width: "40%", marginTop: "10px" }}
              type="default"
              onClick={this.handleAddItem}
            >
              Add More
            </Button>
          </div>
        </Modal>
      </Row>
    );
  }
}
export default AddList;
