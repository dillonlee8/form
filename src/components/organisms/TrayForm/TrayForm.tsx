import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames'
import styles from './TrayForm.module.css'
import UserForm from './UserForm'

import PrivacyForm from './PrivacyForm';
import Complete from './Complete';
import FormHeader from '../../molecules/FormHeader';
// do a toggle to show the password
// show error messages
// disable next when invalid
// console log submitted values

// write tests for all requirements
// style components
// use redux to dispatch action for step index and form values


function TrayForm () {
  const [stepIndex, setStepIndex] = useState(0)

  function submitStepOne(): void {
    setStepIndex(1)
  }

  function submitStepTwo(): void {
    setStepIndex(2)
  }

  console.log('step index', stepIndex)

  return (
    <>
    <h1>Tray.io Form</h1>
    <div className={styles.container}>
      <div className={styles.form}>
        <Formik
        initialValues={{ 
          name: '', 
          role: '', 
          email: '', 
          password: '', 
          updates: false, 
          communication: false 
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .min(9, 'Password must be at least 9 characters')
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contain at least one number, uppercase and lowercase letter.')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('VALUES:', JSON.stringify(values, null, 2))
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
            <FormHeader 
              stepIndex={stepIndex}
              headers={['User', 'Privacy', 'Done']}
            />
            <div className={styles.formBody}>
              <div className={classnames({
                [styles.hidden]: stepIndex !== 0
              })}>
                <UserForm
                  submitStep={submitStepOne}
                />
              </div>

              <div className={classnames({
                [styles.hidden]: stepIndex !== 1
              })}>
                <PrivacyForm submitStep={submitStepTwo} />
              </div>

              <div className={classnames({
                [styles.hidden]: stepIndex !== 2
              })}>
                <Complete />
              </div>
            </div>

            
        </Form>
      </Formik>
      </div>
    </div>
    </>
  )
}

export default TrayForm