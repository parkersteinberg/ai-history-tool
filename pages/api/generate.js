import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const basePromptPrefix = 'Write a short summary about the following (including the historical relevance): '
const generateAction = async (req, res) => {
  // log prompt that we're going to be running
  const prompt = `${basePromptPrefix}${req.body.prompt}`
  console.log(`Final Prompt: ${prompt}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt,
    temperature: 0.5, 
    max_tokens: 250
  })

  const basePromptOutput = baseCompletion.data.choices.pop()
  console.log(basePromptOutput)

  res.status(200).json({ output: basePromptOutput })

}

export default generateAction