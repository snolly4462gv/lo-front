import { ImageModel } from './image.model';

export class PlaceMapModel {
    constructor(
        public lat?: number,
        public lng?: number,
        public image?: any,
        public image_id?: string,
        public order?: number,
        public selected?: boolean,
        public name?: string
    ) {}
}
