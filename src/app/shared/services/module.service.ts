import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// model section
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  modules: Module[];
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.apiURL}/modules`);
  }

  get(id: number): Observable<Module> {
    return this.http.get<Module>(`${environment.apiURL}/modules/${id}`);
  }

  getModules() {
    this.getAll().subscribe(
      (modules: Module[]) => {
        this.modules = modules;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getModule(id: number): string {
    for (let module of this.modules) {
      if (module.id === id) {
        return module.name;
      }
    }
    return '';
  }
}
