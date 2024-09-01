import './App.css'
import ServiceWorker from './components/ServiceWorker';
import HomePage from './components/HomePage';
import TopCategory from './components/TopCategory';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ComplainCreation from './components/ComplainCreation';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";


function App(){
  return(
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" 
        element={
          <>
          <HomePage/>
          <TopCategory />
          </>
        }
        />

        <Route path="/ServiceWorker" 
        element={<ServiceWorker />} 
        />

        <Route path="/ComplainCreation" 
        element={<ComplainCreation/>} 
        />
        
      </Routes>
      <Footer/>
    </Router>
      

      
    </>
    )
  }

export default App;