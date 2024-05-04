import { Navigate, Route, Routes } from "react-router-dom";
import KanbanBoard from "./pages/KanbanBoard";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/board" element={<KanbanBoard />} />
        <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
