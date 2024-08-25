const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://master--jade-chaja-2b853e.netlify.app/',
}));
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input, 'data' must be an array." });
    }

    // Filter and convert data
    const numbers = data.filter(item => !isNaN(item)).map(item => String(item)).join(', ');
    const alphabets = data.filter(item => isNaN(item) && /^[A-Za-z]$/.test(item)).map(item => String(item)).join(', ');
    const highestLowercaseAlphabet = data.filter(item => /^[a-z]$/.test(item)).sort().pop() || '';
    
    res.json({
        is_success: true,
        user_id: "rohit_kumar_17091999",
        email: "rohit@xyz.com",
        roll_number: "21BCE6126",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? highestLowercaseAlphabet : ''
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: "1" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
