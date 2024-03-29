import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import BILLINGSTREET_FIELD from '@salesforce/schema/Account.BillingStreet';
import BILLINGCITY_FIELD from '@salesforce/schema/Account.BillingCity';
import BILLINGSTATE_FIELD from '@salesforce/schema/Account.BillingState';
import BILLINGPOSTAL_FIELD from '@salesforce/schema/Account.BillingPostalCode';
import BILLINGCOUNTRY_FIELD from '@salesforce/schema/Account.BillingCountry';
import { NavigationMixin } from 'lightning/navigation';
export default class AccountRecordEditForm extends NavigationMixin(LightningElement) {
    // Setting the object API name
    objectApiName=ACCOUNT_OBJECT

    // Setting the object API name
    fields={
        nameField:NAME_FIELD,
        billingStreet:BILLINGSTREET_FIELD,
        billingCity:BILLINGCITY_FIELD,
        billingState:BILLINGSTATE_FIELD,
        billingPostalCode:BILLINGPOSTAL_FIELD,
        billingCountry:BILLINGCOUNTRY_FIELD,
    }
    handleSuccess(event) {
        //console.log('Record is created successfully');
        // Record is created successfully
        // Redirect user to the Account List View page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        });
    }

    handleCancel() {
        // Redirect user to the Account List View page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        });
    }

   /* - This is used to go back to previous page in the browser
   
   handleclose(){
        setTimeout(
            function(){
                window.history.back();
            },
            1000
        );
    } */
}