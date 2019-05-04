import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import OneTime from "../OneTime/OneTime";
import Daily from "../Daily/Daily";
import Weekly from "../Weekly/Weekly";
import Monthly from "../Monthly/Monthly";
import AddPeople from "../AddPeople/AddPeople";
import AddTask from "../AddTask/AddTask";
import AddList from "../AddList/AddList";

const { Header, Content, Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick = ({ key }) => {
    key = key === "home" ? "" : key;
    this.props.history.push(`/${key}`);
  };

  render() {
    const { content } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["home"]}
            mode="inline"
            onClick={this.handleClick}
          >
            <Menu.Item key="home">
              <Icon type="pie-chart" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="oneTime">
              <Icon type="exception" />
              <span>One Time</span>
            </Menu.Item>
            <Menu.Item key="daily">
              <Icon type="solution" />
              <span>Daily</span>
            </Menu.Item>
            <Menu.Item key="weekly">
              <Icon type="schedule" />
              <span>Weekly</span>
            </Menu.Item>
            <Menu.Item key="monthly">
              <Icon type="calendar" />
              <span>Monthly</span>
            </Menu.Item>
            <Menu.Item key="addPeople">
              <Icon type="user-add" />
              <span>Add People</span>
            </Menu.Item>
            <Menu.Item key="addList">
              <Icon type="plus-circle" />
              <span>Add List</span>
            </Menu.Item>
            <Menu.Item key="addTask">
              <Icon type="plus-circle" />
              <span>Add Task</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "16px 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Switch>
                <Route path="/oneTime" component={OneTime} />
                <Route path="/daily" component={Daily} />
                <Route path="/weekly" component={Weekly} />
                <Route path="/monthly" component={Monthly} />
                <Route path="/addPeople" component={AddPeople} />
                <Route path="/addList" component={AddList} />
                <Route path="/addTask" component={AddTask} />
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
