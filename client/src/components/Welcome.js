import React from 'react'
import { useSelector } from 'react-redux'

export default function Welcome () {
  const profile = useSelector((state) => state.user)
  const isSignIn = useSelector((state) => state.auth.isSignIn)

  return isSignIn ? 
    (
      <div>
        <p>Bienvenue {profile.firstName} {profile.lastName} sur votre application de gestion d' offres d' emploi</p>
      </div>
    ) : (
      <div>non connecté</div>
    )
} 
