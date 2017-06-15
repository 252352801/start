import { Component,OnInit,Injectable} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../domain/car.service';
import {SelectItem} from 'primeng/primeng';
@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
  providers:[CarService]
})
@Injectable()
export class FilterComponent implements OnInit {
  cars: Car[];

  brands: SelectItem[];

  colors: SelectItem[];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars=this.carService.getCarsSmall().slice(0,10);


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

    this.colors = [];
    this.colors.push({label: 'White', value: 'White'});
    this.colors.push({label: 'Green', value: 'Green'});
    this.colors.push({label: 'Silver', value: 'Silver'});
    this.colors.push({label: 'Black', value: 'Black'});
    this.colors.push({label: 'Red', value: 'Red'});
    this.colors.push({label: 'Maroon', value: 'Maroon'});
    this.colors.push({label: 'Brown', value: 'Brown'});
    this.colors.push({label: 'Orange', value: 'Orange'});
    this.colors.push({label: 'Blue', value: 'Blue'});
  }
}
