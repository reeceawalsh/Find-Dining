import React from 'react'
import ForgotPassword from './ForgotPassword'

describe('<ForgotPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ForgotPassword />)
  })
})