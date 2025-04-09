import { Button, Form, Input, Typography, Alert } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { loginRequest } from "../features/auth/authSlice"

const { Title } = Typography

interface LoginFormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const onFinish = (values: LoginFormValues) => {
    dispatch(loginRequest(values))
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <Title level={2}>Вход</Title>

      {error && <Alert message={error} type="error" showIcon />}

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          initialValue="test@test.ru"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          initialValue="khro2ij3n2730"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Войти
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage
