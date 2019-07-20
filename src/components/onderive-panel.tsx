
import * as React from 'react';
import { DriveItemCardList, IDriveItem } from './drive-items'
import { AuthenticationProvider, AuthenticationStatus } from '../authentication-provider'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';

const authProvider = AuthenticationProvider.getInstance();
const isLoggedIn = authProvider.isLoggedIn;

interface IOneDrivePanelState {
    recentDriveItems: IDriveItem[];
    sharedWithMeDriveItems: IDriveItem[];
}

interface IOneDrivePanelProps {
    maxDriveItems: number;
}

function OneDrivePanel(props: IOneDrivePanelProps) {

    const [state, setState] = React.useState({ recentDriveItems: [], sharedWithMeDriveItems: [] });
    
    const disabled = 'tab col s4' + ((isLoggedIn) ? '' : ' disabled');

    return (
        <div id="onedrive-panel">
            <div className="row" id="onedrive-tabs">

                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4"><a href="#m-tab-welcome">Welcome</a></li>
                        <li className={disabled}><a href="#m-tab-recent-items" onClick={async (e) => {
                            getDriveItems('/me/drive/recent', props.maxDriveItems)
                            .then((results) => {
                                setState({recentDriveItems: results, sharedWithMeDriveItems: [] })
                            });
                            
                        }}>Recent Items</a></li>
                        <li className={disabled}><a href="#m-tab-shared-with-me"onClick={async (e) => {
                            getDriveItems('/me/drive/sharedWithMe', props.maxDriveItems)
                            .then((recentDriveItems) => {
                                setState({sharedWithMeDriveItems: recentDriveItems, recentDriveItems: [] })
                            });
                            
                        }}>Shared With Me</a></li>
                    </ul>
                </div>   
            </div>

            <div className="row">
                <div id="m-tab-welcome" className="col s12">
                    <h2>Welcome!</h2>
                </div>
                <div id="m-tab-recent-items" className="col s12">                        
                    <DriveItemCardList driveItems={state.recentDriveItems}/> 
                </div>
                <div id="m-tab-shared-with-me" className="col s12">
                    <DriveItemCardList driveItems={state.sharedWithMeDriveItems}/> 
                </div>
            </div>
        </div>
    )
}



async function getDriveItems(path: string, maxDriveItems: number = 25): Promise<IDriveItem[]> {
    const options = {
        authProvider: authProvider,
        scopes: ["https://graph.microsoft.com/.default"]
    }
    
    const client = MicrosoftGraph.Client.initWithMiddleware(options);
    const results = await client.api(path).top(maxDriveItems).get();
    console.log(results.value.length);
    return results.value;
}



export { OneDrivePanel }