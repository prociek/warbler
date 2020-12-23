import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import { setAuthHeader } from "../services/api";
import { setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

import Navbar from "./Navbar";
import Main from "./Main";

const App = () => {
  const store = configureStore();

  if (localStorage.jwtToken) {
    setAuthHeader(localStorage.jwtToken);
    try {
      const user = jwtDecode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(user));
    } catch (err) {
      store.dispatch(setCurrentUser({}));
    }
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
