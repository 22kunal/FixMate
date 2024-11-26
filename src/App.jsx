import './App.css'
import ServiceWorker from './components/ServiceWorker';
import HomePage from './components/HomePage';
import TopCategory from './components/TopCategory';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ComplainCreation from './components/ComplainCreation';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from './components/History';
import BillDetails from './components/BillDetails';
function App(){
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <TopCategory />
              </>
            }
          />
          <Route path="/ServiceWorker" element={<ServiceWorker />} />
          <Route path="/History" element={<History />} />
          <Route path="/ComplainCreation" element={<ComplainCreation />} />
          <Route path="/BillDetails" element={<BillDetails/>}/>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        limit={1}
        hideProgressBar={false}
        closeButton={false}
        position="top-center"
      />
    </>
  );
  }

export default App;