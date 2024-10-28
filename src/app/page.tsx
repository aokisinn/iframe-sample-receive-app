'use client'

import { useRef, useState } from "react";
import styles from "./page.module.css";

type Theme = 'light' | 'dark'

const iframeUrl = 'https://iframe-sample-send-app.vercel.app/'

export default function Home() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getTheme = () => {
    console.log('getTheme')
    console.log(iframeRef.current)
    console.log(iframeRef.current?.contentWindow?.postMessage({ type: 'getTheme' }, '*'))
    const theme = iframeRef.current?.contentWindow?.postMessage({ type: 'getTheme' }, '*')

    console.log('theme')
    console.log(theme)
    setTheme(theme || "light")
  }

  const updateTheme = (newTheme: 'light' | 'dark') => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'updateTheme', data: newTheme }, '*')
    setTheme(newTheme)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Theme Receiver Page {theme}
        </h1>

        <div>
          <button onClick={() => getTheme()}>Get Theme</button>
          <button onClick={() => updateTheme('light')}>Set Light</button>
          <button onClick={() => updateTheme('dark')}>Set Dark</button>
        </div>

        <iframe
          ref={iframeRef}
          src={iframeUrl}
        ></iframe>
      </main>
    </div>
  );
}
