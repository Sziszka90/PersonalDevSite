import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GetInTouchComponent } from '../get-in-touch/get-in-touch.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, GetInTouchComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private snackBar = inject(MatSnackBar);

  public contactForm = this.emptyForm;

  private SERVICE_ID: string = 'service_jd58cqm';
  private TEMPLATE_ID = 'template_2wtrvog';
  private PUBLIC_KEY = '_B1ptn34RZJVxTjjU';

  get emptyForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.pattern(/^\+?\d{1,3}?[-. ]?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onSubmit() {
    this.sendEmail();
    this.contactForm = this.emptyForm;
  }

  public sendEmail() {
    const templateParams = {
      from_name: this.contactForm.value.name,
      from_email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then((response) => {
        console.log('Email sent successfully', response);
        this.showToast('Email sent successfully') 
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        this.showToast('Error sending email:' + error) 
      });
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
