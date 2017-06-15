import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.less'],
  providers:[CarService]
})
export class SelectionComponent implements OnInit {

  //msgs: Message[];

  cars: Car[];
  selectedCars:Car[];

  selectedCar1: Car;

  selectedCar2: Car;

  selectedCar3: Car;

  selectedCars1: Car[];

  selectedCars2: Car[];

  selectedCars3: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getCarsSmall().slice(0,40);
  }

  onRowSelect(event) {
    //this.msgs = [];
    //this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand});
  }

  onRowUnselect(event) {
   // this.msgs = [];
   // this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
  }
}
