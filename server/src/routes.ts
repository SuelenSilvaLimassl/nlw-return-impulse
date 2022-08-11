import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.get('/', async (req, res) => {
    console.log('Hello World');
    return res.status(200).send();
})


routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    try{

        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodemailerMailAdapter = new NodemailerMailAdapter()
    
    
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbacksRepository,
            nodemailerMailAdapter
        )
    
        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })
    
    
        return res.status(201).send();
    } catch (err){
        console.error(err);

        return res.status(500).send();

    }
})