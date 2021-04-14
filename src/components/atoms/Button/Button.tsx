import React from 'react'
import styles from './Button.module.css'

function Button({...rest}) {
  return (
    <button className={styles.button} {...rest}></button>
  )
}

export default Button