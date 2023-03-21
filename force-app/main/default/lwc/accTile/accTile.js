import ACCOUNT_OBJECT from '@salesforce/schema/Account'; 

  

import { NavigationMixin } from 'lightning/navigation'; 

export default class AccTile extends NavigationMixin(LightningElement) { 

    objectApiName=ACCOUNT_OBJECT 

    handleSuccess(event) { 

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

} 

 