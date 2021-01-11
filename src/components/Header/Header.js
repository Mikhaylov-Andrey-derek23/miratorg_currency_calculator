import React, { Component } from 'react';
import './Header.scss';


export default class Header extends Component {

    render() {
        let textSelect = "";
        let title = "";
        let languages = [];
        switch(this.props.language){
            case "rus":
                textSelect = 'Выберете язык';
                title = 'Главная';
                languages = [{value : 'rus', title : "Русский" }, {value : 'eng', title : "Англиский"}, {value : 'de', title : "Немецкий"}]
                break;
            case "eng":
                textSelect = 'Select a language';
                title = 'Main';
                languages = [{value : 'rus', title : "Russian"}, {value : 'eng', title : "English"}, {value : 'de', title : "German"}]
                break;    
            case "de":
                textSelect = 'Sprache auswählen'
                title = 'Primär';
                languages = [{value : 'rus', title : "Russisc"}, {value : 'eng', title : "Englisc"}, {value : 'de', title : "Deutsch"}]
                break;   
            default:
                textSelect = 'Выберете язык';
                title = 'Главная';
                languages = [{value : 'rus', title : "Russian"}, {value : 'eng', title : "English"}, {value : 'de', title : "German"}]
            
        }
        return (
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark align-items-baseline ">
                <a className="navbar-brand" href="#">{title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <select className="custom-select bg-dark" defaultValue={'DEFAULT'} onChange = {(e) => this.props.selectLang(e)}>
                                <option value="DEFAULT" disabled>{textSelect}</option>
                                {languages.map((e, index) => 
                                    <option value={e.value} key={index}>{e.title} </option>
                                    ) }
                            </select>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
} 