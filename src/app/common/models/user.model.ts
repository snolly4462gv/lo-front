import { ImageModel } from './image.model';
export class UserModel {
    constructor(
        public username?: string,
        public email?: string,
        public password?: string,
        public first_name?: string,
        public last_name?: string,
        public image?: ImageModel,
        public city?: {city: string},
        public categories?: string[]
    ) {}
}
