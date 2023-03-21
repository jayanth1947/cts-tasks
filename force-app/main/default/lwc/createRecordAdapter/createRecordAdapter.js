import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import NAME_FIELD from '@salesforce/schema/Account.Name';
// import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
// import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
export default class CreateRecordAdapter extends LightningElement {

    accountFields = {};

    handleInputChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.accountFields[fieldName] = fieldValue;
    }

    handleSave() {
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields: this.accountFields };
        createRecord(recordInput)
            .then(account => {
                this.showToast('Success', `Account created with Id: ${account.id}`);
                this.resetForm();
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    resetForm() {
        const inputFields = this.template.querySelectorAll('lightning-input');
        if (inputFields) {
            inputFields.forEach(field => {
                field.value = null;
            });
        }
        this.accountFields = {};
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant || 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}