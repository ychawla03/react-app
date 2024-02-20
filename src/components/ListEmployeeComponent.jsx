import React, { useEffect } from 'react'
import { useState } from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../services/EmployeeService'

const ListEmployeeComponent = () => {

    //useState hook takes the parameter which is the initial value of the state variable
    //useSTate hook return us an array with exact two values
    //first is state variable and second is the function that updates the state variable
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate(); //JS function to a const variable

    //Remeber useState hook allows us to define state variables in a functional component and this is the syntax
    //to use useState hook- useState returns two values - one is state variables and second is the function that
    //returns the state variable

    //Next to make Rest API call or ajax call in functional components, we have to useEffect hook
    //useEffect takes two parameters - first is the callback function and second is the dependency list
    //so we are passing arrow function as a callback function and second is dependecy list and as of now, there is
    //no dependency list so we can keep empty

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        //we are calling listEmployees method from employee service
        //then accepts a promise object - response is a promise object
        listEmployees().then((response) => {
         setEmployees(response.data); // this is to set data in employees state variable
         //Now we have written the logic to store the response of rest api in a state variable
    }).catch(error => {
        console.error(error);
    })
    }
    function addNewEmployee(){
        //This function will navigate user to Add EMployee COmponent
        //when user will click on Add Employee button - user will be taken to add employee page
        navigator('/add-employee');
    }

    function updateEmployee(id){
        //useNavidator will help us to go to this component
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
    <><div className='container'>
    <h2 className='text-center'>List Of Employees</h2>
    <button className="btn btn-primary mb-2"
        onClick={addNewEmployee}>
        Add Employee
    </button>
    
    <table className='table table-striped table-bordered' >
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee E-mail Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {
                        //iterate over array above to display each object in a table row -
                        //in order to write Javascript code in JSX, we always have to use  open and close curly braces
                        //we can use map method  to iterate over an array and display each object
                        //we can pass employee object as a parameter to map function
                        //Now here employees state variable hold the response of the rest api
                        employees.map(employee =>
                            //The ellipsis (...) can also be used to spread the properties of an array into a 
                            //component. This can be useful when you want to pass a list of items to a component, 
                            //or when you want to pass items that are dynamic.

                            //each row should have a unique key
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => 
                                        updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => 
                                        removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>)
                        //Here we have written the code to iterate over array and display each object in the row
                    }
            </tbody>
    </table>
    </div>
    </>
  )
}

export default ListEmployeeComponent