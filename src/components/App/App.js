import React, { Component } from 'react';
import Header from '../Header/';
import './App.scss';
import Calculator from '../Calculator/';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language : "eng" 
        }
    }

    selectLang(e){
        this.setState({
            language: e.target.value
        })
    } 

    render() {

        return (
            <div className="wrapper">
                <Header language = {this.state.language} selectLang={(e) => this.selectLang(e)}/>
                <Calculator language = {this.state.language}/>
                
            </div>
        )
    }
};