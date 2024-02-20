import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8091/api/v1/employees";

//Now lets make a JS function and within that we will make a call to the REST API

export const listEmployees = () => {
    //Here we have returned a rest client call to make get employees rest api call
    return axios.get(REST_API_BASE_URL);
}

//since this function has got only statement as part of it, we can also write like this
export const listEmployees2 = () => axios.get(REST_API_BASE_URL);

//the employee object holds the employee form data
export const createEmployee = (employeeObject) => {
    //Here we have returned a rest client call to make get employees rest api call
    return axios.post(REST_API_BASE_URL, employeeObject);
}

export const getEmployee = (employeeId) => {
    //Here we have returned a rest client call to make get a particular employee with the help of id in rest api call
    return axios.get(REST_API_BASE_URL + '/' + employeeId);
}

export const updateEmployee = (employeeId, employee) => {
    //put is used to update
    return axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
}

export const deleteEmployee = (employeeId) => {
    //put is used to update
    return axios.delete(REST_API_BASE_URL + '/' + employeeId);
}