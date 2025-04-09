import React from "react"

import { Button, Menu } from "antd"
import { Link } from "react-router-dom"

const DashboardPage = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "200px", background: "#f0f2f5", padding: "20px" }}>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/posts">Посты</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/authors">Авторы</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/tags">Теги</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div style={{ flex: 1, padding: "24px" }}>
        <h2>Панель администратора</h2>
        <Button type="primary" href="/posts/add">
          Добавить пост
        </Button>
      </div>
    </div>
  )
}

export default DashboardPage
