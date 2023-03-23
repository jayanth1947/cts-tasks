import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import BILLING_STREET_FIELD from '@salesforce/schema/Account.BillingStreet';
import BILLING_CITY_FIELD from '@salesforce/schema/Account.BillingCity';
import BILLING_STATE_FIELD from '@salesforce/schema/Account.BillingState';
import BILLING_POSTALCODE_FIELD from '@salesforce/schema/Account.BillingPostalCode';
import BILLING_COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountry';

import ACCOUNT_SOURCE_FIELD from '@salesforce/schema/Account.AccountSource';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class AccRecord extends NavigationMixin(LightningElement) {
    // Track the values of the input fields
    @track accountName;
    @track billingStreet;
    @track billingCity;
    @track billingState;
    @track billingCountry;
    @track billingPostalCode;
    @track accountSource;
    @track annualRevenue;
    @track website;

    // Options for the Account Source combobox
    accountSourceOptions = [
        { label: 'Web', value: 'Web' },
        { label: 'Phone Inquiry', value: 'Phone Inquiry' },
        { label: 'Partner Referral', value: 'Partner Referral' },
        { label: 'Other', value: 'Other' },
    ];

    // Handle input field changes and update the corresponding tracked value
    handleInputChange(event) {
        const fieldName = event.target.label.toLowerCase().replace(' ', '');
        this[fieldName] = event.target.value;
    }

    // Handle Account Source combobox change and update the tracked value
    handleAccountSourceChange(event) {
        this.accountSource = event.detail.value;
    }

    // Handle Save button click
    handleSaveClick() {
        // Create the new account record
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[BILLING_STREET_FIELD.fieldApiName] = this.billingStreet;
        fields[BILLING_CITY_FIELD.fieldApiName] = this.billingCity;
        fields[BILLING_STATE_FIELD.fieldApiName] = this.billingState;
        fields[BILLING_COUNTRY_FIELD.fieldApiName] = this.billingCountry;
        fields[BILLING_POSTALCODE_FIELD.fieldApiName] = this.billingPostalCode;

        fields[ACCOUNT_SOURCE_FIELD.fieldApiName] = this.accountSource;
        fields[ANNUAL_REVENUE_FIELD.fieldApiName] = this.annualRevenue;
        fields[WEBSITE_FIELD.fieldApiName] = this.website;
        
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        try {
            const newRecord =  createRecord(recordInput);
            // Show success message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success',
                }),
            );
            // Navigate to the new account's detail page
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: newRecord.id,
                    objectApiName: ACCOUNT_OBJECT.objectApiName,
                    actionName: 'view',
                },
            });
        } catch (error) {
            // Show error message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating account',
                    message: reduceErrors(error).join(', '),
                    variant: 'error',
                }),
            );
        }
    }
}
    