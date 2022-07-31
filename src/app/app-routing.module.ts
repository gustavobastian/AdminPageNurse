import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./module/auth.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "folder/" + "Camas", //'loging',//'folder/:id',
    pathMatch: "full",
  },
  {
    path: "folder/:id", //'folder/:id',
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "loging",
    loadChildren: () =>
      import("./module/auth.module").then((m) => m.AuthModule),
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'pacient/:id',
    loadChildren: () => import('./pacient/pacient.module').then( m => m.PacientPageModule)
  },
  {
    path: 'beds/:id',
    loadChildren: () => import('./beds/beds.module').then( m => m.BedsPageModule)
  },
  {
    path: 'scheduler/:id',
    loadChildren: () => import('./scheduler/scheduler.module').then( m => m.SchedulerPageModule)
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
