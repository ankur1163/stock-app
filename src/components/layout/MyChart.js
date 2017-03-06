import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class MyChart extends Component {
       constructor(){
        
        super()
             
              
        
            this.state = {
                symball:[],
                count:0
              
        };
        
    }
    componentWillReceiveProps(){
           
        
        
    }
    
    
  componentWillUpdate(){
  
     
  }
    
    render() {
        //colors
        var Colors = [
    "#ffb6c1","#ffffe0","#00ff00","#ff00ff","#800000","#000080","#808000","#ffa500","#ffc0cb","#800080","#800080","#ff0000","#c0c0c0","#ffff00",
     "#ffb6c1","#ffffe0","#00ff00","#ff00ff","#800000","#000080","#808000","#ffa500","#ffc0cb","#800080","#800080","#ff0000","#c0c0c0","#ffff00"]
        
        
        //colors
           const   data = {
  labels: this.props.datedate,
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#00FF00',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
        const fdata =[];
        
      this.props.datadata.map(function(i,index){
          fdata.push({ label: index,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,0,0,0.4)',
      borderColor: '"#90ee90"',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,128,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: i})
      })
      
      data.datasets = fdata;
        
        //console.log("here's the data",data)
        
        return(<div>
                 <Line data={data} redraw={true}/>
                </div>);
    }
}

export default MyChart