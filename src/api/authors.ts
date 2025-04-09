import axios from "./axiosInstance"

export interface Author {
  id: number
  fullName: string
  avatar: {
    id: number
    name: string
    url: string
  }
}

export const fetchAuthors = () => {
  return axios.get<Author[]>("/manage/authors")
}

export const addAuthor = (data: { fullName: string; avatarId: number }) => {
  return axios.post("/manage/authors/add", data)
}

export const editAuthor = (
  id: number,
  data: { fullName: string; avatarId: number }
) => {
  return axios.post("/manage/authors/edit", { id, ...data })
}

export const deleteAuthor = (id: number) => {
  return axios.delete("/manage/authors/remove", { data: { id } })
}
