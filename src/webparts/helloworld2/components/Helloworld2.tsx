import * as React from 'react';
//import styles from './Helloworld2.module.scss';
import { IHelloworld2Props } from './IHelloworld2Props';
//import { escape } from '@microsoft/sp-lodash-subset';

export default class Helloworld2 extends React.Component<IHelloworld2Props, {}> {
  public render(): React.ReactElement<IHelloworld2Props> {
    
    return (
      <div>
        <h1>Hiii Rohit, You are in helloWorld2 webpart</h1>
        <h2>{this.props.userDisplayName}</h2>
        <h2>{this.props.siteUrl}</h2>
        <h2>{this.props.siteTitle}</h2>
        <h3>User Properties:</h3>
        <h4>User Name: {this.props.getUserName}</h4>
        <h4>User Age: {this.props.getUserAge}</h4>
        <h4>Select Car: {this.props.selectCar}</h4>
        <h4>Is Married:{ } {this.props.isMarried ? "Yes":"No"} </h4>

        
        
      </div>
    );
  }
}
