/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar } from '../NavBar';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/forms', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the auth token if required
                    },
                });
                const formattedEvents = response.data.map((event:Event) => ({
                    ...event,
                    start: convertToUTCDate(event.startDate),
                    end: convertToUTCDate(event.endDate),
                    title: event.cycle + ' ' + event.pdCoach,
                    description: 'testing'
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    console.log(events)

    const convertToUTCDate = (dateString: moment.MomentInput) => {
        // Parse the date string and add one day, then convert it to UTC format
        return moment.utc(moment(dateString).add(1, 'day')).toDate();
    };

    const renderSpecialEvents = () => {
        if (events.length === 0) {
            // If events array is empty, return an empty array
            return [];
        }
    
        // Map over each event in the events array and create special dates for assessments
        const specialDates = events.map(event => {
            // Create special dates for each assessment in the event
            const assessments = [
                { week: 'Week 3', date: convertToUTCDate(event.assessments.threeWeek) },
                { week: 'Week 6', date: convertToUTCDate(event.assessments.sixWeek) },
                { week: 'Week 10', date: convertToUTCDate(event.assessments.tenWeek) },
                { week: event.cycle + ' 30 Day Follow-Up', date: convertToUTCDate(event.postThirtyDayFollowUp) },
                { week: event.cycle + ' Mock Interview', date: convertToUTCDate(event.mockInterview) },
            ];
    
            // Map over each assessment and return special date object
            return assessments.map(assessment => ({
                start: assessment.date,
                end: assessment.date,
                title: assessment.week,
                pdCoach: event.pdCoach,
                allDay: true,
                special: true, // Add a custom property to identify special events
            }));
        });
    
        // Flatten the array of arrays into a single array
        return specialDates.flat();
    };
    

    return (
        <div className='bg-white h-screen'>
            <NavBar />
            <div className='h-full max-w-screen-xl mx-auto pt-20'>
            <Calendar
                localizer={localizer}
                events={[...events, ...renderSpecialEvents()]} // Merge regular events with special events
                startAccessor="start"
                endAccessor="end"
                className='bg-white text-black'
                eventPropGetter={(event) => {
                    let className = '';
                    // Check if it's a special event
                    if (event.special) {
                        className += ' font-bold'; 
                    }
                    // Check for PD coach name and apply specific styles
                    if (event.pdCoach === 'Janice') {
                        className += ' bg-blue-500'; 
                    }
                    // Return the object with the combined classNames
                    return { className };
                }}
            />
            </div>
        </div>
    );
};

export default MyCalendar;
