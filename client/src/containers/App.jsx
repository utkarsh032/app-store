import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Home, UserProfile, AdminHome, Authentication } from '../pages'
import { Layout, AdminLayout, AuthLayout } from '../layouts'



const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/*client */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:uid' element={<UserProfile />} />
          </Route>

          {/*admin */}
          <Route path='/admin/*' element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
          </Route>

          {/*user*/}
          <Route path='/auth/*' element={<AuthLayout />}>
            <Route index element={<Authentication />} />
          </Route>


        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
