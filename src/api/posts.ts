import axios from "./axiosInstance"

export interface Post {
  id: number
  title: string
  code: string
  authorName: string
  tagNames: string[]
  createdAt: string
  updatedAt: string
}

export const fetchPosts = (page = 1, limit = 10) => {
  return axios.get<Post[]>("/manage/posts", {
    params: { page, limit },
  })
}

export const deletePost = (id: number) => {
  return axios.delete("/manage/posts/remove", {
    data: { id },
  })
}

export const addPost = (data: {
  title: string
  code: string
  authorId: number
  tagIds: number[]
}) => {
  return axios.post("/manage/posts/add", data)
}

export const editPost = (
  id: number,
  data: { title: string; code: string; authorId: number; tagIds: number[] }
) => {
  return axios.put(`/manage/posts/edit`, { id, ...data })
}
