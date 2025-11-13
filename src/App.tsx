import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import { CoachesPage } from "./pages/CoachesPage";
import { ProfilePage } from "./pages/Profile";
import AS_PendingMemberships from "./pages/AS_PendingMemberships/AS_PendingMemberships";
import AS_AdminDirectory from "./pages/AS_AdminDirectory/AS_AdminDirectory";
import AS_MemberDirectory from "./pages/AS_MemberDirectory/AS_MemberDirectory";
import AS_CoachDirectory from "./pages/AS_CoachDirectory/AS_CoachDirectory";
import AS_AddCoach from "./pages/AS_AddCoach";
import AS_EditCoach from "./pages/AS_EditCoach";
import AuthModals from "./components/AuthModals";

const App = () => {
  return (
    <>
      <NavigationBar />
      <AuthModals />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/AS_AdminDirectory" element={<AS_AdminDirectory />} />
        <Route path="/AS_MemberDirectory" element={<AS_MemberDirectory />} />
        <Route path="/AS_CoachDirectory" element={<AS_CoachDirectory />} />
        <Route
          path="/AS_PendingMemberships"
          element={<AS_PendingMemberships />}
        />{" "}
        <Route path="/AS_AddCoach" element={<AS_AddCoach />} />
        <Route path="/AS_EditCoach" element={<AS_EditCoach />} />
      </Routes>
    </>
  );
};

export default App;

//commenting
