import { ImageModel } from './image.model';

export class PlaceModel {
    constructor(
        public name?: string,
        public address?: string,
        public description?: string,
        public facts?: string,
        public whatToDo?: string,
        public bestTimes?: string,
        public estimatedTime?: string,
        public tags?: string[],
        public ratings?: number,
        public lat?: number,
        public lng?: number,
        public image?: ImageModel,
        public categories?: string[]
    ) {}
}
