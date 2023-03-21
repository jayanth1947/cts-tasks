import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordAdapterCreate extends NavigationMixin(LightningElement) {
    record = { apiName: ACCOUNT_OBJECT.objectApiName };
    fields = {};

    handleFieldChange(event) {
        const fieldName = event.target.fieldName;
        const value = event.target.value;
        this.fields[fieldName] = value;
    }

    handleSave() {
        const recordInput = { apiName: this.record.apiName, fields: this.fields };
        createRecord(recordInput)
            .then(account => {
                this.dispatchEvent(new CustomEvent('accountcreated'));
               this.showToast('Success', `Account created with Id: ${account.id}`,'success');
                this.navigateToListView();
            })
            .catch(error => {
                if (error && error.body && error.body.message) {
                    // Access the error message
                    const errorMessage = error.body.message;
                    // Handle the error
                    this.showToast("Error while creating", errorMessage, 'error');
                } else {
                    // Handle any other errors
                    this.showToast("Error while creating", "Unknown error", 'error');
                }
            });
    }

    handleCancel() {
        this.navigateToListView();
    }

    navigateToListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({ title, message, variant });
        this.dispatchEvent(toastEvent);
    }

    
}
