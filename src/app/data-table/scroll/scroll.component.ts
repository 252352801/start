import { Component,OnInit,Injectable} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {LazyLoadEvent} from 'primeng/primeng';
@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.less'],
  providers:[CarService]
})
@Injectable()
export class ScrollComponent implements OnInit {
  cars: Car[];

  carsLarge: Car[];

  totalRecords: number;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,10);

    this.totalRecords = 500000;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //for demo purposes keep loading the same dataset
    //in a real production application, this data should come from server by building the query with LazyLoadEvent options
    this.carsLarge = [
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
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
    ];

  }
}
