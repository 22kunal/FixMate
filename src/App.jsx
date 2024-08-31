import './App.css'
import HomePage from './components/HomePage';
import TopCategory from './components/TopCategory';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App(){
  return(
    <>
      <Navbar/>
      <HomePage/>
      <TopCategory />
      <Footer/>
    </>
    )
  }

export default App;