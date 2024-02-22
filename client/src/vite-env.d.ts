/// <reference types="vite/client" />

interface Event {
    assessments: {
        threeWeek: string;
        sixWeek: string;
        tenWeek: string;
    };
    createdAt: string;
    cycle: string;
    description: string;
    end: Date;
    endDate: string;
    financialCoach: string;
    learnerSupport: string;
    mockInterview: string;
    pdCoach: string;
    pdDays: string[];
    perScholasSite: string;
    postThirtyDayFollowUp: string;
    start: Date;
    startDate: string;
    talentSolutions: string;
    techInstructor: string;
    title: string;
    updatedAt: string;
    special?: boolean;
    __v: number;
    _id: string;
}