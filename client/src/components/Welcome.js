import React from 'react'

export default function Welcome ({firstName, lastName, isSignIn}) {
  return isSignIn ? 
    (
      <div>
        <p>Bienvenue {firstName} {lastName} sur votre application de gestion d' offres d' emploi</p>
      </div>
    ) : (
      <div>non connecté</div>
    )
} 
