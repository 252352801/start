import { Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less'],
  providers:[CarService]
})
export class PaginatorComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall();
  }
  paginate(ev){
    console.log(ev);
  }
}
