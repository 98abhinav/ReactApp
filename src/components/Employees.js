import React, { Component, Fragment } from 'react';
import Employee from './Employee';
import axios from "axios";
const config = require('../config.json');

export default class Employees extends Component {

  state = {
    newemployee: null,
    employees: []
  }

  fetchEmployees = async () => {
    // add call to AWS API Gateway to fetch employees here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/employees`);
      const employees = res.data;
      console.log(employees)
      this.setState({ employees: employees });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchEmployees();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Traveller Employee</h1>
            <p className="subtitle is-5">List of top employees from organization:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.employees && this.state.employees.length > 0
                      ? this.state.employees.map(employee => <Employee name={employee.name} id={employee.id} key={employee.id} />)
                      : <div className="tile notification is-warning">No employees available</div>
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
