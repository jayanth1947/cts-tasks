import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateRecordAdapter extends NavigationMixin(LightningElement) {
    accountFields = {};

    accountSourceOptions = [
        { label: 'Web', value: 'Web' },
        { label: 'Phone Inquiry', value: 'Phone Inquiry' },
        { label: 'Partner Referral', value: 'Partner Referral' },
        { label: 'Purchased List', value: 'Purchased List' },
        { label: 'Other', value: 'Other' }
    ];

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
                //this.resetForm();
                this.navigateToListView();
                
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
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
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant || 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}
``
