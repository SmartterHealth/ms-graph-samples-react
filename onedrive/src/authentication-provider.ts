import * as Msal from "msal";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client'

let singleton: AuthenticationProvider = null;

export class AuthenticationProvider implements MicrosoftGraph.AuthenticationProvider {
	constructor() {
		this._msalInstance = new Msal.UserAgentApplication(this._msalConfig);
	}

	private _msalInstance: Msal.UserAgentApplication;
	private _msalConfig: Msal.Configuration = {
		auth: {
			clientId: "ce0b75e9-40dd-4f23-855e-0242fab3fea9",
			authority: "https://login.microsoftonline.com/smartterhealth.com",
		},
		cache: {
			cacheLocation: "sessionStorage",
			storeAuthStateInCookie: true,
		},
	};
	private _msalRequest: { scopes: ["https://graph.microsoft.com/.default"] };

	public get account() {
		return this._msalInstance.getAccount();
	}

	public get isLoggedIn(): boolean {
		return this.account != null;
	}

	public static getInstance(): AuthenticationProvider {
		if (singleton === null) {
			singleton = new AuthenticationProvider();
		}

		return singleton;
	}

	public async getAccessToken(): Promise<string> {
		const options = { scopes: ["https://graph.microsoft.com/.default"]}
		
		console.log(options)
		const res = await this._msalInstance.acquireTokenSilent(options);
		return res.accessToken;
	}

	public async getAccessToken2(scopes: string[] = ["https://graph.microsoft.com/.default"]) {
		if(this.isLoggedIn) {
			return this._msalInstance.acquireTokenSilent({ scopes: scopes});
		}
	}

	public async login(): Promise<IAuthenticationResponse> {
		let msalResponse = await this._msalInstance.loginPopup(this._msalRequest);

		return {
			status: AuthenticationStatus.LoggedIn,
			message: "The user has been logged in",
		};
	}

	public async logout(): Promise<IAuthenticationResponse> {

		await this._msalInstance.logout();

		// Ha ha ha - this will never get called...
		return {
			status: AuthenticationStatus.LoggedOut,
			message: "The user has been logged out",
		};;
	}

	public authProvider() {
		return this._msalInstance;
	}
}

export enum AuthenticationStatus {
	LoggedOut = 0,
	LoggedIn = 1
}

export interface IAuthenticationResponse {
	status: AuthenticationStatus;
	message: string;
	error?: Error;
}
