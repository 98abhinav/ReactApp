import React, { Component, Fragment } from 'react';
import Employee from './Employee';
import axios from "axios";
const config = require('../config.json');

export default class EmployeeAdmin extends Component {

  state = {
    newemployee: { 
      "name": "",
      "id": ""
    },
    employees: []
  }


  handleAddEmployee = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add employee endpoint here
    try {
      const params = {
        "name": this.state.newemployee.name
      };
      await axios.post(`${config.api.invokeUrl}/employees/${id}`, params);
      this.setState({ employees: [...this.state.employees, this.state.newemployee] });
      this.setState({ newemployee: { "name": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
    this.fetchEmployees();
  }

  handleUpdateEmployee = async (id, name) => {
    // add call to AWS API Gateway update employee endpoint here
    try {
      const params = {
        "id": id,
        "name": name
      };
      await axios.put(`${config.api.invokeUrl}/employees`, params);
      const employeeToUpdate = [...this.state.employees].find(employee => employee.id === id);
      const updatedEmployees = [...this.state.employees].filter(employee => employee.id !== id);
      employeeToUpdate.employeename = name;
      updatedEmployees.push(employeeToUpdate);
      this.setState({employees: updatedEmployees});
    }catch (err) {
      console.log(`Error updating employee: ${err}`);
    }
    this.fetchEmployees();
  }

  handleDeleteEmployee = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete employee endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/employees/${id}`);
      const updatedEmployees = [...this.state.employees].filter(employee => employee.id !== id);
      this.setState({employees: updatedEmployees});
    }catch (err) {
      console.log(`Unable to delete employee: ${err}`);
    }
  }

  fetchEmployees = async () => {
    // add call to AWS API Gateway to fetch employees here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/employees`);
      const employees = res.data;
      this.setState({ employees: employees });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddEmployeeNameChange = event => this.setState({ newemployee: { ...this.state.newemployee, "name": event.target.value } });
  onAddEmployeeIdChange = event => this.setState({ newemployee: { ...this.state.newemployee, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchEmployees();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Employee Admin</h1>
            <p className="subtitle is-5">Add and remove employee using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddEmployee(this.state.newemployee.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newemployee.name}
                        onChange={this.onAddEmployeeNameChange}
                      />
                    </div>
                    {/*<div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter id"
                        value={this.state.newemployee.id}
                        onChange={this.onAddEmployeeIdChange}
                      />
                    </div>*/}
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add Employee
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.employees.map((employee, index) => 
                        <Employee 
                          isAdmin={true}
                          handleUpdateEmployee={this.handleUpdateEmployee}
                          handleDeleteEmployee={this.handleDeleteEmployee} 
                          name={employee.name}
                          id={employee.id}
                          key={employee.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
