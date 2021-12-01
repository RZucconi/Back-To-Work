import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { editUser } from '../../actions'
import CustomReduxForm from '../CustomReduxForm'

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { editUser })(class EditUser extends Component {
  getFields = () => {
    return [
      {
        name: 'firstName',
        type:  'text',
        label: 'Prénom',
        require: true
      },
      {
        name: 'lastName',
        type:  'text',
        label: 'Nom',
        require: true
      },
      {
        name: 'email',
        type:  'email',
        label: 'Email',
        require: true
      },
      {
        name: 'password',
        type:  'password',
        label: 'Mot de Passe',
        require: true
      }
    ]
  }

  onEditUser = async (formValues) => {
    await this.props.editUser(formValues)
  }

  render(){
    return(
      <>
        <Header content="modifier vos informations personnelles" />
        <CustomReduxForm 
          formName='editUserForm'
          fields={this.getFields()}
          onSubmit={this.onEditUser}
          stateFormData={this.props.user}
          cancelButtonPath="/"
          displayCancelButton
        />
      </>
    )
  }
})