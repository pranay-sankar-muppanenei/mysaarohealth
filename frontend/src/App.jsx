import {Routes, Route} from "react-router-dom"


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

function App() {


  return (
    <>
      
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
        <Route path="*" element={<NotFoundPage />} />
     </Routes>
      </>
  )
}

export default App
