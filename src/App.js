import './App.css';
import './index.css';
import Navbar from './components/bar/superadmin/Navbar';
import MySidebar from './components/bar/superadmin/MySidebar';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from './pages/superadmin/Dashboard';
import MyDashboard from './pages/customeradmin/Dashboard';
import CustomerUserDashboard from './pages/customeruser/Dashboard';
import Tables from './pages/superadmin/Tables';
import QuestionnaireBanks from './pages/superadmin/questionnaireBanks';
import Create from './pages/superadmin/questionnaireBanks/create';
import Category from './pages/superadmin/questionBanks/category';
import QuestionnaireBankView from './pages/superadmin/questionnaireBanks/view';
import QuestionnaireView from './pages/customeradmin/questionnaire/view';
import Show from './pages/customeradmin/questionnaire';
import CustomerUserQuestionnaires from './pages/customeruser/questionnaire/sample';
import CustomerAdminSidebar from './components/bar/customeradmin/CustomerAdminSidebar';
import SingleQuestionnaire from './pages/customeradmin/questionnaire/singleQuestionnaire';
import CustomerAdmins from './pages/superadmin/customeradmins';
import CustomerUserSidebar from './components/bar/customeruser/CustomerUserSidebar';
import FeedbackForm from './pages/customeruser/feedback/feedbackform';
import CustomerUsers from './pages/customeradmin/customerusers';
import CreateCustomerUser from './pages/customeradmin/customerusers/create';
import Login from './pages/customeradmin/customerusers/login';
import CreateQuestion from './pages/customeradmin/questions/create';




function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const userRole = "customeradmin";

  // Rendering sidebar based on user role
  const renderSidebar = () => {
    if (userRole === "superadmin") {
      return <MySidebar isSidebar={isSidebar} />;
    } else if (userRole === "customeradmin") {
      return <CustomerAdminSidebar isSidebar={isSidebar} />;
    } else if (userRole === "customeruser") {
      return <CustomerUserSidebar isSidebar={isSidebar} />;
    }
    return null; // Default case
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <MySidebar isSidebar={isSidebar} /> */}
          {renderSidebar()}
          <main className="content">
            <Navbar setIsSidebar={setIsSidebar} />

            {/* Super Admin Routes */}
            {userRole === "superadmin" && (
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/questionnairebanks" element={<QuestionnaireBanks />} />
                <Route path="/questionnairebanks/create" element={<Create />} />
                <Route path="/questionnairebank/:id" element={<QuestionnaireBankView />} />
                <Route path="/questionbanks/create" element={<Category />} />
                <Route path="/customeradmins" element={<CustomerAdmins />} />
              </Routes>
            )}


            {/* Customer Admin Routes */}
            {userRole === "customeradmin" && (
              <Routes>
                <Route path="/customeradmin/dashboard" element={<MyDashboard />} />
                <Route path="customeradmin/questionnaires" element={<Show />} />
                <Route path="/questionnaire/:id" element={<SingleQuestionnaire />} />
                <Route path="/questions/create" element={<CreateQuestion />} />
                <Route path="/customerusers" element={<CustomerUsers />} />
                <Route path="/customeruser/create" element={<CreateCustomerUser />} />
              </Routes>

            )}

            {/* Customer User Routes */}
            {userRole === "customeruser" && (
              <Routes>
                <Route path="/customeruser/dashboard" element={<CustomerUserDashboard />} />
                <Route path="customeruser/questionnaires" element={<CustomerUserQuestionnaires />} />
                <Route path="/questionnaire/:id" element={<FeedbackForm />} />
                <Route path="/" element={<Login />} />
              </Routes>

            )}



            {/* <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} /> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
