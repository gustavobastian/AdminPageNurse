import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-stats-patient',
  templateUrl: './stats-patient.page.html',
  styleUrls: ['./stats-patient.page.scss'],
})
export class StatsPatientPage implements OnInit {
  public data: Array<String> = new Array<String>();
  public dataTreatment: Array<String> = new Array<String>();
  public selection=0;
  public totalPatient=0;


    constructor(
      public statisticsServ: StatisticsService
  ) { }

  async ngOnInit() {
    
    this.selection=0;
   
  }
  async getAllPatientsStats() {
    console.log("here!")
    let dataLocal=JSON.stringify(await this.statisticsServ.getStatsAllPatient());
    console.log(JSON.stringify(dataLocal));
    let data2=JSON.parse(dataLocal)
    this.data=[]
    data2.forEach(element => {      
      this.data.push(element);
    });
    
  }
  async getAllPatientsTreatment() {
    console.log("here!")
    let dataLocal=JSON.stringify(await this.statisticsServ.getStatsAllTreatment());
    console.log(JSON.stringify(dataLocal));
    let data2=JSON.parse(dataLocal)
    this.dataTreatment=[]
    data2.forEach(element => {      
      this.dataTreatment.push(element);
      this.totalPatient+=parseInt(element.cn);
    });
    
  }
  

  async onClickG(){
    this.selection=1;
    this.getAllPatientsStats();
    await this.getAllPatientsTreatment();
    await this.pieChartPatientTreatment();
  }
  onClickI(){
    this.selection=2;
  }

  public pieChartPatientTreatment() {
    let localSeries=[]
    
    this.dataTreatment.forEach(element => {
      let elementLocal=JSON.parse(JSON.stringify(element))
      console.log(elementLocal.name)
      localSeries.push({
        name: elementLocal.name,
        y: elementLocal.cn/this.totalPatient,
      })

    });
    console.log("series:"+JSON.stringify(localSeries))
     HighCharts.chart('pieChartTreatment', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Pacientes segun tratamiento'
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
