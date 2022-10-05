import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginPageModule } from "./pages/login/login.module";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: "Login", url: "/folder/Login", icon: "person" },
    { title: "MQTT", url: "/folder/Mqtt", icon: "wifi" },
    { title: "Monitoreo", url: "/folder/Monitoreo", icon: "Desktop" },
    { title: "Camas", url: "/folder/Camas", icon: "bed" },
    { title: "Usuarios", url: "/folder/Usuarios", icon: "people" },
    { title: "Pacientes", url: "/folder/Pacientes", icon: "medkit" },
    { title: "Log Eventos", url: "/folder/LogEventos", icon: "mail" },
    { title: "Calendario", url: "/folder/Calendario", icon: "calendar" },
    { title: "Estadística", url: "/folder/Estadística", icon: "bar-chart" },
    { title: "Especialidades/tratamiento", url: "/folder/Especialidades", icon: "school" }
  ];
  id=""
  

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    
    this.activatedRoute.url.subscribe(url =>{
    
      console.log(url);
    });
  
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("");    
    
  }
}
