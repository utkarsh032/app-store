import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <p>AdminLayout header</p>
      <Outlet>AdminLayout outlet</Outlet>
      <p>AdminLayout footer</p>
    </div>
  )
}

export default AdminLayout
