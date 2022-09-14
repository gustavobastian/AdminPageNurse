import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: '',
    redirectTo: 'login',pathMatch:'full',
    
  },
  /*{
    path: "main",
    redirectTo: "folder/" + "Camas", //'loging',//'folder/:id',
    
  },*/
  {
    path: "folder/:id", //'folder/:id',
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },  
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'pacient/:id',
    loadChildren: () => import('./pages/pacient/pacient.module').then( m => m.PacientPageModule)
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
    path: 'stats-pacient',
    loadChildren: () => import('./pages/stats-pacient/stats-pacient.module').then( m => m.StatsPacientPageModule)
  },
  {
    path: 'mqtt-config',
    loadChildren: () => import('./pages/mqtt-config/mqtt-config.module').then( m => m.MqttConfigPageModule)
  },
  {
    path: 'tabla-spec-treat',
    loadChildren: () => import('./pages/tabla-spec-treat/tabla-spec-treat.module').then( m => m.TablaSpecTreatPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
