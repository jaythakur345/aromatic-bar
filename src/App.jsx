import './App.css';
import { Routes, Route } from "react-router-dom";
import ReviewForm from './components/ReviewForm/ReviewForm';
import SuccessPage from './components/SuccessPage/SuccessPage';
import Dashbord from './components/Dashbord/Dashbord';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<ReviewForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/:id" element={<CustomerDetails />} />
      </Routes>
    </div>

  );
}

export default App;
