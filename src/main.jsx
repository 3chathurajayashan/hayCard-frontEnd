import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"; 
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './Components/Logins/Signin.jsx';
import Dashboard from './Components/DashBoard/Dashboard.jsx';
import AddDashboard from './Components/AddSampleDashboard/AddDashboard.jsx'
import EditSample from './Components/EditSampleDashboard/EditSample.jsx'
import PreSign from './Components/BeforSign/PreSign.jsx'
import Guide from './Components/Guidelines/Guide.jsx'
import SampleDetails from './Components/SampleDetails/SampleDetails.jsx';
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
   {
    path:"/preSign",
    element: <PreSign />,
  },
  {
    path:"/guide",
    element: <Guide />,
  },
  {
    path:"/sample-details",
    element: <SampleDetails />,
  },
  
]);



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

