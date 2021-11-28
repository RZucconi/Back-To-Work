import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Message } from 'semantic-ui-react'

const validate = (formValues) => {
  const errors = {}

  if (!formValues.firstName) {
    errors.firstName = ' Veuillez saisir un prénom.'
  }
  
  if (!formValues.lastName) {
    errors.lastName = ' Veuillez saisir un nom.'
  }
  
  if (!formValues.email) {
    errors.email = ' Veuillez saisir un email.'
  }
  
  if (!formValues.password) {
    errors.password = ' Veuillez saisir un mot de passe.'
  }

  return errors
}

export default reduxForm({ form: 'subscribeForm', validate })(class SubscribeUser extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Message
          error
          content={error}
        />
      )
    }
  }

  renderInput = ({ input, type, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onCreateUser(formValues)
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="firstName" type="text" component={this.renderInput} label="Prénom" />
        <Field name="lastName" type="text" component={this.renderInput} label="Nom" />
        <Field name="email" type="email" component={this.renderInput} label="Email" />
        <Field name="password" type="password" component={this.renderInput} label="Mot de Passe" />
        <Button positive content="Souscrire" />
        <Link to="/"><Button content="Annuler" negative /></Link>
      </Form>
    )
  }
})