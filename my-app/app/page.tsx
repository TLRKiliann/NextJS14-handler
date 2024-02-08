import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <h1>Routes-Handlers</h1>

      <li className={styles.link}>
        <Link href="/dashboard/users">Dashboard users</Link>
      </li>

      <li className={styles.link}>
        <Link href="/dashboard/1">Dashboard 1</Link>
      </li>

      <li className={styles.link}>
        <Link href="/comments">Comments</Link>
      </li>

      <li className={styles.link}>
        <Link href="/comments/2">Comments 2</Link>
      </li>

      <p>Use thunder client to test it!</p>

    </main>
  );
}
