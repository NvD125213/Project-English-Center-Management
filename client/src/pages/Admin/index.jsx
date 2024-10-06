import React from 'react'
import AdminHeader from '../../components/AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../../components/AdminFooter'
import SideMenu from '../../components/SideMenu'

const Admin = () => {
  return (
    <div>
        <AdminHeader />
            <div className="SideMenuAndPageContent">
              <SideMenu />
              <Outlet />
            </div>
        <AdminFooter />
    </div>
  )
}

export default Admin
