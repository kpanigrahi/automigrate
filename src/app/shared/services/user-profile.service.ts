import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient } from '@angular/common/http';

// model section
import { UserProfile } from '../models/userProfile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.apiURL}/profiles`);
  }

  get(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiURL}/profiles/${id}`);
  }
}
