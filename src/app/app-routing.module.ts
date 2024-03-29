import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";



const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import("./folder/folder.module").then((m) => m.FolderPageModule),
    //redirectTo: "folder/Login", //'loging',//'folder/:id',
    //loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
    
  },
  
  {
    path: "main",
    redirectTo: "folder/Login", //'loging',//'folder/:id',
    
  },  
  {
    path: "folder/:id", //'folder/:id',
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "Login", //'folder/:id',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },    
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'pacient/:id',
    loadChildren: () => import('./pages/patient/patient.module').then( m => m.PatientPageModule)
  },
  {
    path: 'beds/:id',
    loadChildren: () => import('./pages/beds/beds.module').then( m => m.BedsPageModule)
  },
  {
    path: 'scheduler/:id',
    loadChildren: () => import('./pages/scheduler/scheduler.module').then( m => m.SchedulerPageModule)
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'stats-nurse',
    loadChildren: () => import('./pages/stats-nurse/stats-nurse.module').then( m => m.StatsNursePageModule)
  },
  {
    path: 'stats-patient',
    loadChildren: () => import('./pages/stats-patient/stats-patient.module').then( m => m.StatsPatientPageModule)
  },
  {
    path: 'mqtt-config',
    loadChildren: () => import('./pages/mqtt-config/mqtt-config.module').then( m => m.MqttConfigPageModule)
  },
  {
    path: 'tabla-spec-treat',
    loadChildren: () => import('./pages/tabla-spec-treat/tabla-spec-treat.module').then( m => m.TablaSpecTreatPageModule)
  },
  {
    path: 'monitoring/:id',
    loadChildren: () => import('./pages/monitoring/monitoring.module').then( m => m.MonitoringPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
