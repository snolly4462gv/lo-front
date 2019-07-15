import { ImageModel } from './image.model';

export class PlaceModel {
    constructor(
        public id?: string,
        public name?: string,

        public description?: string,

        public lat?: number,
        public lng?: number,
        public image?: string,
        public categories?: string[],
        public image_id?: number,

        public order?: number,
        public selected?: boolean,

        public type?: string,

        public isShowFullDesc?: boolean,
        public isShow?: boolean
    ) {

    }
}

