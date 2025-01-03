import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import { AddDoctor, AllAppointments, Dashboard, DoctorsList } from './pages/index.js'
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx'
import DoctorProfile from './pages/doctor/DoctorProfile.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //Admin Routes
      {
        path: '/',
        element: <></>
      },
      {
        path: '/admin-dashboard',
        element: <Dashboard />
      },
      {
        path: '/all-appointments',
        element: <AllAppointments />
      }, 
      {
        path: '/add-doctor',
        element: <AddDoctor />
      },
      {
        path: '/doctor-list',
        element: <DoctorsList />
      },
      
      // Doctor Routes
      {
        path: "/doctor-dashboard",
        element: <DoctorDashboard />
      },
      {
        path: "/doctor-appointments",
        element: <DoctorAppointments />
      },
      {
        path: "/doctor-profile",
        element: <DoctorProfile />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
  </StrictMode>,
)
