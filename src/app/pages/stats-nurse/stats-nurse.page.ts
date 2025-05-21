import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

import * as HighCharts from 'highcharts';
import { count } from 'console';


@Component({
  selector: 'app-stats-nurse',
  templateUrl: './stats-nurse.page.html',
  styleUrls: ['./stats-nurse.page.scss'],
})
export class StatsNursePage  {
  public data: Array<String> = new Array<String>();
  public dataNurseProm: Array<String> = new Array<String>();
  public selection=0;
  public totalNurseSpec=0;
  constructor(
    public statisticsServ: StatisticsService
  ) { }

  
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

  async getAllNurseSpecs() {
    console.log("here!")
    this.totalNurseSpec=0;
    let dataLocal=JSON.stringify(await this.statisticsServ.getStatsAllNurseSpec());
    console.log(JSON.stringify(dataLocal));
    let data2=JSON.parse(dataLocal)
    this.dataNurseProm=[]
    data2.forEach(element => {      
      this.dataNurseProm.push(element);
      this.totalNurseSpec+=parseInt(element.cn);
    });
    
    
  }
  

 async onClickG(){
    this.selection=1;
   this.getAllNurseStats();
   this.barChartUsers(this.data);
   this.getAllNurseSpecs();
   this.pieChartNurseSpec();
  }
  onClickI(){
    this.selection=2;
  }

  //chart events
  
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

 public pieChartNurseSpec() {
    let localSeries=[]
    
    this.dataNurseProm.forEach(element => {
      let elementLocal=JSON.parse(JSON.stringify(element))
      console.log(elementLocal.name)
      localSeries.push({
        name: elementLocal.name,
        y: elementLocal.cn/this.totalNurseSpec,
      })

    });
    console.log("series:"+JSON.stringify(localSeries))
     HighCharts.chart('pieChartSpec', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Especialidades de enfermeras'
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
        name: 'Tipo de tratamiento',
        colorByPoint: true,
        type: undefined,
        data: localSeries
      }]
    });
  }
}
