import { Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './layouts/MainLayout'
import SignUpPage from './pages/SignUpPage'
import AnalyzePage from './pages/AnalyzePage'
import ResultsPage from './pages/ResultsPage'
import AccountPage from './pages/AccountPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} >
          <Route index path='/' element={<LandingPage />} />
          <Route path='analyze' element={<AnalyzePage />} />
          <Route path='results' element={<ResultsPage />} />
        </Route>
        <Route>
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>
        <Route>
          <Route path='/user/:id' element={<AccountPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
