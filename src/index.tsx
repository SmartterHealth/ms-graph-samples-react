import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import * as M from 'materialize-css'
import { DriveItemCardList, IDriveItem } from './components/drive-items'
import { OneDrivePanel } from './components/onderive-panel'

import { Header } from "./components/header";

import { AuthenticationProvider } from './authentication-provider'


const auth = AuthenticationProvider.getInstance();

interface IIndexProps {

}

interface IIndexState {
    driveItems: IDriveItem[];
}


class Index extends React.Component<IIndexProps, IIndexState> {
    constructor(props: IIndexProps) {
        super(props);
        this.state = ({
            driveItems: []
        });

        this.handleClick = this.handleClick.bind(this);
        this.handleRecentItemsTabClicked = this.handleRecentItemsTabClicked.bind(this);
        this.handlehandleSharedWithMeTabClicked = this.handlehandleSharedWithMeTabClicked.bind(this);
    }

    async handleRecentItemsTabClicked(e: React.MouseEvent) {
        this.setState({driveItems: []})
        const options = {
            authProvider: auth,
            scopes: ["https://graph.microsoft.com/.default"]
        }
        
        const client = MicrosoftGraph.Client.initWithMiddleware(options);
        const results = await client.api('/me/drive/recent').top(15).get();
        
        this.setState({driveItems: results.value});
    }

    async handlehandleSharedWithMeTabClicked(e: React.MouseEvent) {

        this.setState({driveItems: []})
        const options = {
            authProvider: auth,
            scopes: ["https://graph.microsoft.com/.default"]
        }
        
        const client = MicrosoftGraph.Client.initWithMiddleware(options);
        const results = await client.api('/me/drive/sharedWithMe').top(15).get();
        console.log(results.value.length)
        
        this.setState({driveItems: results.value});
    }


    render(): React.ReactElement {

        return (
            <div className="container">
                <Header/>
                <OneDrivePanel maxDriveItems={25}/>
               </div> 
        );
    }

    async handleClick(e: React.MouseEvent) {
        const options = {
            authProvider: auth,
            scopes: ["https://graph.microsoft.com/.default"]
        }
        
        const client = MicrosoftGraph.Client.initWithMiddleware(options);
        const results = await client.api('/me/drive/recent').top(15).get();
        
        this.setState({driveItems: results.value});
    }
}


const appRoot = document.getElementById('app-root');
ReactDOM.render(<Index/>, appRoot);


{/* <div className="row" id="onedrive-tabs">
                    <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a href="#m-tab-welcome">Welcome</a></li>
                        <li className="tab col s4"><a onClick={this.handleRecentItemsTabClicked} href="#m-tab-recent-items">Recent Items</a></li>
                        <li className="tab col s4"><a onClick={this.handlehandleSharedWithMeTabClicked} href="#m-tab-shared-with-me">Shared With Me</a></li>
                    </ul>
                    </div>
                    <div id="m-tab-welcome">
                     <h2>Welcome!</h2>
                    </div>
                    <div id="m-tab-recent-items" className="col s12">                        
                        <DriveItemCardList driveItems={this.state.driveItems}/> 
                    </div>
                    <div id="m-tab-shared-with-me" className="col s12">
                        <DriveItemCardList driveItems={this.state.driveItems}/> 
                    </div>
                </div>                  
                
            </div> */}
