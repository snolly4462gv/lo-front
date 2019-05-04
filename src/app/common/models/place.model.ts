import { ImageModel } from './image.model';

export class PlaceModel {
    constructor(
        public id?: string,
        public name?: string,
        public address?: string,
        public description?: string,
        public facts?: string,
        public whatToDo?: string,
        public bestTimes?: string,
        public estimatedTime?: string,
        public tags?: string[],
        public ratings?: number,
        public score?: number,
        public lat?: number,
        public lng?: number,
        public image?: ImageModel,
        public categories?: string[],
        public image_id?: number,

        public order?: number,
        public selected?: boolean,
    ) {}
}
