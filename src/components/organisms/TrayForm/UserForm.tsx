import React from 'react'
import { useFormikContext } from 'formik';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';

interface Props  {
  submitStep: () => void
}

function UserForm({
  submitStep
}: Props) {

  const { values, errors, setTouched } = useFormikContext<{
    name: string
    role: string
    email: string
    password: string
  }>()

  function isSubFormValid() {
    return !!values.name && !errors.name 
    && !!values.role && !errors.role
    && !!values.email && !errors.email
    && !!values.password && !errors.password
  }

  function nextStep() {
    if(!isSubFormValid()) {
      setTouched({
        name: true,
        email: true,
        password: true
      }, true)
      return
    }
    submitStep()
  }

  return (
    <>
      <TextField
        name="name"
        id="name"
        label="name"
      />

      <TextField
        name="role"
        id="role"
        label="role"
      />

      <TextField
        name="email"
        id="email"
        label="email"
        type="email"
      />

      <TextField
        name="password"
        id="password"
        label="password"
        type="password"
      />
      

      <Button
        data-testid="submit-userForm"
        onClick={nextStep}
        type="button"
        >Submit</Button>
      
    </>
  )
}

export default UserForm