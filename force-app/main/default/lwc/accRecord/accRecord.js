import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
export default class AccRecord extends LightningElement {

    @api recordId
    @api objectApiName
    @api fieldName
    objectApiName=ACCOUNT_OBJECT
    fieldName=[NAME_FIELD,TYPE_FIELD,INDUSTRY_FIELD,ANNUALREVENUE_FIELD]

    successHandler(event){
        console.log(event.detail.id)
        const closeEvent=new ShowToastEvent({
            title:"Account Created",
            message:"Record Id :" + event.detail.id,
            variant:"success"
        })
        this.dispatchEvent(closeEvent)
    }
}