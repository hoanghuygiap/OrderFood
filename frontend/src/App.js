import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/AddCategory";
import ManageCategory from "./pages/ManageCategory";
import AddFood from "./pages/AddFood";
import ManageFood from "./pages/ManageFood";
import SeachPage from "./pages/SearchPage";
import Register from "./components/Register";
import Login from "./components/Login";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import OrderNotConfirm from "./pages/OrderNotConfirm";
import OrderConfirmed from "./pages/OrderConfirmed";
import FoodPickup from "./pages/FoodPickup";
import FoodBeingPrepared from "./pages/FoodBeingPrepared";
import FoodDelivered from "./pages/FoodDelivered";
import FoodCancelled from "./pages/FoodCancelled";
import AllOrders from "./pages/AllOrders";
import OrderReport from "./pages/OrderReport";
import ViewFoodOrder from "./pages/ViewFoodOrder";
import SearchOrder from "./pages/SearchOrder";
import EditCategory from "./pages/EditCategory";
import EditFood from "./pages/EditFood";
import ManageUser from "./pages/ManageUser";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
          <Route path="/add-category" element={<AddCategory />}></Route>
          <Route path="/manage-category" element={<ManageCategory />}></Route>
          <Route path="/add-food" element={<AddFood />}></Route>
          <Route path="/manage-food" element={<ManageFood />}></Route>

          <Route
            path="/order-not-confirm"
            element={<OrderNotConfirm />}
          ></Route>
          <Route path="/orders-confirmed" element={<OrderConfirmed />}></Route>
          <Route path="/foodpickup" element={<FoodPickup />}></Route>
          <Route
            path="/food_being_prepared"
            element={<FoodBeingPrepared />}
          ></Route>
          <Route path="/food-delivered" element={<FoodDelivered />}></Route>
          <Route path="/food-cancelled" element={<FoodCancelled />}></Route>
          <Route path="/all-orders" element={<AllOrders />}></Route>
          <Route path="/order-report" element={<OrderReport />}></Route>
          <Route path="/search-order" element={<SearchOrder />}></Route>
          <Route path="/edit_category/:id" element={<EditCategory />}></Route>
          <Route path="/edit_food/:id" element={<EditFood />}></Route>
          <Route path="/manage-users" element={<ManageUser />}></Route>
          <Route
            path="/admin-view-order-detail/:order_number"
            element={<ViewFoodOrder />}
          ></Route>
          <Route path="/search" element={<SeachPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/food/:id" element={<FoodDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route path="/my-orders" element={<MyOrders />}></Route>
          <Route
            path="/order-details/:order_number"
            element={<OrderDetails />}
          ></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/changepassword" element={<ChangePassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
