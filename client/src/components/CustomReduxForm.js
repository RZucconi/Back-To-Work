import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Message } from 'semantic-ui-react';

export default function CustomReduxForm(props) {
  const validate = (formValues) => {
    const errors = {}

    props.fields.forEach((field) =>
    {
      if(field.require && ! formValues[field.name]) {
        errors[field.name] = `Veuillez saisir des données valides pour ${field.label}!`;
      }
    });

    return errors
  }

  const WrappedForm = reduxForm({ form: props.formName, validate })(class CustomForm extends Component {
    state = { user: this.props.stateFormData }
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

    getFormFieldValue = (field) => {
      if (this.state.user) {
        return this.state.user[field.input.name]
      }
      return
    }

    renderInput = (field) => {
      const className = `field ${field.meta.touched && field.meta.invalid ? 'error' : ''}`
      return (
        <div className={className}>
          <label>{field.label}</label>
          <input
            {...field.input}
            type={field.type}
            value={this.getFormFieldValue(field)}
            autoComplete="off"
          />
          {this.renderError(field.meta)}
        </div>
      )
    }
  
    renderFieldset = (field) => {
      return (
        <Field
          name={field.name}
          type={field.type}
          component={this.renderInput}
          label={field.label}
        />
      )
    }

    render() {
      const { displayCancelButton, cancelButtonPath, fields, handleSubmit } = this.props;
      return (
        <Form error={true} onSubmit={handleSubmit(props.onSubmit)}>
          {fields.map((field) => this.renderFieldset(field))}
          <br/>
          <Button positive content="Envoyer" />
          <Link style={{ display: displayCancelButton ? "true" : "none" }} to={cancelButtonPath} ><Button content="Annuler" negative /></Link>
        </Form>
      )
    }
  })

  return <WrappedForm {...props}/>
}