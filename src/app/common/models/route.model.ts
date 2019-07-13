export class RouteModel {
    constructor(
        public name?: string,
        public description?: string,
        public image?: any,
        public image_id?: string,
        public places?: any[],
        public categories?: string[],
        public finished?: boolean,
        public price?: number,
        public id?: string,
        public status?: string,
        public total_places?: number,

        public isShowFullDesc?: boolean
    ) {
    }
}
