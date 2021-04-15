import React from 'react'
import { useFormikContext } from 'formik';
import Button from '../../atoms/Button'
import Checkbox from '../../atoms/Checkbox/Checkbox';

interface Props {
  submitStep: () => void
}

function PrivacyForm({submitStep}: Props) {
  const { submitForm } = useFormikContext<{
    updates: string
    communication: string
  }>()

  function submit() {
    submitStep()
    submitForm()
  }

  return (
    <>
      <Checkbox 
        id="updates"
        name="updates"
        label="Recieve updates about Tray.io product by email"
      />

      <Checkbox 
        id="communication"
        name="communication"
        label="Recieve communication by email or other products created by the Tray.io team"
      />


      <Button data-testid="submit-privacyForm" onClick={submit} type="button">Submit</Button>
    </>
  )
}

export default PrivacyForm