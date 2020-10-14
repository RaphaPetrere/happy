import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
    render (orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        }; //Aqui manda o que será retornado para a view, se remover um campo, não retorna lá
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage))
    }
};