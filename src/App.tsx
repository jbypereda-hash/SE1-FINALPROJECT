import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
<<<<<<< HEAD
import { CoachesPage } from "./pages/CoachesPage";
import AS_PendingMemberships from "./pages/AS_PendingMemberships";
import AS_AdminDirectory from "./pages/AS_AdminDirectory";
=======
import AS_PendingMemberships from "./pages/AS_PendingMemberships/AS_PendingMemberships";
import AS_AdminDirectory from "./pages/AS_AdminDirectory/AS_AdminDirectory";
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
import AS_MemberDirectory from "./pages/AS_MemberDirectory";
import AS_CoachDirectory from "./pages/AS_CoachDirectory";
import AS_AddCoach from "./pages/AS_AddCoach";
import AS_EditCoach from "./pages/AS_EditCoach";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberships" element={<Memberships />} />
<<<<<<< HEAD
        <Route path="/coaches" element={<CoachesPage />} />
        // ADMIN SIDE
        <Route path="/coaches" element={<AS_PendingMemberships />} />{" "}
        //TEMPORARY
        <Route path="/AS_AdminDirectory" element={<AS_AdminDirectory />} />
=======
        
        // ADMIN SIDE
        <Route path="/AS_PendingMemberships" element={<AS_PendingMemberships />} />{" "} //TEMPORARY
        <Route path="/coaches" element={<AS_AdminDirectory />} />
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
        <Route path="/AS_MemberDirectory" element={<AS_MemberDirectory />} />
        <Route path="/AS_CoachDirectory" element={<AS_CoachDirectory />} />
        <Route path="/AS_AddCoach" element={<AS_AddCoach />} />
        <Route path="/AS_EditCoach" element={<AS_EditCoach />} />
      </Routes>
    </>
  );
};

export default App;
