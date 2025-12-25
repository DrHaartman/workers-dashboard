import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer";
import EmployeeManager from "./components/EmployeeManager";

function App() {
  

  return (
    <div className="bg-white dark:bg-blue-100 min-h-screen">
      <Header />
      <Home />
      <EmployeeManager />
      <Footer />
    </div>
  )
}

export default App
