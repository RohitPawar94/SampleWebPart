import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'Helloworld2WebPartStrings';
import Helloworld2 from './components/Helloworld2';
import { IHelloworld2Props } from './components/IHelloworld2Props';

export interface IHelloworld2WebPartProps {
  description: string;
  getUserName:string;
  getUserAge:number;
  selectCar:any;
  isMarried:boolean;
  listName:string;
}

export default class Helloworld2WebPart extends BaseClientSideWebPart<IHelloworld2WebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IHelloworld2Props> = React.createElement(
      Helloworld2,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        siteTitle: this.context.pageContext.web.title,
        getUserName: this.properties.getUserName,
        getUserAge: this.properties.getUserAge,
        selectCar:this.properties.selectCar,
        isMarried:this.properties.isMarried,
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          
          groups: [
            {
             
              groupFields: 
              [PropertyPaneTextField("getUserName",
                {
                  label:"Enter Your Full Name:"
                }),
                   PropertyPaneSlider("getUserAge", 
                 {
                    label:"Select Your Age:",
                    min:20,
                    max:75
                  }),
                PropertyPaneChoiceGroup("selectCar",
                {
                  label:"Select Car",
                  options: [
                    {
                      key: 1,
                      text: "Car 1",
                    },
                    {
                      key: 2,
                      text: "Car 2",
                    },
                    {
                      key: 3,
                      text: "Car 3",
                    },
                  ]
                }),
                PropertyPaneToggle("isMarried",
                {
                  label:"Is Married:",
                  onText: "Yes",
                  offText:"No",
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
