import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('hello');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
            {
                inputs: prompt,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',  // To handle image data
            }
        );

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;

        res.status(200).json({ photo: imageUrl });

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({
            message: error.message || 'An unexpected error occurred.',
        });
    }
});

export { router as aieRoutes };
