import * as Msal from "msal";

let singleton: AuthenticationService = null;

export class AuthenticationService {
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

	public static getInstance(): AuthenticationService {
		if (singleton === null) {
			singleton = new AuthenticationService();
		}

		return singleton;
	}

	public async login(): Promise<IAuthenticationResponse> {
		let msalResponse = await this._msalInstance.loginPopup(this._msalRequest);

		let response: IAuthenticationResponse = {
			status: AuthenticationStatus.LoggedIn,
			message: "The user has been logged in",
		};

		return response;
	}

	public async logout(): Promise<IAuthenticationResponse> {
		let response: IAuthenticationResponse = {
			status: AuthenticationStatus.LoggedOut,
			message: "The user has been logged out",
		};

		await this._msalInstance.logout();

		// Ha ha ha - this will never get called...
		return response;
	}
}

export enum AuthenticationStatus {
	LoggedOut = 0,
	LoggedIn = 1,
	Error = 16,
}

export interface IAuthenticationResponse {
	status: AuthenticationStatus;
	message: string;
	error?: Error;
}
