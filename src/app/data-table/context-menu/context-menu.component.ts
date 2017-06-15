import { Component,OnInit,Injectable} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {MenuItem} from 'primeng/primeng';
@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less'],
  providers:[CarService]
})
@Injectable()
export class ContextMenuComponent implements OnInit {

  cars: Car[];

  selectedCar: Car;

  items: MenuItem[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,10);

    this.items = [
      {label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.selectedCar)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.selectedCar)}
    ];
  }

  viewCar(car: Car) {
  //  this.msgs = [];
   // this.msgs.push({severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand});
  }

  deleteCar(car: Car) {
    let index = -1;
    for(let i = 0; i < this.cars.length; i++) {
      if(this.cars[i].vin == car.vin) {
        index = i;
        break;
      }
    }
    this.cars.splice(index, 1);

    //this.msgs = [];
   // this.msgs.push({severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand});
  }


}
