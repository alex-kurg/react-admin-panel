import { call, put, takeLatest } from "redux-saga/effects"
import { addPost, editPost } from "../../api/posts"
import {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  editPostRequest,
  editPostSuccess,
  editPostFailure,
} from "./postsSlice"

function* handleAddPost(action: ReturnType<typeof addPostRequest>): any {
  try {
    const { data } = yield call(addPost, action.payload)
    yield put(addPostSuccess(data))
  } catch (err: any) {
    yield put(addPostFailure(err.message))
  }
}

function* handleEditPost(action: ReturnType<typeof editPostRequest>): any {
  try {
    const { id, data } = action.payload
    const response = yield call(editPost, id, data)
    yield put(editPostSuccess(response.data))
  } catch (err: any) {
    yield put(editPostFailure(err.message))
  }
}

export default function* postsSaga() {
  yield takeLatest(addPostRequest.type, handleAddPost)
  yield takeLatest(editPostRequest.type, handleEditPost)
}
