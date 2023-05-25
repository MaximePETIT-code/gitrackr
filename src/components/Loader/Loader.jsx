import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.container__loader}></div>
      <span>Loading the GitHub data... Stay tuned!</span>
    </div>
  )
}
