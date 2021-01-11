import React, { Component } from 'react';
import './Calculator.scss';
import CursServis from '../../service';

export default class Calculator extends Component{

    constructor(props){
        super(props)
        this.state = {
            firstCurrency : "USD",
            secondCurrency : "RUB",
            kurs : 0,
            reverskurs : 0, 
            itemscurrency : [
                {value :"RUB", title : "₽"},
                {value: "USD", title : "$"},
                {value: "EUR", title: "€"},
                {value :"GBP", title: "£"}
            ],
            firstItemscurrency : [],
            secondItemscurrency : [],
            valueFirstInput : 0,
            valueSecondInput : 0
        }
    }

    CursServis = new CursServis;

    changeCurse(first, second ){
        const valueFirstInput = this.state.valueFirstInput;
        this.CursServis.getCurs(first, second)
        .then(body => {
            this.setState({
                kurs : body,
                valueSecondInput : Math.floor((valueFirstInput * body) * 100) / 100
            })
        }).catch(err =>{
            console.log(`Error ${err}`)
        })
        const valueSecondInput = this.state.valueSecondInput; 
        this.CursServis.getCurs(second, first)
        .then(body => {
            this.setState({
                reverskurs : body,
            })
        }).catch(err =>{
            console.log(`Error ${err}`)
        })
    }

    changeFirstCurrency(e){
        this.setState({
            firstCurrency : e.target.value
        })
        this.changeCurse(e.target.value, this.state.secondCurrency);
    }

    changeSecondCurrency(e){
        this.setState({
            secondCurrency : e.target.value
        })
        this.changeCurse(this.state.firstCurrency, e.target.value);

    }

    changeFirstInput(e){
        const v = e.target.value;

        const k = Math.floor((v*this.state.kurs) * 100) / 100; 
        this.setState({
            valueFirstInput : v,
            valueSecondInput : k
        })
    }


    changeSecondInput(e){
        // const v = e.target.value;
        // const k = Math.floor((v*this.state.reverskurs) * 100) / 100; 
        // this.setState({
        //     valueFirstInput : k,
        //     valueSecondInput : v
        // })
    }

    componentDidMount(){
        this.changeCurse(this.state.firstCurrency, this.state.secondCurrency)
    }

    render(){
        //console.log(this.state)
        let title = "";
        switch(this.props.language){
            case "rus":
                title = 'калькулятор валют';
                break;
            case "eng":
                title = 'currency calculator';
                break;    
            case "de":
                title = 'währungsrechner';
                break;               
        } 

        return(
            <div  className="my-3 py-5 bg-dark calculator">
                <h4 className="text-center text-uppercase">{title}</h4>
                <div className="d-flex flex-wrap">
                    <div className="col-12 col-lg-6 my-3">
                        <div className="d-flex">
                            <select className="custom-select bg-dark"  onChange = {e => this.changeFirstCurrency(e)} >
                                {this.state.itemscurrency.filter(e => e.value != this.state.secondCurrency).map((e, index) => 
                                    <option value={e.value} key={index}>{e.title} </option>    
                                )}
                            </select>
                            <input className="ml-1 form-control" placeholder="0" type="number" value={this.state.valueFirstInput} onChange={e => this.changeFirstInput(e)}/>
                        </div>

                    </div>
                    <div className="col-12 col-lg-6 my-3">
                    <div className="d-flex">
                            <select className="custom-select bg-dark"  onChange = {e => this.changeSecondCurrency(e)}>
                                {this.state.itemscurrency.filter(e => e.value != this.state.firstCurrency).map((e, index) => 
                                    <option value={e.value} key={index}>{e.title} </option>    
                                )}
                            </select>
                            <input className="ml-1 form-control" placeholder="0" type="number" value={this.state.valueSecondInput} onChange={e => this.changeSecondInput(e)}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

