import React from "react";
import moment from "moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
var currentDate = moment().format('YYYY-MM-DD');
console.log(currentDate);
export default class Calendar extends React.Component {
  state = {
    open: false,
    selectedContent:[]
  };

  onOpenModal = () => {
  this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  getMonth = (monthValue) => {
      return ( 
        <>
          {moment().subtract(monthValue, 'month').format("MMMM")}
        </>
      );
  }

  checkStatus = (presentDate,i) => {
    const currentvalue = this.props.dataDisplay.issueDetails;
    const datavalue = [];
      
       for(let i =0; currentvalue.length>i; i++){      
          const startDate = moment(currentvalue[i]['create_time']).format('YYYY-MM-DD');
          if(startDate === presentDate){   
            datavalue.push(currentvalue[i]); 
          }
        }
    

      if(datavalue.length>0){
          return (
            <span onClick={()=>this.onDayClick(datavalue)}>{i}<span className="tagDisplay red"></span></span>
          );
      } else {
        return  <span>{i}<span className="tagDisplay"></span></span>;
      }
  }

  getYear = (monthValue) => {
    return (  
      <>
        {moment().subtract(monthValue, 'month').format("Y")}
      </>
    );
  }

  weekdayshort = moment.weekdaysShort();

  getWeekShortName = () => {

    const weeks =  this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    return weeks;
  }

  onDayClick = (newData) => {
    console.log("newdata",newData);
    this.setState({
      selectedContent:newData
    },this.onOpenModal()); 
      
  };

  convertToDays = (monthValue) => {  
    const month = moment().subtract(monthValue, 'month').format("MM");
    const year = moment().subtract(monthValue, 'month').format("YYYY");
    const totalDays = moment().subtract(monthValue, 'month').daysInMonth();
    let firstDay = moment().subtract(monthValue, 'month').startOf("month").format("d");
 
    let numberDays=[];
    let blanks = [];

    for (let i = 0; i < firstDay; i++) {
      blanks.push(<td className="calendar-day empty" key={`empty${i}`}>{""}</td>);
    }
    
    for(let i=1; i<=totalDays; i++){ 
      const newDate =year+"-"+month+"-"+i; 
      const presentDate = moment(newDate).format('YYYY-MM-DD'); 

      var currentDay ="";
      if(presentDate === currentDate){
        currentDay = "today";
      }

      
      numberDays.push( 
        <td key={i} className={`calendar-day ${currentDay}`}>           
            {this.checkStatus(presentDate,i)} 
        </td>
      );
    }

    let totalSlots = [...blanks, ...numberDays];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return daysinmonth;

  }
    
  getTotalDays = (monthValue) => {
    const totalCountDays = this.convertToDays(monthValue);
    return totalCountDays;
  }

  popUpContent = (val) => {
    const renderPopup = val.map(content =>{
      var statusClass = "";
      if(content.status_name === "Red"){
        statusClass = "redStatus";
      } else if(content.status_name === "Amber"){
        statusClass = "amberStatus";
      } 
      return(
            <div class={`popContent ${statusClass}`}>
                <span>&nbsp;</span>
                <h2>{content.metrics_name}</h2>
                <div className="rowDisplay">
                  <div><strong>Impacted Dc Number :</strong> </div>
                  <div><p>{content.dc}</p></div>
                </div>
                <div className="rowDisplay">
                  <div><strong>Metrics Name :</strong> </div>
                  <div><p>{content.metrics_name}</p></div>
                </div>
                <div className="rowDisplay">
                  <div><strong>Date Time :</strong> </div>
                  <div><p>{content.create_time}</p></div>
                </div>
                <div className="rowDisplay">
                  <div><strong>Status :</strong> </div>
                  <div><p>{content.status_name}</p></div>
                </div>
            </div>
      );     
    });
    return renderPopup;
  }

  render(){
    const monthMap =[0,1,2,3,4,5,6,7,8,9,10,11];
    const { open } = this.state;
    return(
      <>
       {monthMap.map(i => {      
          return (<>   
          <div className="tail-datetime-calendar">
            <div className="calendar-navi">
              <span
              className="calendar-label"
              >
                {this.getMonth(i)} &nbsp; {this.getYear(i)}
                
              </span>
              
            </div>
            <div className="calendar-date">
              <table className="calendar-day">
                <thead>
                  <tr>{this.getWeekShortName()}</tr>
                </thead>
                <tbody>{this.getTotalDays(i)}</tbody>
              </table>
             </div>
          </div>
          </>
        )
        })} 
        <Modal open={open} onClose={this.onCloseModal}>
           {this.popUpContent(this.state.selectedContent)}
        </Modal>
      </>
    );
  }
}