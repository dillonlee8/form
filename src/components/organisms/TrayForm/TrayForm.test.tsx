import React from 'react'
import { render, fireEvent, waitFor, screen } from '../../../utils/test-utils'
import '@testing-library/jest-dom/extend-expect'
import TrayForm from './TrayForm'

describe('TrayForm', () => {
  beforeEach(() => {
    render(<TrayForm />)
  })

  describe('when a user lands on the form', () => {
    it('should display that the user is on the "User" section', () => {
      expect(screen.getByTestId('User-header')).toHaveClass('activeStep')
    })
  })

  describe('when a user tries to click submit without valid information', () => {
    it('should display error messages for required fields', async () => {
      fireEvent.click(screen.getByTestId('submit-userForm'))
      await waitFor(() => {
        expect(screen.getAllByText(/Required/).length).toBe(3)
      })
    })
  })

  describe('when a user enters a invalid email address', () => {
    it('should display an error message', async () => {
      const input = screen.getByLabelText('email')
      fireEvent.change(input, {target: {value: 'foo@bar'}})
      fireEvent.blur(input)
      await waitFor(() => {
        expect(screen.getByText(/Invalid email address/)).toBeInTheDocument()
      })
    })
  })

  describe('when a user enters a invalid password', () => {
    it('should display an error message for when it is less than 9 characters', async () => {
      const input = screen.getByLabelText('password')
      fireEvent.change(input, {target: {value: '1234'}})
      fireEvent.blur(input)
      await waitFor(() => {
        expect(screen.getByText(/Password must be at least 9 characters/)).toBeInTheDocument()
      })
    })

    it('should display an error message for when there is no uppercase character', async () => {
      const input = screen.getByLabelText('password')
      fireEvent.change(input, {target: {value: '736dffsssssss'}})
      fireEvent.blur(input)
      await waitFor(() => {
        expect(screen.getByText(/Password should contain at least one number, uppercase and lowercase letter/)).toBeInTheDocument()
      })
    })

    it('should display an error message for when there is no lowercase character', async () => {
      const input = screen.getByLabelText('password')
      fireEvent.change(input, {target: {value: 'JSYE62HHHHHH'}})
      fireEvent.blur(input)
      await waitFor(() => {
        expect(screen.getByText(/Password should contain at least one number, uppercase and lowercase letter/)).toBeInTheDocument()
      })
    })
  })

  describe('when a user enters valid information for the user section and clicks next', () => {
    beforeEach(() => {
      const nameInput = screen.getByLabelText('name')
      fireEvent.change(nameInput, {target: {value: 'dillon'}})

      const roleInput = screen.getByLabelText('role')
      fireEvent.change(roleInput, {target: {value: 'software engineer'}})

      const emailInput = screen.getByLabelText('email')
      fireEvent.change(emailInput, {target: {value: 'foo@bar.com'}})

      const passwordInput = screen.getByLabelText('password')
      fireEvent.change(passwordInput, {target: {value: '123abcDEFGHIJ'}})

      fireEvent.click(screen.getByTestId('submit-userForm'))
    })

    it('should not display any error messages', async () => {
      await waitFor(() => {
        expect(screen.queryAllByText(/Required/).length).toBe(0)
        expect(screen.queryByText(/Invalid email address/)).not.toBeInTheDocument()
        expect(screen.queryByText(/Password must be at least 9 characters/)).not.toBeInTheDocument()
        expect(screen.queryByText(/Password should contain at least one number, uppercase and lowercase letter/)).not.toBeInTheDocument()
      })
    })

    it('should display the privacy section', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('Privacy-header')).toHaveClass('activeStep')
      })
    })
  })
})