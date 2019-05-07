import { ImageModel } from './image.model';

export class PlaceModel {
    constructor(
        public id?: string,
        public name?: string,
        public address?: string,
        public description?: string,
        public interesting_facts?: string,
        public what_to_do?: string,
        public work_times?: WorkTimeModel[],
        public estimated_time?: number,
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

        public isShowFullDesc?: boolean
    ) {
      this.categories = [];
      this.work_times = [];
    }
}

export class WorkTimeModel {
  constructor(
    public open_time?: string,
    public close_time?: string,
    public day?: string
  ) {}
}

export class WorkTimeDNModel {
  constructor(
    public open_time?: string,
    public open_time_dn?: string,
    public close_time?: string,
    public close_time_dn?: string,
    public day?: string
  ) {
    this.open_time = '08:00';
    this.open_time_dn = 'am';

    this.close_time = '06:00';
    this.close_time_dn = 'pm';

    this.day = 'monday';
  }
}
