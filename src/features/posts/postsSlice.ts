import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
  id: number
  title: string
  content: string
}

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPostRequest: (state, action: PayloadAction<Post>) => {
      state.loading = true
    },
    addPostSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    addPostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    editPostRequest: (
      state,
      action: PayloadAction<{ id: number; data: Post }>
    ) => {
      state.loading = true
    },
    editPostSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      )
      if (index !== -1) {
        state.posts[index] = action.payload
      }
    },
    editPostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  editPostRequest,
  editPostSuccess,
  editPostFailure,
} = postsSlice.actions

export default postsSlice.reducer
