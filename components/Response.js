export default function Response(props) {
  const text = props.text
  const splitText = text.split('\n')
  return splitText.map((str, idx) => {
    if (str.includes('https://')) {
      const url = str.slice(str.indexOf('https://'), str.length)
      return <a href={url} target="_blank" rel="noreferrer" key={idx}><p key={idx}>{str}</p></a>
    }
    else {
      return <p key={idx}>{str}</p>
    }
  })
}