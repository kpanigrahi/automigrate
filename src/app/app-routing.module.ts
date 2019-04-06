import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './ui/profile/profile.component';
import { SettingsComponent } from './ui/settings/settings.component';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: './ui/items/items.module#ItemsModule'
  }, {
    path: 'projects',
    loadChildren: './ui/projects/projects.module#ProjectsModule'
  }, {
    path: 'migrations',
    loadChildren: './ui/migrations/migrations.module#MigrationsModule'
  }, {
    path: 'reports',
    loadChildren: './ui/reports/reports.module#ReportsModule'
  }, {
    path: 'settings',
    component: SettingsComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
