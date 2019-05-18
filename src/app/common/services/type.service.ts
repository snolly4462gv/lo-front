import { Injectable } from "@angular/core";
// import { Http, URLSearchParams } from
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class TypeService {

    constructor(){ }


  public GetTime(){
        let result:string[] = [];
        let time = 0;

        while( time < 12 *60)
        {
            result.push(((time / 60) < 10 ? '0':'' + (time /60)) +':'+((time % 60) < 10 ? '0' :'' + (time % 60)));
            time = time + 30;
        }
        return result;
    }

    public ValidateArray(array: any[]) {
        if (array) {
            const result: any[] = [];
            let objValid = true;
            for (const obj of array) {
                if (obj) {
                    for (const key in obj) {
                        if (!obj[key]) {
                            objValid = false;
                        }
                    }

                    if (objValid) {
                        result.push(obj);
                    }

                    objValid = true;
                }
            }
            return result.length > 0 ? result : null;

        }
        return null;
    }

    ParamsToUrlSearchParams(params: any): string {
        const options = new URLSearchParams();

        // tslint:disable-next-line: forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options.append(key + '[]', prop[i]);
                        }
                    }
                } else {
                    options.set(key, params[key]);
                }
            }
        }
        return options.toString();
    }

    StringJSON(params) {
        let options = '';
        options += '{';
// tslint:disable-next-line: forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options += '"' + key + '"' + ':' + '["' + prop[i] + '"]' + ',';
                        }
                    }
                } else {
                    options += '"' + key + '":' + '"' + params[key] + '"' + ',';
                }
            }
        }
        options = options.slice(0, options.length - 1);
        options += '}';
        return options;
    }

    GetDateStringFormat(date: Date) {
        return date.toISOString().split('T')[0];
    }


    GetEndTimeMask(begin: string, finish: string) {
        const mask = [
        /[0-2]/, (finish && (+finish[0]) > 1) ? /[0-3]/ : /\d/, ':', /[0-5]/, /\d/
        ];

        if (begin && begin.length > 0) {
            if (begin[0]) {
                mask[0] = new RegExp('[' + begin[0] + '-2]');
            }

            if (begin[1]) {
                if (finish && finish.length > 0) {
                    if (begin[0] === finish[0]) {
                        mask[1] = new RegExp(
                            (finish && (+finish[0]) > 1) ? '[' + begin[1] + '-3]' : '[' + begin[1] + '-9]'
                        );
                    }
                }
            }

            if (begin[3]) {
                if (finish && finish.length > 3) {
                    if (begin.substr(0, 3) === finish.substr(0, 3)) {
                        mask[3] = new RegExp('[' + begin[3] + '-5]');
                    }
                }
            }

            if (begin[4]) {
                if (finish && finish.length > 4) {
                    if (begin.substr(0, 4) === finish.substr(0, 4)) {
                        if (+begin[4] !== 9) {
                            mask[4] = new RegExp('[' + (+begin[4] + 1 ) + '-9]');
                        } else {
                            mask[4] = new RegExp('[9]');
                        }
                    }
                }
            }
        }

        return mask;
    }

    GetNumbersMask(count: number) {
        const mask = [];
        for (let i = 0; i < count; ++i) {
            mask.push(/\d/);
        }

        return mask;
    }
    GetTextMask(count: number) {
        const mask = [];
        for (let i = 0; i < count; ++i) {
            mask.push(/\d\w\s\n\[\]\^\.\(\)/);
        }

        return mask;
    }

    DateToUTCDateISOString(input) {
        const date = new Date(input);
        return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toISOString();
    }


    GetPlaceCategoriesDict() {
      return {
        'natural': 'Natural',
        'islands': 'Islands',
        'tidal_islands': 'Tidal islands',
        'inland_islands': 'Inland islands',
        'coral_islands': 'Coral islands',
        'desert_islands': 'Desert islands',
        'high_islands': 'High islands',
        'other_islands': 'Other islands',
        'natural_springs': 'Natural springs',
        'hot_springs': 'Hot springs',
        'geysers': 'Geysers',
        'springs_others': 'Springs others',
        'geological_formations': 'Geological formations',
        'mountain_peaks': 'Mountain peaks',
        'volcanoes': 'Volcanoes',
        'caves': 'Caves',
        'canyons': 'Canyons',
        'rock_formations': 'Rock formations',
        'water': 'Water',
        'crater_lakes': 'Crater lakes',
        'rift_lakes': 'Rift lakes',
        'salt_lakes': 'Salt lakes',
        'dry_lakes': 'Dry lakes',
        'reservoirs': 'Reservoirs',
        'rivers': 'Rivers',
        'canals': 'Canals',
        'waterfalls': 'Waterfalls',
        'lagoons': 'Lagoons',
        'other_lakes': 'Other lakes',
        'beaches': 'Beaches',
        'golden_sand_beaches': 'Golden sand beaches',
        'white_sand_beaches': 'White sand beaches',
        'black_sand_beaches': 'Black sand beaches',
        'shingle_beaches': 'Shingle beaches',
        'rocks_beaches': 'Rocks beaches',
        'urbans_beaches': 'Urbans beaches',
        'other_beaches': 'Other beaches',
        'nature_reserves': 'Nature reserves',
        'aquatic_protected_areas': 'Aquatic protected areas',
        'wildlife_reserves': 'Wildlife reserves',
        'national_parks': 'National parks',
        'nature_reserves_others': 'Nature reserves others',
        'natural_monuments': 'Natural monuments',
        'other_nature_conservation_areas': 'Other nature conservation areas',
        'glaciers': 'Glaciers',
        'cultural': 'Cultural',
        'museums': 'Museums',
        'national_museums': 'National museums',
        'local_museums': 'Local museums',
        'museums_of_science_and_technology': 'Museums of science and technology',
        'maritime_museums': 'Maritime museums',
        'railway_museums': 'Railway museums',
        'aviation_museums': 'Aviation museums',
        'automobile_museums': 'Automobile museums',
        'computer_museums': 'Computer museums',
        'heritage_railways': 'Heritage railways',
        'other_technology_museums': 'Other technology museums',
        'science_museums': 'Science museums',
        'planetariums': 'Planetariums',
        'military_museums': 'Military museums',
        'history_museums': 'History museums',
        'archaeological_museums': 'Archaeological museums',
        'biographical_museums': 'Biographical museums',
        'open_air_museums': 'Open air museums',
        'fashion_museums': 'Fashion museums',
        'children_museums': 'Children museums',
        'historic_house_museums': 'Historic house museums',
        'art_galleries': 'Art galleries',
        'zoos': 'Zoos',
        'aquariums': 'Aquariums',
        'other_museums': 'Other museums',
        'theatres_and_concert_halls': 'Theatres and concert halls',
        'sylvan_theatres': 'Sylvan theatres',
        'opera_houses': 'Opera houses',
        'music_venues': 'Music venues',
        'concert_halls': 'Concert halls',
        'other_theatres': 'Other theatres',
        'urban_environment': 'Urban environment',
        'squares': 'Squares',
        'installation': 'Installation',
        'gardens_and_parks': 'Gardens and parks',
        'fountains': 'Fountains',
        'sculptures': 'Sculptures',
        'historic': 'Historic',
        'historical_places': 'Historical places',
        'historic_districts': 'Historic districts',
        'historic_settlements': 'Historic settlements',
        'fishing_villages': 'Fishing villages',
        'battlefields': 'Battlefields',
        'fortifications': 'Fortifications',
        'castles': 'Castles',
        'hillforts': 'Hillforts',
        'fortified_towers': 'Fortified towers',
        'defensive_walls': 'Defensive walls',
        'bunkers': 'Bunkers',
        'kremlins': 'Kremlins',
        'other_fortifications': 'Other fortifications',
        'monuments_and_memorials': 'Monuments and memorials',
        'milestones': 'Milestones',
        'monuments': 'Monuments',
        'archaeology': 'Archaeology',
        'megaliths': 'Megaliths',
        'menhirs': 'Menhirs',
        'roman_villas': 'Roman villas',
        'cave_paintings': 'Cave paintings',
        'settlements': 'Settlements',
        'rune_stones': 'Rune stones',
        'other_archaeological_sites': 'Other archaeological sites',
        'burial_places': 'Burial places',
        'cemeteries': 'Cemeteries',
        'war_graves': 'War graves',
        'necropolises': 'Necropolises',
        'dolmens': 'Dolmens',
        'tumuluses': 'Tumuluses',
        'mausoleums': 'Mausoleums',
        'war_memorials': 'War memorials',
        'crypts': 'Crypts',
        'other_burial_places': 'Other burial places',
        'religion': 'Religion',
        'churches': 'Churches',
        'eastern_orthodox_churches': 'Eastern orthodox churches',
        'catholic_churches': 'Catholic churches',
        'other_churches': 'Other churches',
        'cathedrals': 'Cathedrals',
        'mosques': 'Mosques',
        'synagogues': 'Synagogues',
        'buddhist_temples': 'Buddhist temples',
        'hindu_temples': 'Hindu temples',
        'egyptian_temples': 'Egyptian temples',
        'other_temples': 'Other temples',
        'monasteries': 'Monasteries',
        'architecture': 'Architecture',
        'historic_architecture': 'Historic architecture',
        'pyramids': 'Pyramids',
        'amphitheatres': 'Amphitheatres',
        'triumphal_archs': 'Triumphal archs',
        'palaces': 'Palaces',
        'manor_houses': 'Manor houses',
        'wineries': 'Wineries',
        'farms': 'Farms',
        'other_buildings_and_structures': 'Other buildings and structures',
        'destroyed_objects': 'Destroyed objects',
        'skyscrapers': 'Skyscrapers',
        'bridges': 'Bridges',
        'moveable_bridges': 'Moveable bridges',
        'stone_bridges': 'Stone bridges',
        'viaducts': 'Viaducts',
        'roman_bridges': 'Roman bridges',
        'footbridges': 'Footbridges',
        'aqueducts': 'Aqueducts',
        'suspension_bridges': 'Suspension bridges',
        'other_bridges': 'Other bridges',
        'towers': 'Towers',
        'observation_towers': 'Observation towers',
        'watchtowers': 'Watchtowers',
        'water_towers': 'Water towers',
        'clock_towers': 'Clock towers',
        'bell_towers': 'Bell towers',
        'minarets': 'Minarets',
        'other_towers': 'Other towers',
        'lighthouses': 'Lighthouses',
        'industrial_facilities': 'Industrial facilities',
        'railway_stations': 'Railway stations',
        'factories': 'Factories',
        'mints': 'Mints',
        'power_stations': 'Power stations',
        'dams': 'Dams',
        'mills': 'Mills',
        'abandoned_railway_stations': 'Abandoned railway stations',
        'abandoned_mineshafts': 'Abandoned mineshafts',
        'mineshafts': 'Mineshafts',
        'other_buildings': 'Other buildings',
        'other': 'Other',
        'sundials': 'Sundials',
        'view_points': 'View points',
        'red_telephone_boxes': 'Red telephone boxes',
        'tourist_object': 'Tourist object',
        'historic_object': 'Historic object',
        'foods': 'Foods',
        'pubs': 'Pubs',
        'bars': 'Bars',
        'accomodations': 'Accomodations',
        'apartments': 'Apartments',
        'guest_houses': 'Guest houses',
        'campsites': 'Campsites',
        'resorts': 'Resorts',
        'motels': 'Motels',
        'other_hotels': 'Other hotels',
        'hostels': 'Hostels',
        'villas_and_chalet': 'Villas and chalet',
        'alpine_hut': 'Alpine hut',
        };
    }

    GetPlaceCategoriesKeys() {
      return Object.keys(this.GetPlaceCategoriesDict());
    }
    GetPlaceCategoriesValues() {
      return Object.values(this.GetPlaceCategoriesDict());
    }

    ConvertPlaceCategoriesFromBackToFront(catB: string[]) {
      let catF: string[] = [];
      const categories = this.GetPlaceCategoriesDict();
      for (const item of catB) {
         catF.push(categories[item]);
      }
      return catF;
    }

    ConvertPlaceCategoriesFromFrontToBack(catF: string[]) {
      let catB: string[] = [];
      const categoriesKeys = this.GetPlaceCategoriesKeys();
      const categoriesValues = this.GetPlaceCategoriesValues();
      for (const item of catF) {
        const index = categoriesValues.findIndex(x => x === item);
        if (index >= 0) {
          catB.push(categoriesKeys[index]);
        }
      }
      return catB;
    }

    GetRouteCategoriesDict() {
      return {
        'roof': 'Roof',
        'other': 'Other',
        'nature': 'Nature',
        'museums': 'Museums',
        'city_environment': 'City Environment',
        'monuments': 'Monuments',
        'religion_architecure': 'Religion Architecure',
        'historical_architecture': 'Historical Architecture'
        };
    }

    GetRouteCategoriesKeys() {
      return Object.keys(this.GetRouteCategoriesDict());
    }
    GetRouteCategoriesValues() {
      return Object.values(this.GetRouteCategoriesDict());
    }

    ConvertRouteCategoriesFromBackToFront(catB: string[]) {
      let catF: string[] = [];
      const categories = this.GetRouteCategoriesDict();
      for (const item of catB) {
         catF.push(categories[item]);
      }
      return catF;
    }

    ConvertRouteCategoriesFromFrontToBack(catF: string[]) {
      let catB: string[] = [];
      const categoriesKeys = this.GetRouteCategoriesKeys();
      const categoriesValues = this.GetRouteCategoriesValues();
      for (const item of catF) {
        const index = categoriesValues.findIndex(x => x === item);
        if (index >= 0) {
          catB.push(categoriesKeys[index]);
        }
      }
      return catB;
    }

}


