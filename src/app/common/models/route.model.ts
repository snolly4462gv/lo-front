import { ImageModel } from './image.model';

export class RouteModel {
    constructor(
        public name?: string,
        public description?: string,
        public route_type?: string,
        public image?: ImageModel,
        public places?: string[],
        public categories?: string[]
    ) {}
}
