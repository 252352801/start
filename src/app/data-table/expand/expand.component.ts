import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.less'],
  providers:[CarService]
})
export class ExpandComponent implements OnInit {

  cars: Car[];

  cols: any[];

  selectedCar: Car;

  dialogVisible: boolean;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall();

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
  }

  showCar(car: Car) {
    this.selectedCar = car;
    this.dialogVisible = true;
  }

}
