import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent{

    public isLoginMode = true;
    public errorMessage: string | null = null;

    constructor( private authService: AuthService){}
    
    public onSubmit(form: NgForm){

        let authObs;
        if (this.isLoginMode){
            authObs = this.authService.login(form.value.email, form.value.password);
        } else {
            authObs = this.authService.register(form.value.email, form.value.password);
        }

        authObs.subscribe({
            next: () => { this.errorMessage = null },
            error: (error) => { this.errorMessage = error.message}
        })

        console.log(form.value);
        this.authService.register(form.value.email, form.value.password).subscribe(res => console.log(res));
    }

    public onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }


}
