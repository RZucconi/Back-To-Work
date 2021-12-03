import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { displayJobOffers } from '../../actions'

export default function JobOfferList() {
  const jobOffersData = useSelector((state) => state.JobOffersTable)
  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(displayJobOffers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return jobOffersData.isLoaded === false ? (
            <div>...Loading</div>
          ):(
            <Table striped selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date de creation</Table.HeaderCell>
                  <Table.HeaderCell>Type de contrat</Table.HeaderCell>
                  <Table.HeaderCell>Nom de l'entreprise</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {jobOffersData.jobOffers.map((jobOffer) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{jobOffer.createdAt}</Table.Cell>
                      <Table.Cell>{jobOffer.contractType}</Table.Cell>
                      <Table.Cell>{jobOffer.companyName}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          )
}
