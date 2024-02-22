/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/forms', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the auth token if required
                    },
                });
                const formattedEvents = response.data.map((event: { startDate: any; endDate: any; cycle: any; }) => ({
                    ...event,
                    start: convertToUTCDate(event.startDate),
                    end: convertToUTCDate(event.endDate),
                    title: event.cycle,
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

        const specialDates = [
            { week: events[0].cycle + ' Week 3', date: convertToUTCDate(events[0].assessments.threeWeek) },
            { week: events[0].cycle + ' Week 6', date: convertToUTCDate(events[0].assessments.sixWeek) },
            { week: events[0].cycle + ' Week 10', date: convertToUTCDate(events[0].assessments.tenWeek) },
        ];

        return specialDates.map(specialDate => ({
            start: specialDate.date,
            end: specialDate.date,
            title: specialDate.week,
            allDay: true,
            special: true, // Add a custom property to identify special events
        }));
    };

    return (
        <div className='bg-white text-black h-screen'>
            <Calendar
                localizer={localizer}
                events={[...events, ...renderSpecialEvents()]} // Merge regular events with special events
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={(event) => ({
                    className: event.special ? 'special-event' : '',
                })}
            />
        </div>
    );
};

export default MyCalendar;
