import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {Toaster} from '../../../services/toaster/toaster.service';
@Component({
  selector: 'templating',
  templateUrl: './templating.component.html',
  styleUrls: ['./templating.component.less'],
  providers:[CarService,Toaster]
})
export class TemplatingComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService,private toaster: Toaster) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,10);
  }
  selectCar(car: Car) {
    this.toaster.info('Car select','Vin:'+car.vin);
  }
}

