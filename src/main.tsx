import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store, history } from "./app/store"
import { ConnectedRouter } from "connected-react-router"
import App from "./App"
import "antd/dist/reset.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>
)
