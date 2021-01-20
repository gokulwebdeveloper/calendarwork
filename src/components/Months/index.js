import React from "react";
import Calendar from '../Calendar';
import axios from 'axios';


export default class Months extends React.Component { 
    constructor(props){
        super(props);
       this.state={
           yearlyData:[]
       }
    }
    fetchData = () =>{
        axios.get('http://localhost:3000/sample.json',{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }).then((response) => {
           this.setState({
                yearlyData:response.data
           });
          });

    }
    render(){
        return(
            <> 
            {this.state.yearlyData.length!==0 ? 
            <Calendar  changeEvent={this.onOpenModal} dataDisplay={this.state.yearlyData} /> 
            : "Loading..." }    
              
            </>
        )
    }

    componentDidMount(){
       this.fetchData();
    }

}