import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CanDeactivate, UrlTree } from '@angular/router';
import { StoryComponent } from './story/story.component';

@Injectable({
  providedIn: 'root'
})
export class StoryCanDeactivateGuard implements CanActivate, CanDeactivate<StoryComponent> {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canDeactivate(
    component: StoryComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!component.isSubmitted) {
      return window.confirm(
        `When switches, unsaved status is lost.\nReally want to change the path?`);
    }

    return true;
  }
}
