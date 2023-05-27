import * as React from 'react';
//import style from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';


import {
  SPHttpClient,
   SPHttpClientResponse,
   } from '@microsoft/sp-http';
//import styles from '../../helloWorld/components/HelloWorld.module.scss';

interface EmpList {
  Title:string;
  BirthDate:any;
  Address:string;
  ID:Number;
  
}

interface ArrayList{
  allEmp: EmpList[];

}


export default class HelloWorld extends React.Component<IHelloWorldProps, ArrayList> {
  constructor(props:IHelloWorldProps, state:ArrayList){
    super(props)
    this.state={
      allEmp : [],
    }
  }

componentDidMount(): void {
  console.log("Componant did called");
  this.getAllEmployeeDetails();
}

public getAllEmployeeDetails =() =>{
  console.log("Employee Details Function called...");
  

  let listurl = this.props.siteAbsoluteURL + "/_api/lists/getbytitle('EmployeeList')/items";
  console.log(listurl);
  this.props.context.spHttpClient.get(listurl,  
    SPHttpClient.configurations.v1)  
    .then((response: SPHttpClientResponse) => {  
      response.json().then((responseJSON: any) => {  
       // console.log(responseJSON);  
       this.setState({
        allEmp:responseJSON.value,
       });
       console.log(this.state.allEmp);

      
      });  
    });  
};

  public render(): React.ReactElement<IHelloWorldProps> {
    

    return (
      <div>
        <h1>Enter List Name: {this.props.listName}</h1>
        {/*
          this.state.allEmp.map(emp=>{
            return(

              <>
               <h1>{emp.Title}</h1>
               <h1>{emp.ID}</h1>
               <h1>{emp.Address}</h1>
               <h1>{emp.BirthDate}</h1>
               <hr />
              
              </>
            );
          })
        */}

        <table>
          <tr>
            <td>Title</td>
            <td>ID</td>
            <td>Address</td>
            <td>BirthDate</td>
          </tr>
          {this.state.allEmp.map((emp)=>{
            return(
              <tr>
              <td>{emp.Title}</td>
              <td>{emp.ID}</td>
              <td>{emp.Address}</td>
              <td>{emp.BirthDate}</td>
            </tr>
            );
          })}
        </table>

      </div>
    );
  }
}
