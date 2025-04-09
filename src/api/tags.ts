import axios from "./axiosInstance"

export interface Tag {
  id: number
  name: string
  code: string
}

export const fetchTags = () => {
  return axios.get<Tag[]>("/manage/tags")
}

export const addTag = (data: { name: string; code: string }) => {
  return axios.post("/manage/tags/add", data)
}

export const editTag = (id: number, data: { name: string; code: string }) => {
  return axios.post("/manage/tags/edit", { id, ...data })
}

export const deleteTag = (id: number) => {
  return axios.delete("/manage/tags/remove", { data: { id } })
}

export const deleteMultipleTags = (ids: number[]) => {
  return axios.post("/manage/tags/multiple-remove", { ids })
}
