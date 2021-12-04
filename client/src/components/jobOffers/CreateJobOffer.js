import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { createJobOffer } from '../../actions';
import history from '../../history';
import CustomReduxForm from '../CustomReduxForm';

export default connect(null, { createJobOffer })(
  class CreateJobOffer extends Component {
    getFields = () => {
      return [
        {
          name: 'source',
          type: 'text',
          label: "Origine de l'annonce: *",
          require: true,
        },
        {
          name: 'companyName',
          type: 'text',
          label: "Nom de l'entreprise: *",
          require: true,
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: "Intitulé de l'offre: *",
          require: true,
        },
        {
          name: 'contactName',
          type: 'text',
          label: 'Nom du contact:',
          require: false,
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Adresse mail du contact:',
          require: false,
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Téléphone fixe du contact:',
          require: false,
        },
        {
          name: 'contactCellphone',
          type: 'text',
          label: 'Portable du contact:',
          require: false,
        },
        {
          name: 'comment',
          type: 'text',
          label: 'Commentaire:',
          require: false,
        },
        {
          name: 'contractType',
          type: 'text',
          label: 'Type de Contrat: *',
          require: true,
        },
      ];
    };

    onCreateJobOffer = async (formValues) => {
      await this.props.createJobOffer(formValues);
      history.push('/');
    };

    render() {
      return (
        <>
          <Header content="Créer une nouvelle offre d'emploi:" />
          <CustomReduxForm
            formName="CreateJobOfferForm"
            fields={this.getFields()}
            onSubmit={this.onCreateJobOffer}
            cancelButtonPath="/"
            displayCancelButton
          />
        </>
      );
    }
  }
);
