import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Importa lo store Redux
import Topbar from "./components/Topbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";
import JobResults from "./components/JobResults"; // Importa il componente JobResults
import UserSearch from "./components/SearchProfile";
import ProfileSearched from "./components/ProfileSearched";
import Messaggistica from "./components/Messaggistica"; // Importa il componente Messaggistica

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lavoro" element={<JobResults />} /> {/* Modifica questa route */}
          <Route path="/search" element={<UserSearch />} />
          <Route path="/profile/:id" element={<ProfileSearched />} />
          <Route path="/messaggistica" element={<Messaggistica />} /> {/* Aggiungi la route per la messaggistica */}
          <Route
            path="/experiences"
            element={
              <div className="max-w-xl mx-auto mt-10 space-y-6">
                <ExperienceForm />
                <ExperienceList />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
