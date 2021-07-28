import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexMapperPipe } from '../pipe/index-mapper.pipe';

export interface ISettings {
  navItems: INavItem[];
  userTableColumns: ITableColumn[];
  roles: string[];
}

export interface INavItem {
  url: string;
  text: string;
}

export interface ITableColumn {
  key: string;
  title: string;
  pipes?: string[];
  pipeObjects?: (IndexMapperPipe | undefined)[],
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = `http://localhost:3000/`;

  navItems$: BehaviorSubject<INavItem[]> = new BehaviorSubject<INavItem[]>([]);
  userTableColumns$: BehaviorSubject<ITableColumn[]> = new BehaviorSubject<ITableColumn[]>([
    {key: 'id', title: '#'}
  ]);
  roles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  bootstrap(): () => void {
    return (): void => {
      this.http.get<ISettings>(`${this.apiUrl}settings`).subscribe(
        (settings) => {
          this.navItems$.next(settings.navItems);
          const columns = settings.userTableColumns.map(col => col.pipes?.map(p => this.getPipe(p)));
          settings.userTableColumns.forEach((utc, index) => utc.pipeObjects = columns[index]);
          this.userTableColumns$.next(settings.userTableColumns);
          this.roles$.next(settings.roles);
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

  getPipe(name: string) {
    return {
      RolePipe: new IndexMapperPipe(this.roles$.value),
    }[name];
  }
}
