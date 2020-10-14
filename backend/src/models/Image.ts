import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images') //classe ta associada com o images

export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column() //representa que é um coluna no banco de dados
    path: string;
    
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}