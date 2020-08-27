import { Component, OnInit } from '@angular/core';
import * as braintree from 'braintree-web';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  hostedFieldsInstance: braintree.HostedFields;
  cardholdersName: string;

  constructor() {}

  ngOnInit(): void {
    this.createBraintreeUI();
  }

  createBraintreeUI() {
    braintree.client
      .create({
        authorization: 'CLIENT_AUTHORIZATION',
      })
      .then((clientInstance) => {
        braintree.hostedFields.create({
          client: clientInstance,
          styles: {},

          fields: {
            number: {
              selector: '#card-number',
              placeholder: '111'
            },
            expirationData: {
              selector: '#expiration-date',
              placeholder: "MM/yy"
            }
          }
        }).then ((hostedFieldsInstance)=> {
          this.hostedFieldsInstance = hostedFieldsInstance;

          hostedFieldsInstance.on('focus', (event)=>{
            const field = event.fields[event.emittedBy];
            const label = this.findLabel(field);
            label.classList.remove('filled');
          });

          hostedFieldsInstance.on('blur', (event)=> {
            const field = event.field[event.emittedBy];
            const label = this.findLabel(field);
          })

          hostedFieldsInstance.on('empty', (event)=> {
            const field = event.fields[event.emittedBy];
          });

          hostedFieldsInstance.on('validityChange', (event)=> {
            const field = event.fields[event.emittedBy];
            const label = this.findLabel(field);
            if(field.isPotentiallyValid){
              label.classList.remove('invalid');
            }
            else {
              label.classList.add('invalid')
            }
          });
        });
      });
  }

  tokenizeUserDetails(){
    this.hostedFieldsInstance.tokenize({cardholderName: this.cardholdersName}).then((payload)=>{
      console.log(payload);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  findLabel(field: braintree.HostedFieldsHostedFieldsFieldData){
    return document.querySelector('.hosted-field--label[for="' + field.container.id + '"]');
  }

}
