import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'row-group',
  templateUrl: './row-group.component.html',
  styleUrls: ['./row-group.component.less'],
  providers:[CarService]
})
export class RowGroupComponent implements OnInit {
  cars1: Car[];

  cars2: Car[];

  cars3: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars1=this.carService.getCarsSmall().slice(0,10);
    this.cars2=this.carService.getCarsSmall().slice(10,30);
    this.cars3=this.carService.getCarsSmall().slice(15,40);
  }
}
