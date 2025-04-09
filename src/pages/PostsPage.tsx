import { Table, Button, Popconfirm, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { RootState } from "../app/store"
import {
  fetchPostsRequest,
  deletePostRequest,
} from "../features/posts/postsSlice"

const { Title } = Typography

const PostsPage = () => {
  const dispatch = useDispatch()
  const { list, loading } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    dispatch(fetchPostsRequest())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deletePostRequest(id))
  }

  const columns = [
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Автор",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Теги",
      dataIndex: "tagNames",
      key: "tags",
      render: (tags: string[]) => tags.join(", "),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Удалить пост?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Удалить</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Посты</Title>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default PostsPage
