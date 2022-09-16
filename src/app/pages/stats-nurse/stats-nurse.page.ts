import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

import * as HighCharts from 'highcharts';
import { count } from 'console';


@Component({
  selector: 'app-stats-nurse',
  templateUrl: './stats-nurse.page.html',
  styleUrls: ['./stats-nurse.page.scss'],
})
export class StatsNursePage implements OnInit {
  private data: Array<String> = new Array<String>();
  private selection=0;
  
  constructor(
    private statisticsServ: StatisticsService
  ) { }

  ngOnInit() {
  }
  async getAllNurseStats() {
    console.log("here!")
    let dataLocal=JSON.stringify(await this.statisticsServ.getStatsAllNurse());
    console.log(JSON.stringify(dataLocal));
    let data2=JSON.parse(dataLocal)
    this.data=[]
    data2.forEach(element => {      
      this.data.push(element);
    });
    
    
  }

 async onClickG(){
    this.selection=1;
   await this.getAllNurseStats();
   await this.barChartUsers(this.data);
  }
  onClickI(){
    this.selection=2;
  }

  //chart events
  
  ionViewDidEnter() {
    this.barChartPopulation();
    this.pieChartBrowser();
  }

  barChartPopulation() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
      }]
    });
  }
  pieChartBrowser() {
    HighCharts.chart('pieChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in October, 2019'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }

 public barChartUsers(users: Array<String>){
    let ident=[] 
    let counts=[]
    users.forEach(element => {
      
      console.log(JSON.stringify(element))
      let elementlocal=JSON.parse(JSON.stringify(element));
      if(elementlocal.userID!=0 && elementlocal.userId!=15)
        {ident.push((elementlocal.userID).toString());
         counts.push(parseInt(elementlocal.cn));}
    });
    HighCharts.chart('barChart2', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Eventos atendidos'
      },
      xAxis: {
        categories: ident,
        title: {
          text: 'Nro de enfermera',
          align: 'high'
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Contador visitas',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' '
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Visitas',
        data: counts
      },]
    });
  }

}
