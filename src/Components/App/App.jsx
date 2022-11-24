
import { useContext} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenContext } from "../../Context/AuthContexet";
import All from "../All/All";
import Category from "../Category/Category";
import Details from "../Details/Details";
import Home from "../Home/Home";
import Login from "../Login/Login";
import MasterLayout from "../MasterLayout/MasterLayout";
import NotFound from "../NotFound/NotFound";
import Platform from "../Platform/Platform";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SortBy from "../SortBy/SortBy";


function App() {
 const {userData,saveUserData,logout} =useContext(AuthenContext);

  let routes = createBrowserRouter([
    {path:"/",element:<MasterLayout userData={userData} logout={logout}/>,errorElement:<NotFound/>,children:[
      {index:true,element:<ProtectedRoute userData={userData} ><Home/></ProtectedRoute>},
      {path:'all',element:<ProtectedRoute userData={userData}><All/></ProtectedRoute>},
      {path:'category/:genre',element:<ProtectedRoute userData={userData}><Category/></ProtectedRoute>},
      {path:'platform/:platform',element:<ProtectedRoute userData={userData}><Platform/></ProtectedRoute>},
      {path:'sortby/:sortby',element:<ProtectedRoute userData={userData}><SortBy/></ProtectedRoute>},
      {path:'gameDetails/:id',element:<ProtectedRoute userData={userData}><Details/></ProtectedRoute>},
      {path:'signup',element:<Register/>},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
  ]}
  ])
  return (
    <>
    <RouterProvider router={routes} />
    </>
  );
}

export default App;
