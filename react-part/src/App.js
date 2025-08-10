import "./App.css";
import SignUp from "./pages/website/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/website/Auth/Login";
import Header from "../src/components/header";
import Dashboard from "./pages/dashbord/components/dashbord";
import UsersTable from "./pages/dashbord/Users/UsersTable";
import UpdateUser from "./pages/dashbord/Users/UpdateUser";
import AddNewUser from "./pages/dashbord/Users/AddNewUser";
import { useLocation } from "react-router-dom";
import RequiredAuth from "./pages/website/Auth/RequiredAuth";
import PersistLogin from "./pages/website/Auth/PersistLogin";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("dashboard") && <Header />}

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<UsersTable />} />
               <Route path="users/create" element={<AddNewUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
