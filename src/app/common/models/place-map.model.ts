import { ImageModel } from './image.model';

export class PlaceMapModel {
    constructor(
        public lat?: number,
        public lng?: number,
        public image?: any,
        public image_id?: string,
        public order?: number,
        public selected?: boolean,
        public name?: string,




        public id?: string,
        public address?: string,
        public description?: string,
        public facts?: string,
        public whatToDo?: string,
        public bestTimes?: string,
        public estimatedTime?: string,
        public tags?: string[],
        public ratings?: number,
        public score?: number,
        public categories?: string[],
    ) {}
}
