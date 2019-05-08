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
    item_sharedby: [
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
    order_details: [
      {
        item_name: "",
        item_qty: 0,
        item_sharedby: []
      }
    ],
    list_title: "",
    // list: [{ listName: "" }, [{ name: "" }, { quantity: "" }, { people: [] }]],
    visible: false,
    editItemVisible: false,
    addItemVisible: false,
    list: []
  };

  componentDidMount() {
    let home_id = "5ccd0f8ed0879970a0d4615a";

    axios
      .get(`/list/display/${home_id}`)
      .then(res => {
        if (res.status === 200) {
          console.log("get response data ", res.data);
          this.setState({
            list: res.data
          });
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  editItemVisibleModal = item => {
    const { list } = this.state;

    this.setState({
      editItemVisible: true,
      activeItem: item
    });
  };

  addItemVisibleModal = listId => {
    console.log("active list ", listId);
    this.setState({
      addItemVisible: true,
      activeListId: listId
    });
  };

  handleOk = e => {
    const { items, list_title, order_details } = this.state;
    this.setState({
      visible: false
    });
    let home_id = "5ccd0f8ed0879970a0d4615a";
    const data = {
      home_id,
      list_title,
      order_details
    };

    console.log(data);

    axios
      .post("/list/create", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);
          this.componentDidMount();
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      editItemVisible: false,
      addItemVisible: false
    });
  };

  handleChange = (e, i) => {
    // e.persist();
    const { items, order_details } = this.state;
    order_details[i][e.target.name] = e.target.value;
    this.setState({
      order_details
    });
  };

  handleRemove = i => {
    const { order_details } = this.state;
    order_details.splice(i, 1);
    this.setState({
      order_details
    });
  };

  handleAddItem = () => {
    let { items, order_details } = this.state;
    const newAddItem = {
      item_name: "",
      item_qty: 0,
      item_sharedby: []
    };
    console.log("push array", newAddItem);
    order_details.push(newAddItem);
    console.log("push array", order_details);

    this.setState({
      order_details
    });
  };

  handleSelectChange = (name, i) => {
    // const id = parseInt(name);
    // console.log(id);
    const { items, people, item_sharedby, order_details } = this.state;
    const selectedIds = [];
    item_sharedby.forEach((p, i) => {
      if (name.indexOf(p.name) !== -1)
        selectedIds.push({ user_id: p._id, user_name: p.name });
    });
    order_details[i]["item_sharedby"] = selectedIds;
    this.setState({
      order_details
    });
  };

  handlTitleChange = e => {
    this.setState({
      list_title: e.target.value
    });
  };

  deleteList = list_id => {
    console.log("delete list id", list_id);
    const data = {
      list_id
    };

    axios
      .post("/list/delete", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);
          this.componentDidMount();
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  removeItem = item_id => {
    console.log("delete item id", item_id);
    const data = {
      item_id
    };

    axios
      .post("/list/item/delete", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);
          this.componentDidMount();
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  editItem = () => {
    //console.log("edit item id", this.state.activeItem);

    let data = this.state.activeItem;
    console.log("final edit ", data);

    axios
      .post("/list/item/edit", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);

          this.componentDidMount();
          this.setState({
            editItemVisible: false
          });
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  handleEditSelectChange = name => {
    console.log(">>> ", name);
    // this.setState(prev => {
    //   let active = prev.activeItem;
    //   active.item_sharedby = name;
    //   return {
    //     activeItem: active
    //   };
    // });

    // const { item_sharedby, order_details } = this.state;
    // const selectedIds = [];
    // item_sharedby.forEach((p, i) => {
    //   if (name.indexOf(p.name) !== -1) selectedIds.push({ user_name: p.name });
    // });
    // order_details["item_sharedby"] = selectedIds;
    // this.setState({
    //   order_details
    // });
  };

  edithandleChange = e => {
    const { activeItem } = this.state;
    console.log(e.target.value);
    activeItem[e.target.name] = e.target.value;
    this.setState({
      activeItem
    });
    // console.log("final edit ", this.state.activeItem);
  };

  addItem = e => {
    let item = this.state.activeItem;
    console.log("final add item ", item);
    // console.log("final add list id ", this.state.activeListId);
    let list_id = this.state.activeListId;
    let data = {
      list_id,
      ...item
    };
    console.log("final add item ", data);

    axios
      .post("/list/item/add", data)
      .then(res => {
        if (res.status === 200) {
          console.log("response data ", res.data);

          this.componentDidMount();
          this.setState({
            addItemVisible: false,
            activeItem: {}
          });
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };

  render() {
    const {
      items,
      order_details,
      people,
      item_sharedby,
      item,
      members,
      list,
      activeItem
    } = this.state;

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
                name="list_title"
                onChange={this.handlTitleChange}
              />
              {order_details.map((item, i) => (
                <div style={{ marginTop: "10px" }} key={i}>
                  <Row>
                    <Col span={15}>
                      <Input
                        prefix={<Icon type="shopping" />}
                        value={order_details[i].item_name}
                        name="item_name"
                        onChange={e => this.handleChange(e, i)}
                        placeholder="name"
                        style={{ marginRight: "10px" }}
                      />
                    </Col>
                    <Col span={1} />
                    <Col span={4}>
                      <Input
                        prefix={<Icon type="shopping-cart" />}
                        value={order_details[i].item_qty}
                        name="item_qty"
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
                        {item_sharedby.map(p => (
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
              <Collapse
                onChange={callback}
                key={index}
                style={{ marginBottom: "10px" }}
              >
                <Panel
                  header={v.list_title}
                  key="1"
                  extra={
                    <Icon
                      type="delete"
                      onClick={() => this.deleteList(v._id)}
                    />
                  }
                >
                  <Table
                    bordered
                    pagination={false}
                    dataSource={v.order_details}
                  >
                    {/* render={(text, record) =>( */}
                    {/* record.item.map(n => */}
                    <Column title="Name" dataIndex="item_name" key="name" />

                    <Column
                      title="Quantity"
                      dataIndex="item_qty"
                      key="quantity"
                    />

                    <Column
                      title="Members"
                      key="members"
                      dataIndex="item_sharedby"
                      render={(text, record) =>
                        record.item_sharedby.map(n => <p> {n.user_name}</p>)
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
                          onClick={() => this.removeItem(record._id)}
                          type="danger"
                          ghost
                        >
                          Remove
                        </Button>
                      )}
                    />
                  </Table>

                  <Button
                    style={{ float: "left", margin: "5px" }}
                    onClick={this.showModal}
                    onClick={() => this.addItemVisibleModal(v._id)}
                  >
                    <Icon type="plus" />
                    Add Item
                  </Button>
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
            <Input
              name="item_name"
              value={activeItem.item_name}
              onChange={e => this.edithandleChange(e)}
              placeholder="name"
            />
            <Input
              name="item_qty"
              value={activeItem.item_qty}
              onChange={e => this.edithandleChange(e)}
              placeholder="quantity"
            />
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              defaultValue={
                activeItem.item_sharedby
                  ? activeItem.item_sharedby.map(member => member.user_name)
                  : []
              }
              onChange={this.handleEditSelectChange}
            >
              {item_sharedby.map(p => (
                <Option value={p.name}>{p.name}</Option>
              ))}
            </Select>
          </Row>
        </Modal>

        <Modal
          className="addItemModal"
          title="Add Item"
          visible={this.state.addItemVisible}
          onOk={() => this.addItem()}
          onCancel={this.handleCancel}
          style={{ height: "500px !important" }}
          width="700px"
        >
          <Row>
            <Input
              name="item_name"
              value={activeItem.item_name}
              onChange={e => this.edithandleChange(e)}
              placeholder="name"
            />
            <Input
              name="item_qty"
              value={activeItem.item_qty}
              onChange={e => this.edithandleChange(e)}
              placeholder="quantity"
            />
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              defaultValue={
                activeItem.item_sharedby
                  ? activeItem.item_sharedby.map(member => member.user_name)
                  : []
              }
              onChange={this.handleEditSelectChange}
            >
              {item_sharedby.map(p => (
                <Option value={p.name}>{p.name}</Option>
              ))}
            </Select>
          </Row>
        </Modal>
      </Row>
    );
  }
}
export default AddList;
