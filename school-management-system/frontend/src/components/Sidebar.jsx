import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBookOpen, 
  FaClipboardList,
  FaChartLine,
  FaUserPlus
} from 'react-icons/fa';

const Sidebar = () => {
  const { role } = useAuth();

  const menuItems = {
    student: [
      { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
      { path: '/my-marks', icon: <FaBookOpen />, label: 'My Marks' },
      { path: '/performance', icon: <FaChartLine />, label: 'Performance' },
    ],
    teacher: [
      { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
      { path: '/manage-marks', icon: <FaClipboardList />, label: 'Manage Marks' },
      { path: '/students-list', icon: <FaUserGraduate />, label: 'Students List' },
    ],
    admin: [
      { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
      { path: '/manage-students', icon: <FaUserGraduate />, label: 'Manage Students' },
      { path: '/manage-teachers', icon: <FaChalkboardTeacher />, label: 'Manage Teachers' },
      { path: '/add-user', icon: <FaUserPlus />, label: 'Add User' },
    ]
  };

  const items = menuItems[role] || menuItems.student;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav className="space-y-2">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive ? 'bg-primary' : 'hover:bg-gray-800'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;