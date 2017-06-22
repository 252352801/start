import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.less'],
  providers:[CarService]
})
export class SortComponent implements OnInit {
  cars1: Car[];

  cars2: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars1=this.carService.getCarsSmall().slice(0,10);
    this.cars2=this.carService.getCarsSmall().slice(10,20);
  }
}
