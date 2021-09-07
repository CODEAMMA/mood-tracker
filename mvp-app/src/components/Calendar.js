import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Calendar.css";
import { format, subHours, startOfMonth } from "date-fns";
import moment from "moment";
import {
	MonthlyBody,
	MonthlyDay,
	MonthlyCalendar,
	MonthlyNav,
	DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import "@zach.codes/react-calendar/dist/calendar-tailwind.css";

const Calendar = () => {
	let defaultEvents = [
		{ title: "Call John", date: subHours(new Date(), 2) },
		{ title: "Call John", date: subHours(new Date(), 1) },
		{ title: "Meeting with Bob", date: new Date() },
		{ title: "Merdeka Day", date: new Date("2021-08-31") },
	];
	let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
	let [events, setEvents] = useState([0]);
	let [input, setInput] = useState([]);
	//let [drop,setDrop]= useState('');
	//let [value,setValue] = useState('');

	useEffect(() => {
		getEvents();
	}, []);

	const getEvents = () => {
		fetch("/events")
			.then((response) => response.json())
			.then((events) => {
				setEvents(events);
				console.log(events);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (event) => {
		console.log(event,"takes in the input");
		
		let value = event.target.value;
		setInput({
			...input,
			[event.target.name]: value,
		});
		
		//console.log(setInput);
	};

	const handleSelect = (event) => {
		let value = event;

		setInput({
			...input,
	    mood:value,

		});

		//let value = event.target.value;
		// setInput({
		// 	...input,
		// 	[event.target.name]: value,
		// });
		
	}

				
	
	const handleSubmit = (event) => {
		event.preventDefault();
		addEvent();
			setInput({ date: "", title: "", mood: "", time: "" });
		
		//console.log(setInput);
	};

	const addEvent = () => {
		fetch("/events", {
			method: "POST",
			headers: {
				'Accept': 'application/text',
				"Content-Type": "application/json"
			},
			body: JSON.stringify(input),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setEvents([
					...events,
					{
						id: data[data.length - 1].id,
						date: input.date,
						// time: input.time.toString(),
						title: input.title,
						mood: input.mood,
					},
				]);
			});
	};

	const deleteEvent = (id) => {
		fetch(`/events/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// setEvents(events.filter(e => e.id !== id))
				setEvents(data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<MonthlyCalendar
				currentMonth={currentMonth}
				onCurrentMonthChange={(date) => setCurrentMonth(date)}
			>
				<MonthlyNav />
				{/* <button>Create Event</button> */}
				
				<MonthlyBody events={events}>
				
					<MonthlyDay
					
						renderDay={(data) =>
							data.map((item, index) => (
								<DefaultMonthlyEventItem
									key={index}
									title={item.title}
									// Format the date here to be in the format you prefer
									date={format(item.date, "k:mm")}
									mood={item.mood}
								/>
								
							))
							
						}

					
					/>
					

				</MonthlyBody>
				
			</MonthlyCalendar>
			<br />
			<form onSubmit={(e) => handleSubmit(e)}>
				<table className="table table-hover">
					<thead>
						<tr className="table-auto">
							<th>Date</th>
							{/* <th>Time</th> */}
							<th>Event</th>
							<th>Mood</th>
							<th>Submit</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="10">
								<input
									type="date"
									name="date"
									value={input.date}
									onChange={(e) => handleChange(e)}
								/>
							</td>
							{/* <td width="10">
                <input
                  type="time"
                  name="time"
                  value={input.time}
                  onChange={(e) => handleChange(e)}
                />
              </td> */}
							<td>
								<input
									type="text"
									name="title"
									value={input.title}
									placeholder="What's your plan today?"
									onChange={(e) => handleChange(e)}
									style={{ width: "100%" }}
								/>
							</td>

							<td>
																 
								<DropdownButton
								alignRight
								id="dropdown-menu-align-right"
								title ="My mood today"
								type= "button"
								data-toggle="dropdown"
								name="mood"
								value={input.mood}
								onSelect={(e) => handleSelect(e)}>
									<Dropdown.Item eventKey="Happy">Happy</Dropdown.Item>
									<Dropdown.Item eventKey="Sad">
										Sad
									</Dropdown.Item>
									<Dropdown.Item eventKey="Angry">
										Angry
									</Dropdown.Item>
								</DropdownButton>															  						
							</td>

							<td>
								<input type="submit" value="Submit" />
							</td>

							<td></td>
						</tr>
						{events.map((e) => (
							<tr>
								<td>{e.date}</td>
								{/* <td>{e.time}</td> */}
								<td>{e.title}</td>
								<td>{e.mood}</td>

								<td
									className="del-btn"
									style={{ width: "1%" }}
									onClick={() => deleteEvent(e.id)}
								>
									&times;
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</form>
		</div>
	);
};

export default Calendar;
