// Importing the LightningElement from the LWC module
import { LightningElement } from 'lwc';

// Defining a class called BmiCalculator that extends LightningElement
export default class BmiCalculator extends LightningElement {

    // Initializing variables for height, weight, BMI value, and result
    height=''
    weight=''
    bmiValue=''
    result=''

     // A method that handles user input changes
    handleInput(){

        // Destructuring the name and value properties from the event target
        const {name,value}=event.target

         // Checking if the input name is 'height'
        if(name==='height'){
            this.height=value
        } 

        // Checking if the input name is 'weight'
        if(name==='weight'){
            this.weight=value
        }
    }

    // A method that handles form submissions
    handleSubmit(event){

         // Preventing the default form submission behavior
        event.preventDefault()
        // console.log('height',this.height); 
        // console.log('weight',this.weight);

        // Calling the calculate method
        this.calculate()
    }

    // A method that calculates the BMI value and result
    calculate(){

        // Converting the height value to meters by dividing it by 100
        let height=Number(this.height)/100;

        // Calculating the BMI value by dividing the weight by the square of the height
        let bmi=Number(this.weight)/(height*height);
        
        // Rounding the BMI value to 2 decimal places and assigning it to the bmiValue variable
        this.bmiValue=Number(bmi.toFixed(2));

        // Checking the BMI value and assigning the result based on the range it falls into
        if(this.bmiValue<18.5){
            this.result="UnderWeight";
        }

        else if(this.bmiValue>=18.5 && this.bmiValue<25){
            this.result="Healthy";
        }

        else if(this.bmiValue>=25 && this.bmiValue<30){
            this.result="OverWeight";
        }
        else{
            this.result="Obese"
        }

        // console.log("BMI is",this.bmiValue);
        // console.log("BMI is",this.result);
    }

    // A method that resets the input values and result
    recalculate(){
        this.height=''
        this.weight=''
        this.bmiValue=''
        this.result=''
    }
}