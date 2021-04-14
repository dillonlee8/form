import React from 'react'
import classnames from 'classnames'
import styles from './FormHeader.module.css'

interface Props {
  stepIndex: number
  headers: string[]
}

function FormHeader({stepIndex, headers}: Props) {
  return (
    <div className={styles.container}>
      {headers.map((header, i) => (
        <div key={header} className={classnames({[styles.activeStep]: stepIndex === i})}>{header}</div>
      ))}
    </div>
  )
}

export default FormHeader