import { Component,OnInit} from '@angular/core';
import { AreaPicker} from 'dolphinng';
@Component({
    selector: 'list-demo',
    templateUrl: './list-demo.component.html',
    styleUrls: ['./list-demo.component.less'],
})
export class ListDemoComponent implements OnInit{
  startTime:string='';
  endTime:string='';
  date:string='2017年08月01日';
  date1:string='';
  dateTime:string='2017年8月01日';
  data:any[];
  address:string='';
  areaPicker:AreaPicker=new AreaPicker();
  constructor(){
    this.areaPicker.items = [{
      label: '省份',
      key: 'name',
      data: [],
      selected: (data)=> {
        setTimeout(()=>{
          this.areaPicker.setData([{
            name: '广州'
          },{
            name: '阳江'
          },{
            name: '佛山'
          }]);
        },500);
      }
    },{
      label: '城市',
      key: 'name',
      data: [],
      selected: (data)=> {
        setTimeout(()=>{
          this.areaPicker.setData([{
            name: '天河区'
          },{
            name: '海珠区'
          },{
            name: '番禺区'
          }]);
        },500);
      }
    },{
      label: '地区',
      key: 'name',
      data: [],
      selected: (data)=> {
      }
    }];
    this.areaPicker.init=()=>{
      setTimeout(()=>{
        this.areaPicker.setData([{
          name: '广东省'
        },{
          name: '广西壮族自治区'
        },{
          name: '日本省'
        }]);
      },500);
    };
    this.areaPicker.done=(values)=>{
      console.log(values);
    };
  }

  ngOnInit() {
    this.data=[
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
      {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
      {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
      {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff1"}
    ];
  }
  search(){
    console.log('search...');
    console.log(this.date);
  }

}
