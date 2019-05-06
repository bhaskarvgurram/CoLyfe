import React, { Component } from "react";
import axios from "axios";

import {
  Card,
  DatePicker,
  Input,
  Select,
  Button,
  Icon,
  Row,
  Modal,
  Col,
  Collapse,
  Table
} from "antd";
const { Column } = Table;
const { Option } = Select;
const Panel = Collapse.Panel;

//import "./AddList.css";

class AddList extends Component {
  state = {
    activeItem: {},
    people: [
      {
        name: "Hrishikesh",
        _id: "5ccd0f8ed0879970a0d4615b"
      },
      {
        name: "Atul Gutal",
        _id: "5ccd0f8ed0879970a0d4615d"
      },
      {
        name: "Pranav Dixit",
        _id: "5ccd0f8fd0879970a0d46160"
      },
      {
        name: "Rohit Sapkal",
        _id: "45ccd0f8ed0879970a0d4615e"
      },
      {
        name: "Sagar Bonde",
        _id: "5ccd0f8ed0879970a0d4615f"
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
    visible: false,
    editItemVisible: false,
    list: [
      {
        listName: "list 5",
        listId: 1,
        item: [
          {
            itemId: 11,
            name: "mango",
            quantity: 20,
            members: [{ name: "Bhaskar Gurram" }, { name: "Rohit" }]
          },
          {
            itemId: 12,

            name: "apple",
            quantity: 20,
            members: [{ name: "Atul Gutal" }, { name: "Sagar" }]
          }
        ]
      },
      {
        listName: "list 7",
        listId: "2",
        item: [
          {
            itemId: 13,

            name: "orange",
            quantity: 20,
            members: [{ name: "Bhaskar Gurram" }, { name: "Rohit" }]
          },
          {
            itemId: 14,

            name: "chikku",
            quantity: 20,
            members: [{ name: "Atul Gutal" }, { name: "Sagar" }]
          }
        ]
      }
    ]
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

  editItemVisibleModal = item => {
    const { list } = this.state;
    // console.log(id);
    // console.log(itemId);

    this.setState({
      editItemVisible: true,
      activeItem: item
    });
    // console.log("inside");
    // console.log(this.state.activeItemId);
  };

  handleOk = e => {
    const { items, title } = this.state;
    this.setState({
      visible: false
    });

    const data = {
      title,
      items
    };

    console.log(data);

    axios
      .post("http://10.0.0.198:5000/list/item/create", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      editItemVisible: false
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
      quantity: 0,
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
      if (name.indexOf(p.name) !== -1) selectedIds.push(p._id);
    });
    items[i]["people"] = selectedIds;
    this.setState({
      items
    });
  };

  handlTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  deleteList = id => {
    console.log("delete list id", id);
  };

  removeItem = id => {
    console.log("delete item id", id);
  };

  editItem = id => {
    console.log("edit item id", this.state.itemId);
  };

  handleEditSelectChange = name => {
    console.log(name);
  };
  render() {
    console.log("inside render");
    console.log("after setting state", this.state.activeItemId);
    const { items, people, item, members, list, activeItem } = this.state;

    function callback(key) {
      console.log(key);
    }

    return (
      <Row>
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
                        onChange={name => this.handleSelectChange(name, i)}
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
        <Row>
          <Col span={20}>
            {list.map((v, index) => (
              <Collapse onChange={callback} key={index}>
                <Panel
                  header={v.listName}
                  key="1"
                  extra={
                    <Icon
                      type="delete"
                      onClick={() => this.deleteList(v.listId)}
                    />
                  }
                >
                  <Table bordered pagination={false} dataSource={v.item}>
                    {/* render={(text, record) =>( */}
                    {/* record.item.map(n => */}
                    <Column title="Name" dataIndex="name" key="name" />

                    <Column
                      title="Quantity"
                      dataIndex="quantity"
                      key="quantity"
                    />

                    <Column
                      title="Members"
                      key="members"
                      dataIndex="members"
                      render={(text, record) =>
                        record.members.map(n => <p> {n.name}</p>)
                      }
                    />
                    <Column
                      title="Action"
                      key="actionEdit"
                      render={(text, record) => (
                        <Button
                          onClick={() => this.editItemVisibleModal(record)}
                          type="primary"
                          ghost
                        >
                          Edit
                        </Button>
                      )}
                    />
                    <Column
                      title="Action"
                      key="actionRemove"
                      dataIndex="itemId"
                      render={(text, record) => (
                        <Button
                          onClick={() => this.removeItem(record.itemId)}
                          type="danger"
                          ghost
                        >
                          Remove
                        </Button>
                      )}
                    />
                  </Table>
                </Panel>
              </Collapse>
            ))}
          </Col>
        </Row>

        <Modal
          className="editItemModal"
          title="Edit Item"
          visible={this.state.editItemVisible}
          onOk={() => this.editItem()}
          onCancel={this.handleCancel}
          style={{ height: "500px !important" }}
          width="700px"
        >
          <Row>
            <Input value={activeItem.name} />
            <Input value={activeItem.quantity} />
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              defaultValue={
                activeItem.members
                  ? activeItem.members.map(member => member.name)
                  : []
              }
              onChange={this.handleEditSelectChange}
            >
              {people.map(p => (
                <Option value={p.name}>{p.name}</Option>
              ))}
            </Select>
            {/* {this.state.list.map(l => {
              
              l.item.map(id => {
                if (id.itemId === this.state.activeItemId) {
                  console.log("inside if");
                  return (
                    <Input
                      placeholder="List Title"
                      style={{ marginBottom: "15px" }}
                      value={id.name}
                      onChange={this.handlTitleChange}
                    />
                  );
                }
              });
            })} */}
          </Row>
        </Modal>
      </Row>
    );
  }
}
export default AddList;
