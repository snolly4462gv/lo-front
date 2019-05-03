import { ImageModel } from './image.model';
export class UserGetModel {
    constructor(
        public email?: string,
        public first_name?: string,
        public last_name?: string,
        public phone?: string,

        public twitter_id?: string,
        public google_id?: string,
        public vk_id?: string,
        public date_of_birth?: string,
        public gender?: string,
        public facebook_id?: string,
        public instagram_id?: string,
        public image_id?: number,
        public username?: string,
        public id?: string,
        public completed_routes_count?: number,
        public created_places_count?: number,
        public created_routes_count?: number,
        public token?: string
    ) {}
}
