import FooterComponent from "./components/FooterComponent"
import HeaderComponent from "./components/HeaderComponent"
import ListEmployeeComponent from "./components/ListEmployeeComponent"
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from "./components/EmployeeComponent"

function App() {
  //<> - this part is called as fragment
  return (
    //<> - this part is called as fragment
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* for url http://localhost:3000/ */}
        {/* //here we have configured the route for base url */}
        <Route path='/'element={ <ListEmployeeComponent />}></Route>
        {/* for url http://localhost:3000/employees */}
        <Route path='/employees' element={ <ListEmployeeComponent />}></Route>
        {/* for url http://localhost:3000/add-employee */}     
        <Route path='/add-employee' element={ <EmployeeComponent />}></Route>
        {/* for url http://localhost:3000/edit-employee/1 * below how we will pass id dynaically */}     
        <Route path='/edit-employee/:id' element={ <EmployeeComponent />}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
