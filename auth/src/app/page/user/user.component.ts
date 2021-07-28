import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList$: Observable<User[]> = this.userService.getAll();
  columns$: BehaviorSubject<ITableColumn[]> = this.configService.userTableColumns$;
  roleNames: string[] = ['visitor', 'viewer', 'editor', 'admin'];
  searchPhrase: string = '';

  constructor(
    private userService: UserService,
    public configService: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  getRoleName(roleId: number | undefined): string {
    return roleId ? this.roleNames[roleId] : this.roleNames[0];
  }
}
