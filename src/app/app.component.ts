import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [
        // RouterOutlet,
        MatSidenavModule,
        // NgIf
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    email: string = 'alexandredevsantos@gmail.com';


    router = inject(Router)

    navegaGithub() {
        window.open("https://github.com/alexantos", "_blank");
    }

    navegaLinkedin() {
        window.open("https://www.linkedin.com/in/alexandre-santos-developer/", "_blank");
    }

    navegaWhatsapp() {
        this.router.navigate(['whatsapp']);
    }

    navegaLocalidade() {
        window.open("https://maps.app.goo.gl/8TEX7Dk89SwZgZhz5", "_blank");
    }

    navegaCurriculo() {
        let link = document.createElement("a");
        link.download = "Currículo Alexandre Santos.pdf";
        link.href = "curriculo/cv_alexantos.pdf";
        link.click();
    }

    navegaEmail() {
        this.prepareEmail(this.email, '', '')
    }

    prepareEmail(to: any, subject: any, bodyText: any) {
        var form = document.createElement('form');
        
        //Set the form attributes 
        form.setAttribute('method', 'post');
        form.setAttribute('enctype', 'text/plain');
        form.setAttribute('action', 'mailto:' + escape(to) + '?Subject=' + escape(subject) + '&Body=' + escape(bodyText ? bodyText : ' ') );
        form.setAttribute('style', 'display:none');
        
        //Append the form to the body
        document.body.appendChild(form);
    
        //Submit the form
        form.submit();
        
        //Clean up
        document.body.removeChild(form);
    }

    navegaPxnutri() {
        window.open("https://pxnutri.com.br", "_blank");
    }
}
