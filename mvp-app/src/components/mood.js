import React, { useEffect, useState } from "react";
// import { ResponsiveCalendar } from '@nivo/calendar'
//import { ResponsivePie } from "@nivo/pie";
import {Doughnut} from 'react-chartjs-2';

const Mood = () => {
	let [mood, setMood] = useState("");
	//let [input, setInput] = useState({});

	// useEffect(() => {
	// 	getMood();
	// }, []);

	// const getMood = () => {
	// 	fetch("/mood/mood")
	// 		.then((response) => response.json())
	// 		.then((mood) => {
	// 			setMood(mood);
	// 			console.log(mood);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

    const pieChart = {
        labels: ['Happy', 'Sad', 'Stressed',
                     'Calm', 'Angry'],
                        datasets: [
                    {
                      label: 'Rainfall',
                      backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#6800B4'
                      ],
                      hoverBackgroundColor: [
                      '#501800',
                      '#4B5000',
                      '#175000',
                      '#003350',
                      '#35014F'
                      ],
                data:[1,3,4,8,10]

            }

        ]
    }    
                
    
    

    return (			
        <Doughnut
          data={pieChart}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

        
    		
	);
};

export default Mood;
