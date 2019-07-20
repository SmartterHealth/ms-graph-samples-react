import * as React from "react";
import * as ReactDOM from "react-dom";
import * as M from "materialize-css";
import OneDrivePanel from "./components/onderive-panel";

import Header from "./components/header";

class OneDriveApp extends React.Component {
	render(): React.ReactElement {
		return (
			<div className="container">
				<Header />
				<OneDrivePanel maxDriveItems={25} />
			</div>
		);
	}
}

export default OneDriveApp;

const appRoot = document.getElementById("app-root");
ReactDOM.render(<OneDriveApp />, appRoot);

document.addEventListener('readystatechange', (ev: ProgressEvent) => {
    if(document.readyState === 'complete') {
        M.AutoInit();
    }
})
