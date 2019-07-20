import * as React from 'react';
import { AuthenticationProvider, AuthenticationStatus } from '../authentication-provider';

const auth = AuthenticationProvider.getInstance();

interface ILoginButtonProps {
    class?: string;
}

interface ILoginButtonState {
    isLoggedIn: boolean
}

class LoginButton extends React.Component<ILoginButtonProps, ILoginButtonState> {
    constructor(props: ILoginButtonProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state =({
            isLoggedIn: auth.isLoggedIn
        });        
    }

    render(): React.ReactElement{
        return (
            <button className={ ( this.props.class ) ? this.props.class : 'btn' } onClick={this.handleClick}> { ( this.state.isLoggedIn ) ? 'Logout' : 'Login' } </button>
        )
    }

    private async handleClick(event: React.MouseEvent) {
        if(this.state.isLoggedIn) {
            if(confirm('Do you really wish to log out?')) {
                auth.logout()
                .then((res) => {
                    this.setState({isLoggedIn: (res.status == AuthenticationStatus.LoggedIn)})
                });                
            }
        } else {
            auth.login()
            .then((res) => {              
                this.setState({isLoggedIn: (res.status == AuthenticationStatus.LoggedIn)})
            });            
        }
    }
}

export { LoginButton, ILoginButtonProps }