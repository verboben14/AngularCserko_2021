import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../model/user";
import { UserService } from "../service/user.service";

const userFactory = (
  activatedRoute: ActivatedRoute,
  userService: UserService,
): Observable<User> => {
  return activatedRoute.params.pipe(
    switchMap(params => userService.get(params.id)));
}

export const USER_INFO = new InjectionToken<Observable<User>>('Providing the current user.');

export const USER_PROVIDER: Provider[] = [
  {
    provide: USER_INFO,
    deps: [ActivatedRoute, UserService],
    useFactory: userFactory,
  }
]
