import {Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import ProtectedRoute from "./components/routes/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import AiAssistant from "./pages/AiAssistant"
import Invoice from "./pages/Invoice"
import CreateRx from "./pages/CreateRx"
import AllPatients from "./pages/AllPatients"
import IPDRecords from "./pages/IpdRecords"
import Settings from "./pages/Settings"
import Templates from "./pages/Template"
import DropDownConfiguration from "./pages/DropDownConfiguration"
import Medicines from "./pages/Medicine"
import PatientQueue from "./pages/PatientQueue" 
import ConsultationForm from "./pages/Consult"
import DischargeSummaryForm from "./pages/Discharge"
import Messages from "./pages/Messages"
import AppointmentsDashboard from "./pages/Appointments"
import NotFoundPage from "./pages/PageNotFound"
import Socials from "./pages/Socials";
import Automation from "./pages/Automation"
import PatientHistoryPage from "./pages/PatientHistoryPage";
import UserManagementPage from "./pages/UserManagementPage"
import OnboardingPage from "./pages/OnBoardingPage"
import SignupStepsPage from "./pages/SignupStepsPage";
import StepTwoPage from "./pages/StepTwoPage"
import StepThreePage from "./pages/StepThreePage"
import StepFourPage from "./pages/StepFourPage"
import LoginPage from "./pages/LoginPage"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyAccountPage from "./pages/VerifyAccountPage"
import ResetPassword from "./pages/ResetPassword"
import PhoneLogin from "./pages/PhoneLogin"
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
const  App=() =>{


  return (
    <>
      
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
        <Route path="/phonelogin" element={<ProtectedRoute><PhoneLogin /></ProtectedRoute>} />
        <Route path="/verify" element={<ProtectedRoute><VerifyAccountPage /></ProtectedRoute>} />
        <Route path="/forgot" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path="/reset" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        <Route path="/resetsuccess" element={<ProtectedRoute><PasswordResetSuccess /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><SignupStepsPage /></ProtectedRoute>} />
        <Route path="/step2" element={<ProtectedRoute><StepTwoPage /></ProtectedRoute>} />
         <Route path="/step3" element={<ProtectedRoute><StepThreePage /></ProtectedRoute>} />
         <Route path="/step4" element={<ProtectedRoute><StepFourPage /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
        <Route path="/create-rx" element={<ProtectedRoute><CreateRx /></ProtectedRoute>} />
        <Route path="/all-patients" element={<ProtectedRoute><AllPatients /></ProtectedRoute>} />
        <Route path="/ipd" element={<ProtectedRoute><IPDRecords /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/template-library" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
        <Route path="/dropdown-library" element={<ProtectedRoute><DropDownConfiguration /></ProtectedRoute>} />
        <Route path="/medicine-library" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
        <Route path="/patient-queue" element={<ProtectedRoute><PatientQueue /></ProtectedRoute>} />
        <Route path={`/:id/consult`} element={<ProtectedRoute><ConsultationForm /></ProtectedRoute>} />
        <Route path="/view-history/:uid" element={<PatientHistoryPage />} />
        <Route path="/ipd/discharge" element={<ProtectedRoute><DischargeSummaryForm /></ProtectedRoute>} />
        <Route path='/messages' element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/social" element={<ProtectedRoute><Socials /></ProtectedRoute>} />
        <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>} />
        <Route path='/appointments' element={<ProtectedRoute><AppointmentsDashboard /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><UserManagementPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />

        
     </Routes>
      <ToastContainer />
      </>
  )
}

export default App
