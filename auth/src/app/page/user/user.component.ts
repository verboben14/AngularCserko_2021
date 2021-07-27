import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList$: Observable<User[]> = this.userService.getAll();
  roleNames: string[] = ['visitor', 'viewer', 'editor', 'admin'];
  searchPhrase: string = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  getRoleName(roleId: number | undefined): string {
    return roleId ? this.roleNames[roleId] : this.roleNames[0];
  }
}
