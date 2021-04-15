import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import styles from './TrayForm.module.css'
import UserForm from './UserForm'

import PrivacyForm from './PrivacyForm';
import Complete from './Complete';
import FormHeader from '../../molecules/FormHeader';
import { setTrayFormValues } from '../../../redux/trayForm/actions';

function TrayForm () {
  const [stepIndex, setStepIndex] = useState(0)

  const dispatch = useDispatch()

  function goToNextStep(): void {
    setStepIndex(stepIndex + 1)
  }

  return (
    <>
    <h1>Form</h1>
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
          dispatch(setTrayFormValues(values))
          setSubmitting(false);
        }}
      >
        <Form>
            <FormHeader 
              stepIndex={stepIndex}
              headers={['User', 'Privacy', 'Done']}
            />
            <div className={styles.formBody}>
              <div
              data-testid="step1-container"
              className={classnames({
                [styles.hidden]: stepIndex !== 0
              })}>
                <UserForm
                  submitStep={goToNextStep}
                />
              </div>

              <div 
              data-testid="step2-container"
              className={classnames({
                [styles.hidden]: stepIndex !== 1
              })}>
                <PrivacyForm submitStep={goToNextStep} />
              </div>

              <div 
              data-testid="step3-container"
              className={classnames({
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