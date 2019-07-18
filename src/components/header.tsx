import * as React from 'react';
import { LoginButton } from './login-button'

export interface IHeaderProps {

}

const style = {
    padding: '10px'
}

export const Header = (props?: IHeaderProps) => {
    return (<div><nav className="light-blue darken-4" >
        <div className="nav-wrapper" style={ style }>
            <a href="#" className="brand-logo">OneDrive</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><LoginButton class="btn light-blue lighten-4 black-text"/></li>
            </ul>
        </div>
    </nav></div>);
};