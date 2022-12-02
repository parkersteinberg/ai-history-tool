import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Response from '../components/Response'

export default function Home() {

  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false)

  const handleTextChange = (event) => {
    // console.log(event.target.value)
    setPrompt(event.target.value)
    console.log(prompt)
  }

  const handleGenerate = async () => {
    // set isGenerating to true for a loading screen alter
    setIsGenerating(true)
    console.log('here is what we\'ll be passing:', prompt)
    // hit he OPEN AI API?
    // then render the response below
    // use setResponse 
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    }
    const response = await fetch('/api/generate',options)
    const data = await response.json()
    const { output } = data;
    console.log('data is', data)
    setResponse(output.text)
    setIsGenerating(false)
  }

  const generateRandom = async () => {
    setIsGeneratingRandom(true)
    console.log('here is what we\'ll be passing:', prompt)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    }
    const response = await fetch('/api/random',options)
    const data = await response.json()
    const { output } = data;
    console.log('data is', data)
    setResponse(output.text)
    setIsGeneratingRandom(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI x History</title>
        <meta name="description" content="AI x History" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ask AI about historical events and people
        </h1>

        <div>
          <span>Learn about any event or any person in history</span>
        </div>

        <div className="prompt-container">
          <textarea value={prompt} name="prompt" id="prompt" cols="40" rows="10" placeholder='What part of history do you want to learn about?' onChange={handleTextChange}></textarea>
        </div>

        <div id="buttons">
          <div className="generate-button-div">
            <button className="generate-button" onClick={handleGenerate}>{isGenerating ? <p>Generating...</p> : <p>Generate</p>}</button>
          </div>

          <div className="random-button">
            <button className="generate-button" onClick={generateRandom}>{isGeneratingRandom ? <p>Generating Random...</p> : <p>Give me a random fact!</p>}</button>
          </div>
        </div>


        {response && 
          <div className="output">
            <div className="response-container">
              <br /><br />
              <span className="response-span">About:</span>
              {/* if response state is not empty string, render Response component? */}
              <Response />
            </div>

            <div className="output-content">
              <p>{response}</p>
            </div>
          </div>}

        
      </main>

      <footer className={styles.footer}>
        <span>Powered by GPT-3 and the human brain of <a href="https://parkersteinberg.com/"  target="_blank" rel="noreferrer">Parker Steinberg</a></span>
      </footer>
    </div>
  )
}
