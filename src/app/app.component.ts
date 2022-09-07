import { Component } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public appPages = [
    { title: "Camas", url: "/folder/Camas", icon: "bed" },
    { title: "Usuarios", url: "/folder/Usuarios", icon: "person" },
    { title: "Pacientes", url: "/folder/Pacientes", icon: "medkit" },
    { title: "Log Eventos", url: "/folder/LogEventos", icon: "mail" },
    { title: "Eventos", url: "/folder/Calendario", icon: "calendar" },
    { title: "Estadística", url: "/folder/Estadística", icon: "bar-chart" }
  ];

  constructor() {}
}
