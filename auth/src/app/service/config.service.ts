import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface INavItem {
  url: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = `http://localhost:3000/`;

  navItems$: BehaviorSubject<INavItem[]> = new BehaviorSubject<INavItem[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  bootstrap(): () => void {
    return (): void => {
      this.http.get<INavItem[]>(`${this.apiUrl}navItems`).subscribe(
        (res: any) => {
          this.navItems$.next(res);
        },
        (err: any) => {
          this.navItems$.next([
            {url: '/', text: 'Home'}
          ]);
          console.log(err);
        }
      );
    }
  }
}
