import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


import { Home, UserProfile, AdminHome, Authentication } from '../pages'
import { Layout, AdminLayout, AuthLayout } from '../layouts'

const App = () => {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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

      {/*enable the dev tools to handle the state library*/}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
