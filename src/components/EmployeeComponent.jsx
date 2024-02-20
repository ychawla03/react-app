import {React, useState, useEffect} from 'react'

import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const {id} = useParams();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmail] = useState('')

    //Step 1
    //These are the object attributes to hold the validation error message with respect to state variables
    const [errors, setErrors] = useState({
        firstName:'',
        lastName: '',
        emailId:''
    })

    const navigator = useNavigate();

    //with useEffect, we always have first parameter as a arrow function and second is dependency
    //here there is a dependency called id
    useEffect(()=> {
        if(id){
            getEmployee(id).then((response) => {
                console.log("id is " + id);
                console.log(response.data.firstName);
                //we have to set data in these state variables
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.emailId);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [id])

    //lets write arrow function instead of javascript function

    const handleFirstName = (e) => { //remove the open and close curly braces from function definition
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    // function handleFirstName(e){
    //     //this is how we set the data in state variable firstName
    //     setFirstName(e.target.value);
    // }

    // function handleLastName(e){
    //     //this is how we set the data in state variable firstName
    //     setLastName(e.target.value);
    // }

    // function handleEmail(e){
    //     //this is how we set the data in state variable firstName
    //     setEmail(e.target.value);
    // }

    //so we have written the validation function that checks the form data and return the validation errors
    function validateForm(){
        let valid = true;
        //use spread operator to copy error object into the errorcopy 
        //spead operator is used to copy one object into another object
        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = "First Name is required"
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = "Last Name is required"
            valid = false;
        }

        if(emailId.trim()){
            errorsCopy.emailId = '';
        }else{
            errorsCopy.emailId = "E-mail is required"
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }


    function saveOrUpdateEmployee(e){
        //default data should not go while submitting the form
        //this is a javascript function to handle form submission event handler
        e.preventDefault();

        if(validateForm()){

        const employee = {firstName, lastName, emailId}
        console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch((error) => {
                    console.error(error);
                })
           }else{
                    //then method expects the promise object which contains the response
                    //search bootstrap validation error class - first link
                    //is invalid css class invalid feedback
                    createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
        }).catch((error) => {
            console.log(error);
        })
       }
    }
}



function pageTitle(){
    //use Params hook to get the data from the url
    if(id){
        return <h2 className='text-center'>Update Employee</h2>;        
    }else{
        return <h2 className='text-center'>Add Employee</h2>;
    }
}

    
  return (
    <div className='container'>
        <br /><br />
         {/* //we want to display the form in a container bootstrap css class */}
        <div className='row'>
           {/* //we want to display the form within a card that is why i am using bootstrap css class */}
           {/* card has total 12 columns we can use 6 and move 3 columsn to left and 3 to right*/}
           <div className='card col-md-6 offset-md-3 3'>
            {
                pageTitle()
            }
                {/* <h2 className='text-center'>Add Employee</h2> */}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb2'>
                                {/* value as state variable name - firstName */}
                                <label className='form-label'>First Name:</label>
                                    <input type="text" placeholder='Enter Employee First Name' 
                                    name="firstName" value={firstName}
                                    //form-control is bootrap css class
                                    //whn user enters some value - we will call handlefirstname function
                                    //to get value from this text box
                                    //Here we have to dynamically set the bootstrap css class based on the valiation
                                    //error then we will show invalid css class else fom-control 
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} 
                                    onChange={handleFirstName}
                                    //className='form-control' 
                                    //(e) => setFirstName(e.target.value);
                                    //this is how we can refactor the code - best practices
                                    //className='form-control' onChange={(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                    {/* //if this contains the error messagget then we will display the error message in the div */}
                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div> }
                            </div>

                            {/* //do the same for last name */}
                            <div className='form-group mb2'>
                                {/* value as state variable name - lastName */}
                                <label className='form-label'>Last Name:</label>
                                    <input type="text" placeholder='Enter Employee Last Name' 
                                    name="lastName" value={lastName}
                                    //form-control is bootrap css class
                                    //whn user enters some value - we will call handlefirstname function
                                    //to get value from this text box
                                    //className='form-control' 
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} 
                                    onChange={handleLastName}
                                    >
                                    </input>
                                    { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div> }
                            </div>

                            {/* //do the same for email */}
                            <div className='form-group mb2'>
                                {/* value as state variable name - email */}
                                <label className='form-label'>Email:</label>
                                {/* //if you want input type to password - *** will come */}
                                    <input type="text" placeholder='Enter Employee Email' 
                                    name="email" value={emailId}
                                    //form-control is bootrap css class
                                    //whn user enters some value - we will call handlefirstname function
                                    //to get value from this text box
                                    //className='form-control' 
                                    className={`form-control ${errors.emailId ? 'is-invalid' : ''}`} 
                                    onChange={handleEmail}
                                    >
                                    </input>
                                    { errors.emailId && <div className='invalid-feedback'>{errors.emailId}</div> }
                            </div>
                            <button className='btn btn-success' onClick = {saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>    
                </div>    
            </div>    
        </div>
  )
}

export default EmployeeComponent