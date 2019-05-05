export class RouteModel {
    constructor(
        public name?: string,
        public description?: string,
        public route_type?: string,
        public image?: any,
        public image_id?: string,
        public places?: string[],
        public categories?: string[],
        public finished?: boolean,
        public price?: string
    ) {}
}
