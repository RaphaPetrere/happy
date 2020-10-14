import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages') //classe ta associada com o orphanages

export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column() //representa que é um coluna no banco de dados
    name: string;
    
    @Column()
    latitude: number;
    @Column()
    longitude: number;

    @Column()
    about: string;
    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, { //1 orfanato para várias images
        cascade: ['insert', 'update'] //cascade automaticamente vai cadastrar/atualizar as imagens q estão relacionadas
    }) 
    @JoinColumn({ name: 'orphanage_id' }) //nome da coluna q armazena o relacionamento do orfanato com a imagem
    images: Image[];
}