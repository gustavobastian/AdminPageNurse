import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-stats-patient',
  templateUrl: './stats-patient.page.html',
  styleUrls: ['./stats-patient.page.scss'],
})
export class StatsPatientPage implements OnInit {
  private data: Array<String> = new Array<String>();
  private selection=0;


    constructor(
    private statisticsServ: StatisticsService
  ) { }

  ngOnInit() {
    
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

  onClickG(){
    this.selection=1;
    this.getAllPatientsStats();
  }
  onClickI(){
    this.selection=2;
  }
}
