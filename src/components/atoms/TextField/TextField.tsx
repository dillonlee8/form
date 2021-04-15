import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik';
import styles from './TextField.module.css'

interface Props {
  id: string
  name: string
  label: string
  type?: 'email' | 'password'
}

function TextField({id, name, label, type}: Props) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function setType () {
    if (isPasswordVisible) return 'text'
    return type || 'text'
  }

  return (
    <div className={styles.container} >
      <label className={styles.label} htmlFor={id}>{label}</label> 
      {type === 'password' && (
        <small 
        className={styles.showPassword}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >{isPasswordVisible ? 'hide password' : 'show password'}</small>
      )}
      <div>
        <Field className={styles.input} id={id} name={name} type={setType()} />
      </div>
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
)
}

export default TextField