import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.less'],
  providers:[CarService]
})
export class ExportComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,10);
  }
}
