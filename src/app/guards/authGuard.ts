import { inject } from "@angular/core"
import { UserService } from "../services/user.service"
import { Router } from "@angular/router"

export const authGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)

  if (userService.islogged()) {
    return true;
  } else {
    router.navigateByUrl("/login")
    return false;
  }
}
