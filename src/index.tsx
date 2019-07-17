import * as React from "react";
import * as ReactDOM from "react-dom";


import { Header } from "./components/header";

const appRoot = document.getElementById('app-root');

const template = ( 
    <Header/>
)

ReactDOM.render(template, appRoot);