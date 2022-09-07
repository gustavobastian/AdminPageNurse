import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

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

  onClickG(){
    this.selection=1;
    this.getAllNurseStats();
  }
  onClickI(){
    this.selection=2;
  }
}
