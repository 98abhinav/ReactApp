import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Employee extends Component {

  state = {
    isEditMode: false,
    updatedemployeename: this.props.name
  }

  handleEmployeeEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateEmployee(this.props.id, this.state.updatedemployeename);
  }

  onAddEmployeeNameChange = event => this.setState({ "updatedemployeename": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleEmployeeEdit} className="employee-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteEmployee(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit employee name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedemployeename}
                onChange={this.onAddEmployeeNameChange}
              />
              <p className="employee-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="employee-title">{ this.props.name }</p>
              <p className="employee-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
