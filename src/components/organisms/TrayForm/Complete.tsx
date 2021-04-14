import React from 'react'
import styles from './Complete.module.css'

function Complete() {
  return (
    <div className={styles.container}>
      <div className={styles.tick}></div>
      <p className={styles.text}>Please verify your email address, you should have recieved an email from us already!</p>
    </div>
  )
}

export default Complete