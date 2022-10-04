import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/Auth/Login";
import Register from "Pages/Auth/Register";
import Home from "Pages/Home/Home";
import Product from "Pages/Home/Product";
import Category from "Pages/Home/Category";
import Brand from "Pages/Home/Brand";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {
            // login
          }
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>
          <PrivateRoute path="/home" exact>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/products" exact>
            <Product />
          </PrivateRoute>
          <PrivateRoute path="/categories" exact>
            <Category />
          </PrivateRoute>
          <PrivateRoute path="/Brands" exact>
            <Brand />
          </PrivateRoute>
          <PrivateRoute path="/cars" exact>
            <Brand />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
