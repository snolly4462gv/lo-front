export class PlaceModel {
    constructor(
        public name?: string,
        public address?: string,
        public descriptions?: string,
        public facts?: string,
        public whatToDos?: string,
        public bestTimes?: string,
        public estimatedTime?: string,
        public tags?: string[],
        public ratings?: number,
        public lat?: number,
        public lng?: number
    ) {}
}
