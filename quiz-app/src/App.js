import {
  Routes,
  Route,
} from "react-router-dom";
import Test from "./components/quiz/Test";
import StartQuizPage from "./pages/StartQuizPage";
import SignInPage from "./pages/SignInPage";
import QuestionsPage from "./pages/QuestionsPage";
import AddQuestionPage from "./pages/AddQuestionsPage";
import EndQuestionPage from "./pages/EndQuizPage";
import ResultsPage from "./pages/ResultsPage";
import OfficersPage from "./pages/OfficersPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import ScorePage from "./pages/ScorePage";
function App() {
  return (
    <Routes>
      <Route exact path="/start" element={<StartQuizPage />} />
      <Route exact path="/signin" element={<SignInPage />} />
      <Route exact path="/questions" element={<QuestionsPage />} />
      <Route exact path="/add" element={<ProtectedRoute> <AddQuestionPage /> </ProtectedRoute>} />
      <Route exact path="/end" element={<EndQuestionPage />} />
      <Route exact path="/score/:id" element={<AdminRoutes> <ScorePage/> </AdminRoutes>} />
      <Route exact path="/results/:id" element={<ProtectedRoute> <ResultsPage /> </ProtectedRoute>} />
      <Route exact path="/officers" element={<AdminRoutes> <OfficersPage /> </AdminRoutes>} />
      <Route exact path="/" element={<AdminRoutes> <HomePage /> </AdminRoutes>} />
    </Routes>
  );
}
export default App;
