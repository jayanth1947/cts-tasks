import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
// imports the Account object schema
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
// imports the toast event module
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// imports the navigation mixin
import { NavigationMixin } from 'lightning/navigation';

export default class CreateRecordAdapter extends NavigationMixin(LightningElement) {
    // creates an empty object to hold the Account's field values
    accountFields = {};

    // creates an array of options for the Account Source field
    accountSourceOptions = [
        { label: 'Web', value: 'Web' },
        { label: 'Phone Inquiry', value: 'Phone Inquiry' },
        { label: 'Partner Referral', value: 'Partner Referral' },
        { label: 'Purchased List', value: 'Purchased List' },
        { label: 'Other', value: 'Other' }
    ];

    // handles changes to the form's input fields
    handleInputChange(event) {
        // gets the name of the field that triggered the event
        const fieldName = event.target.name;
        // gets the value of the field that triggered the event
        const fieldValue = event.target.value;
        // updates the accountFields object with the new field value
        this.accountFields[fieldName] = fieldValue;
    }

    // handles the save button click event
    handleSave() {
        // creates a new record with the Account object schema and the field values captured in the input form
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields: this.accountFields };
        // calls the createRecord function from the Lightning UI API to create the new record
        createRecord(recordInput)
            // if the record is created successfully, displays a success message and navigates to the Account list view
            .then(account => {
                this.showToast('Success', `Account created with Id: ${account.id}`);
                //this.resetForm();
                this.navigateToListView();
                
            })
            // if an error occurs during record creation, displays an error message
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

     // handles the cancel button click event   
    handleCancel() {
        this.navigateToListView();
    }

    // navigates to the Account list view
    navigateToListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        });
    }

    // displays a toast message
    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant || 'success'
        });

        // dispatches the toast event to display the message
        this.dispatchEvent(toastEvent);
    }
}

