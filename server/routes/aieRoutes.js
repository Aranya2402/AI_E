import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';  // Import OpenAI package

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('hello');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Assuming createImage is incorrect, using a more generic method call:
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;

        res.status(200).json({ photo: image });

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)    }
});

export { router as aieRoutes };
