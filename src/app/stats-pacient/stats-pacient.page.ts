import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-stats-pacient',
  templateUrl: './stats-pacient.page.html',
  styleUrls: ['./stats-pacient.page.scss'],
})
export class StatsPacientPage implements OnInit {
  private data: Array<String> = new Array<String>();
  private selection=0;


    constructor(
    private statisticsServ: StatisticsService
  ) { }

  ngOnInit() {
    
    this.selection=0;
  }
  async getAllPacientsStats() {
    console.log("here!")
    let dataLocal=JSON.stringify(await this.statisticsServ.getStatsAllPacient());
    console.log(JSON.stringify(dataLocal));
    let data2=JSON.parse(dataLocal)
    this.data=[]
    data2.forEach(element => {
      console.log(element.pacientID)
      console.log(element)
      this.data.push(element);
    });
    
  }

  onClickG(){
    this.selection=1;
    this.getAllPacientsStats();
  }
  onClickI(){
    this.selection=2;
  }
}
