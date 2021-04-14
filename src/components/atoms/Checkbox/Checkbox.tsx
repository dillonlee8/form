import React from 'react'
import { Field } from 'formik';
import styles from './Checkbox.module.css'

interface Props {
  id: string
  name: string
  label: string
}

function Checkbox({id, name, label}: Props) {
  return (
    <div className={styles.container}>
      <Field id={id} type="checkbox" name={name} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox