require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ message: 'Error communicating with OpenAI API', error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));