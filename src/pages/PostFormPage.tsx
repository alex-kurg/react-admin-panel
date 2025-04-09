import { Form, Input, Button, Select, Spin, Typography, message } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { addPostRequest, editPostRequest } from '../features/posts/postsSlice'
import { useNavigate, useParams } from 'react-router-dom'

const { Title } = Typography

const PostFormPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { list, loading: postsLoading } = useSelector(
    (state: RootState) => state.posts
  )

  const { error } = useSelector((state: RootState) => state.posts)

  const handleSubmit = (values: any) => {
    setLoading(true)
    const { title, code, authorId, tagIds } = values

    if (id) {
      dispatch(
        editPostRequest({ id: Number(id), data: { title, code, authorId, tagIds } })
      )
    } else {
      dispatch(
        addPostRequest({ title, code, authorId, tagIds })
      )
    }
  }

  useEffect(() => {
    if (id) {
      const post = list.find((post) => post.id === Number(id))
      if (post) {
        form.setFieldsValue({
          title: post.title,
          code: post.code,
          authorId: post.authorName, 
          tagIds: post.tagNames,     
        })
      }
    }
  }, [id, form, list])

  if (postsLoading) return <Spin />

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>{id ? 'Редактирование поста' : 'Добавление поста'}</Title>
      {error && message.error(error)}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: '',
          code: '',
          authorId: '',
          tagIds: [],
        }}
      >
        <Form.Item
          name="title"
          label="Заголовок"
          rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="code"
          label="Код"
          rules={[{ required: true, message: 'Пожалуйста, введите код' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="authorId"
          label="Автор"
          rules={[{ required: true, message: 'Пожалуйста, выберите автора' }]}
        >
          <Select>
            <Select.Option value="1">Автор 1</Select.Option>
            <Select.Option value="2">Автор 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="tagIds"
          label="Теги"
          rules={[{ required: true, message: 'Пожалуйста, выберите хотя бы один тег' }]}
        >
          <Select mode="multiple">
            <Select.Option value="tag1">Тег 1</Select.Option>
            <Select.Option value="tag2">Тег 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            {id ? 'Сохранить' : 'Добавить'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PostFormPage
