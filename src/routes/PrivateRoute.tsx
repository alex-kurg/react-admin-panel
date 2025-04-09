import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { PropsWithChildren } from "react"
import Cookies from "js-cookie"

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const token = Cookies.get("access_token")
  const location = useLocation()

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default PrivateRoute
