import { Component,OnInit,Injectable} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {SelectItem} from 'primeng/primeng';
@Component({
  selector: 'col-toggler',
  templateUrl: './col-toggler.component.html',
  styleUrls: ['./col-toggler.component.less'],
  providers:[CarService]
})
@Injectable()
export class ColTogglerComponent implements OnInit {
  cars: Car[];
  cols: any[];
  columnOptions: SelectItem[];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,15);

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];

    this.columnOptions = [];
    for(let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
  }
}
