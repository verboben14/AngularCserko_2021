import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObjectName: string = 'currentUser';
  private currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject$.asObservable();
  get currentUserValue(): User | null {
    return this.currentUserSubject$.getValue();
  }
  lastToken: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private config: ConfigService,
  ) {
    const localUser = sessionStorage.getItem(this.userObjectName);
    if (localUser)
    {
      const user: User = JSON.parse(localUser);
      this.currentUserSubject$.next(user);
    }
  }

  login(): void {
    sessionStorage.setItem(this.userObjectName, this.lastToken);
  }

  logOut(): void {

  }
}
