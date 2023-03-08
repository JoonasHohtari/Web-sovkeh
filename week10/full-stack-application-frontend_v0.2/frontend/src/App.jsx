import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useCallback } from "react";

import Cities from "./cities/pages/Cities";
import AddCity from "./cities/pages/AddCity";
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Authenticate from "./users/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cities />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/cities/new" exact>
          <AddCity />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cities />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
