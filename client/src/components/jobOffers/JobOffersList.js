import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayJobOffers } from '../../actions'

export default function JobOfferList() {
  const profile = useSelector((state) => state.user)
  const isSignIn = useSelector((state) => state.auth.isSignIn)
  const jobOffers = useSelector((state) => state.jobOfferList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(displayJobOffers())
  }, [])

  console.log(jobOffers)

  return isSignIn ? 
    (
      <div>
        <p>Bienvenue {profile.firstName} {profile.lastName} sur votre application de gestion d' offres d' emploi</p>
      </div>
    ) : (
      <div>non connecté</div>
    )
}