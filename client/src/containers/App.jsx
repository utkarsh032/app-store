import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Home, UserProfile, AdminHome, Authentication } from '../pages'
import { Layout, AdminLayout, AuthLayout } from '../layouts'
import { auth } from '../config/firebase.config';



const App = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

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
