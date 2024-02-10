import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <h1>Routes-Handlers</h1>

      <li className={styles.link}>
        <Link href="/comments">Comments</Link>
      </li>

      <li className={styles.link}>
        <Link href="/api/comments">Comments</Link>
      </li>

      <li className={styles.link}>
        <Link href="/api/comments/2">Comments 2</Link>
      </li>

      <p>Use thunder client to test it!</p>

    </main>
  );
}
