import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './Login/AdminLogin';
import TeacherDashboard from './Dashboard/TeacherDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import StudentDashBoard from './Dashboard/StudentDashBoard';
import Dashboard from './Dashboard/Dashboard';
import AddStudent from './Dashboard/AddStudent';
import AddClass from './Dashboard/AddClass';
import Class from './Dashboard/Class';
import ViewTeachers from './Dashboard/ViewTeachers';
import ViewStudents from './Dashboard/ViewStudents';
import AddAttendance from './Dashboard/AddAttendance';
import MarkAttendance from './Dashboard/MarkAttendance';
import Edit from './Dashboard/Edit';
import EditTeacher from './Dashboard/EditTeacher';
import EditStudent from './Dashboard/EditStudent';
import EditAttendance from './Dashboard/EditAttendance';
import EditClasses from './Dashboard/EditClasses';
import LoginStudent from './Login/LoginStudent';
import LoginTeacher from './Login/TeacherLogin';
import RegisterStudent from './Register/RegisterStudent';
import RegisterTeacher from './Register/RegisterTeacher';
import RegisterAdmin from './Register/RegisterAdmin';

function App ()  {
    return (
        <Router>
                
            
                <Routes>
                    <Route path="/" element={<LoginStudent />} />
                    <Route path="/Dashboard/TeacherDashboard" element={<TeacherDashboard />} />
                    <Route path="/Dashboard/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/Dashboard/StudentDashBoard" element={<StudentDashBoard />} />
                    <Route path="/Dashboard/Dashboard" element={<Dashboard />} />
                    <Route path="/Dashboard/AddStudent" element={<AddStudent />} />
                    <Route path="/Dashboard/AddAttendance" element={<AddAttendance />} />
                    <Route path="/Dashboard/ViewTeachers" element={<ViewTeachers />} />
                    <Route path="/Dashboard/ViewStudents" element={<ViewStudents />} />
                    <Route path="/Dashboard/Edit" element={<Edit />} />
                    <Route path="/Dashboard/EditTeacher" element={<EditTeacher />} />
                    <Route path="/Dashboard/EditStudent" element={<EditStudent />} />
                    <Route path="/Dashboard/EditAttendance" element={<EditAttendance />} />
                    <Route path="/Dashboard/MarkAttendance" element={<MarkAttendance />} />
                    <Route path="/login/AdminLogin" element={<AdminLogin />} />
                    <Route path="/Dashboard/AddClass" element={<AddClass />} />
                    <Route path="/Dashboard/Class" element={<Class />} />
                    <Route path="/Dashboard/EditClasses" element={<EditClasses />} />
                    <Route path="/login/teacher" element={<LoginTeacher />} />
                    <Route path="/register/student" element={<RegisterStudent />} />
                    <Route path="/register/teacher" element={<RegisterTeacher />} />
                    <Route path="/register/RegisterAdmin" element={<RegisterAdmin />} />
                </Routes>
        </Router>
    );
};

export default App;
