'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type Theme = 'light' | 'dark'

const iframeUrl = 'https://iframe-sample-send-app.vercel.app/'

export default function Home() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getIframeTheme = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'getTheme' }, '*')
  }

  const updateTheme = (newTheme: 'light' | 'dark') => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'updateTheme', data: newTheme }, '*')
    setTheme(newTheme)
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { type, data } = event.data
      if (type === 'theme') {
        setTheme(data || 'light')
      }
    })
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Theme Receiver Page {theme}
        </h1>

        <div>
          <button onClick={() => getIframeTheme()}>Get Theme</button>
          <button onClick={() => updateTheme('light')}>Set Light</button>
          <button onClick={() => updateTheme('dark')}>Set Dark</button>
        </div>

        <iframe
          ref={iframeRef}
          src={iframeUrl}
          style={{ display: 'none' }}
        ></iframe>
      </main>
    </div>
  );
}
