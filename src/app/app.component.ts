import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [    
    { title: 'Camas', url: '/folder/Camas', icon: 'bed' },
    { title: 'Usuarios', url: '/folder/Usuarios', icon: 'person' },
    { title: 'Pacientes', url: '/folder/Pacientes', icon: 'medkit' },        
    { title: 'Mensajes', url: '/folder/Mensajes', icon: 'mail' },
  ];
  
  constructor() {}
}
