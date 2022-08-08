import { Route } from "react-router";
import { Navigate, Routes } from "react-router-dom";
import Footer from "./Component/Molecules/Core/Footer";
import ErrorModal from "./Component/Template/Modal/ErrorModal";
import MainPage from "./Component/Page/MainPage/MainPage";
import { useSocketConnect } from "./Hook/useSocket";
import { ChatRoom, Page, Project } from "./Component/Page";

const App: React.FC = () => {
  useSocketConnect();
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/sub" element={<Page />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Project" element={<Project />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      <Footer />
      <ErrorModal />
    </>
  );
};

export default App;
