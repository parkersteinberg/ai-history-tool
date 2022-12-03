import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const basePromptPrefix = 'Write a short summary about the following. Include the historical relevance. At the end, include URLs to further reading material in bullet format, with the first being a link to a Wikipedia article: '
const generateAction = async (req, res) => {
  // log prompt that we're going to be running
  const prompt = `${basePromptPrefix}${req.body.prompt}`
  console.log(`Final Prompt: ${prompt}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7, 
    max_tokens: 250
  })

  console.log('choices are', baseCompletion.data.choices)
  const basePromptOutput = baseCompletion.data.choices.pop()
  console.log(basePromptOutput)

  res.status(200).json({ output: basePromptOutput })

}

export default generateAction