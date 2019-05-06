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
        public price?: number,
        public id?: string,
        public status?: string
    ) {
      this.route_type = 'internal';
    }
}
