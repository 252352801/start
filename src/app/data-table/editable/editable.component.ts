import { Component,OnInit,Injectable} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {SelectItem} from 'primeng/primeng';
@Component({
  selector: 'editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.less'],
  providers:[CarService]
})
@Injectable()
export class EditableComponent implements OnInit {
  cars: Car[];
  brands: SelectItem[];

  colors: SelectItem[];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,20);

    this.brands = [];
    this.brands.push({label: 'All Brands', value: null});
    this.brands.push({label: 'Audi', value: 'Audi'});
    this.brands.push({label: 'BMW', value: 'BMW'});
    this.brands.push({label: 'Fiat', value: 'Fiat'});
    this.brands.push({label: 'Honda', value: 'Honda'});
    this.brands.push({label: 'Jaguar', value: 'Jaguar'});
    this.brands.push({label: 'Mercedes', value: 'Mercedes'});
    this.brands.push({label: 'Renault', value: 'Renault'});
    this.brands.push({label: 'VW', value: 'VW'});
    this.brands.push({label: 'Volvo', value: 'Volvo'});
  }
}
