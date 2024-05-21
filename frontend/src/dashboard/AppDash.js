import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./appDash.css";
import Home from "./pages/home/Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderHistory from "./pages/order/OrderHistory";
import Categorie from "./pages/categorie/categorie";
import OffrePage from "./pages/offre/OffrePage";
function AppDash() {
  return (
    <Router>
      <Topbar />
      <div className="containerDash">
        <Sidebar />
        <Switch>
          <Route path="/dashboard">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/pro">
            <Product />
          </Route>
          <Route path="/OrderHistory">
            <OrderHistory />
          </Route>
          <Route path="/categorie">
            <Categorie />
          </Route>
          <Route path="/offre">
            <OffrePage />
          </Route>
       
        </Switch>
      </div>
    </Router>
  );
}

export default AppDash;
