import { call, put, takeLatest } from "redux-saga/effects"
import { login } from "../../api/auth"
import Cookies from "js-cookie"
import { loginRequest, loginSuccess, loginFailure } from "./authSlice"

interface LoginPayload {
  email: string
  password: string
}

function* handleLogin(action: ReturnType<typeof loginRequest>): any {
  try {
    const { email, password }: LoginPayload = action.payload
    const { data } = yield call(login, email, password)

    Cookies.set("access_token", data.access_token)
    Cookies.set("refresh_token", data.refresh_token)

    yield put(loginSuccess())
  } catch (err: any) {
    yield put(loginFailure(err.response?.data?.message || "Login failed"))
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin)
}
