import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { JWT_TOKEN } from './constants';
import { ThemeProvider } from './contexts/themeContext'
import { AdminAuthProvider } from './contexts/adminAuthContext'
import Admin from './pages/Admin'
import AdminVisit from './pages/Admin/adminVisit'
import Home from './pages/Patient/Home'
import Login from './pages/Login'
import NotFound from './pages/Error/NotFound'
import Questionnaire from './pages/Patient/Questionnaire'
import Readiness from './pages/Patient/Readiness'
import HomePrescription from './pages/Patient/Prescription/index'
import { PatientAuthProvider } from './contexts/patientAuthContext'
import LoginWithId from './pages/Patient/LoginWithId';
import QuestionnaireHome from './pages/Patient/QuestionnaireHome';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error.message?.startsWith('Unexpected token \'U\', "Unauthorized" is not valid JSON')) {
                    return false
                }
                else if (failureCount < 2) return true
                else return false
            },
            onError: error => {
                if (error.message?.startsWith('Unexpected token \'U\', "Unauthorized" is not valid JSON')) {
                    localStorage.removeItem(JWT_TOKEN);
                    window.location.href = '/';
                }
            }
        },
    },
})

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/reg/:patient_id" element={<LoginWithId />} />
                        <Route element={<PatientAuthProvider />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/questionnaire" element={<QuestionnaireHome />} />
                            <Route path="/questionnaire/:category_id" element={<Questionnaire />} />
                            <Route path="/readiness" element={<Readiness />} />
                        </Route>
                        <Route path="/prescription/:patient_id" element={<HomePrescription />} />
                        {/* <Route path="/admin" element={<Admin />} >
                            <Route path=":visit_id" element={<AdminVisit />} />
                        </Route> */}
                        <Route element={<AdminAuthProvider />}>
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/admin/:visit_id" element={<AdminVisit />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}

export default App
