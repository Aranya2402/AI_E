import express from 'express';
import * as dotenv from 'dotenv';
import  OpenAI from 'openai';



dotenv.config();
const { Configuration, OpenAIApi } = OpenAI;

const router = express.Router();

export { router as aietRoutes };
