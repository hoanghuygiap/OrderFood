import React, {useState,useEffect}from 'react';
import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';
import '../styles/admin.css';

const AdminLayout = ({children}) => {

  const [sidebarOpen,setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 768){
        setSidebarOpen(false);//mobile view
      }else{
        setSidebarOpen(true);//destop
      }
    };
    handleResize();//initial check

    window.addEventListener('resize',handleResize);
    return () => window.removeEventListener('resize',handleResize);
  }, []);
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
     <div className = "d-flex">
          {sidebarOpen &&<AdminSideBar/>}
          <div id = "page-content-wrapper" className={`w-100 ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
            <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
            <div className = "container-fluid mt-4">
                {children}
            </div>
          </div>
     </div>
  );
};

export default AdminLayout;