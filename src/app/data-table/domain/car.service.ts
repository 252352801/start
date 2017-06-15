import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Car} from './car';

@Injectable()
export class CarService {

  constructor(private http: Http) {}

  getCarsSmall():Car[] {
    return [
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff1"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre3451"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr1"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh1"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy341"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj1"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr1"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg341"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw51"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s1"},
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff2"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre3452"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr2"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh2"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy342"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj2"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr2"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg342"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw52"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s2"},
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff3"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre3453"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr3"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh3"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy343"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj3"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr3"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg343"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw53"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s3"}
      ]
  }
}
