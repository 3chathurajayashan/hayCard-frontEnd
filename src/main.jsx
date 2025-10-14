import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"; 
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './Components/Logins/Signin.jsx';
import Dashboard from './Components/DashBoard/Dashboard.jsx';
import AddDashboard from './Components/AddSampleDashboard/AddDashboard.jsx'
import EditSample from './Components/EditSampleDashboard/EditSample.jsx'


const router = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
  },
    {
    path:"/sign",
    element: <Signin />,
  },
    {
    path:"/dashboard",
    element: <Dashboard />,
  },
   {
    path:"/addDashboard",
    element: <AddDashboard />,
  },
   {
    path:"/editDashboard",
    element: <EditSample />,
  },
]);



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

