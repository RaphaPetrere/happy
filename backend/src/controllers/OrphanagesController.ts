import { Request, Response} from 'express';

import { getRepository } from 'typeorm';
//Toda ação q faremos no banco de dados passa por esse repositório

import orphanageView from '../views/orphanages_view';

import * as Yup from 'yup';


import Orphanage from '../models/Orphanage';

export default {
    async show(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const { id } = request.params;

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },
    
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] //nome da coluna que tem as imagens
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async create(request: Request, response: Response) {

        const {
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[]; //instruindo pro código que isso é um array de arquivos do Multer
        
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(), 
            latitude: Yup.number().required(), 
            longitude: Yup.number().required(), 
            about: Yup.string().required().max(300), 
            instructions: Yup.string().required(), 
            opening_hours: Yup.string().required(), 
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false, //se ele encontrar um campo invalido, ele retorna a mensagem de todos os campos que estão errados, não só no 1°
        });

        const orphanage = orphanagesRepository.create(data); //aqui ele só cria o esqueleto
    
        await orphanagesRepository.save(orphanage); //aqui ele manda pro banco de dados mesmo, parecido com Laravel
    
        return response.status(201).json(orphanage);
    }
}