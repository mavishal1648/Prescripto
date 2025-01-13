import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import DoctorsList from './pages/admin/DoctorsList';
import AddDoctor from './pages/admin/AddDoctor';
import AllAppointments from './pages/admin/AllAppointments';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorAppointments from './pages/doctor/DoctorAppointments';

const App = () => {
  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Conditional routing based on the role
  if (token) {
    // Admin Routes
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/doctors-list' element={<DoctorsList />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
          </Routes>
        </div>
      </div>
    );
  } else if (dToken) {
    // Doctor Routes
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    // Login Page
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }
};

export default App;