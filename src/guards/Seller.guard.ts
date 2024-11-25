import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { createSellerUsersService } from "../app/Pages/Auth/users.service";
export const sellerGuard = () =>{
    const router = inject(Router);

    const usersService = inject(createSellerUsersService);

    if(usersService.isStatusSeller()){
        return true;
    }else{
        router.navigate(['/loginSeller']);
        return false;
    }

}

