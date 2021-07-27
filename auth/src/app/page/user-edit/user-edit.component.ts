import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { USER_INFO, USER_PROVIDER } from 'src/app/providers/user.provider';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [USER_PROVIDER]
})
export class UserEditComponent implements OnInit {

  lastError: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(USER_INFO) public user$: Observable<User>
  ) { }

  ngOnInit(): void {
  }

  onSave(ngForm: NgForm, id: number): void {
    ngForm.value.role = parseInt(ngForm.value.role);
    const user = {...ngForm.value, ...{id}};
    this.userService.update(user).subscribe(
      () => this.router.navigate(['/', 'user']),
      err => {
        this.lastError = err.message,
        console.log(err)
      }
    );
  }
}
