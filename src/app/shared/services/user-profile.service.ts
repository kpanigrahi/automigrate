import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// model section
import { UserProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userProfiles: UserProfile[];
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.apiURL}/profiles`);
  }

  get(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiURL}/profiles/${id}`);
  }

  getUserProfiles() {
    this.getAll().subscribe(
      (userProfiles: UserProfile[]) => {
        this.userProfiles = userProfiles;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUserProfile(id: number): string {
    for (let userProfile of this.userProfiles) {
      if (userProfile.id === id) {
        return userProfile.name;
      }
    }
    return '';
  }
}
