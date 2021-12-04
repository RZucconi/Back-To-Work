import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react';

import JobOfferList from './jobOffers/JobOffersTable';

export default function Welcome() {
  const profile = useSelector((state) => state.user);
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  return isSignIn ? (
    <div>
      <Message color="green" size="big">
        <Message.Header>
          <Icon name="hand spock" size="large" />
          <span>
            Bienvenue {profile.firstName} {profile.lastName} sur votre
            application de gestion d' offres d' emploi
          </span>
        </Message.Header>
      </Message>
      <JobOfferList />
      <Link to="/newJobOffer" className="ui button blue">
        Ajouter une offre
      </Link>
    </div>
  ) : (
    <Message color="red" size="big">
      <Icon name="hand paper" size="large" />
      <span>Vous n'êtes pas connecté...</span>
    </Message>
  );
}
