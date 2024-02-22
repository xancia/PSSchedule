/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';

const NewFormPage = () => {
    const [formData, setFormData] = useState({
        cycle: '',
        training: '',
        pdCoach: '',
        pdDays: [],
        startDate: '',
        endDate: '',
        assessments: {
          threeWeek: '',
          sixWeek: '',
          tenWeek: '',
        },
        techInstructor: '',
        learnerSupport: '',
        financialCoach: '',
        perScholasSite: '',
        talentSolutions: '',
        mockInterview: '',
        postThirtyDayFollowUp: '',
      });

      const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        // Special handling for nested assessment dates
        if (['threeWeek', 'sixWeek', 'tenWeek'].includes(name)) {
          setFormData(prevState => ({
            ...prevState,
            assessments: {
              ...prevState.assessments,
              [name]: value,
            },
          }));
        } else if (name === "pdDays") {
          setFormData(prevState => ({
            ...prevState,
            pdDays: value.split(',').map((day: string) => day.trim()), // Assuming pdDays are entered as comma-separated values and need to be split into an array
          }));
        } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
          }));
        }
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          // Adjust the URL to your endpoint as needed
          const response = await axios.post('http://localhost:8080/api/forms', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log('Form submitted successfully:', response.data);
          // Implement post-submission logic, such as redirecting the user or clearing the form
        } catch (error) {
          console.error('Error submitting form:', error);
          // Implement error handling logic, such as displaying an error message to the user
        }
      };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label htmlFor="cycle" className="block text-gray-700 text-sm font-bold mb-2">Cycle:</label>
          <input
            type="text"
            id="cycle"
            name="cycle"
            value={formData.cycle}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="training" className="block text-gray-700 text-sm font-bold mb-2">Training:</label>
          <input
            type="text"
            id="training"
            name="training"
            value={formData.training}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="pdDays" className="block text-gray-700 text-sm font-bold mb-2">PD Days (comma-separated):</label>
          <input
            type="text"
            id="pdDays"
            name="pdDays"
            value={formData.pdDays.join(', ')}
            onChange={handleChange}
            placeholder="Monday, Wednesday, Friday"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="threeWeek" className="block text-gray-700 text-sm font-bold mb-2">3 Week Assessment:</label>
          <input
            type="date"
            id="threeWeek"
            name="threeWeek"
            value={formData.assessments.threeWeek}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="sixWeek" className="block text-gray-700 text-sm font-bold mb-2">6 Week Assessment:</label>
          <input
            type="date"
            id="sixWeek"
            name="sixWeek"
            value={formData.assessments.sixWeek}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="tenWeek" className="block text-gray-700 text-sm font-bold mb-2">10 Week Assessment:</label>
          <input
            type="date"
            id="tenWeek"
            name="tenWeek"
            value={formData.assessments.tenWeek}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="perScholasSite" className="block text-gray-700 text-sm font-bold mb-2">Per Scholas Site:</label>
          <input
            type="text"
            id="perScholasSite"
            name="perScholasSite"
            value={formData.perScholasSite}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div>
          <label htmlFor="mockInterview" className="block text-gray-700 text-sm font-bold mb-2">Mock Interview Date:</label>
          <input
            type="date"
            id="mockInterview"
            name="mockInterview"
            value={formData.mockInterview}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="pdCoach" className="block text-gray-700 text-sm font-bold mb-2">PD Coach:</label>
          <input
            type="text"
            id="pdCoach"
            name="pdCoach"
            value={formData.pdCoach}
            onChange={handleChange}
            placeholder="PD Coach"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="talentSolutions" className="block text-gray-700 text-sm font-bold mb-2">Talent Solutions:</label>
          <input
            type="text"
            id="talentSolutions"
            name="talentSolutions"
            value={formData.talentSolutions}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="techInstructor" className="block text-gray-700 text-sm font-bold mb-2">Tech Instructor:</label>
          <input
            type="text"
            id="techInstructor"
            name="techInstructor"
            value={formData.techInstructor}
            onChange={handleChange}
            placeholder="Tech Instructor"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="learnerSupport" className="block text-gray-700 text-sm font-bold mb-2">Learner Support:</label>
          <input
            type="text"
            id="learnerSupport"
            name="learnerSupport"
            value={formData.learnerSupport}
            onChange={handleChange}
            placeholder="Learner Support"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="financialCoach" className="block text-gray-700 text-sm font-bold mb-2">Financial Coach:</label>
          <input
            type="text"
            id="financialCoach"
            name="financialCoach"
            value={formData.financialCoach}
            onChange={handleChange}
            placeholder="Financial Coach"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="perScholasSite" className="block text-gray-700 text-sm font-bold mb-2">Per Scholas Site:</label>
          <input
            type="text"
            id="perScholasSite"
            name="perScholasSite"
            value={formData.perScholasSite}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
       
        <div>
          <label htmlFor="postThirtyDayFollowUp" className="block text-gray-700 text-sm font-bold mb-2">Post 30 Day Follow-Up Date:</label>
          <input
            type="date"
            id="postThirtyDayFollowUp"
            name="postThirtyDayFollowUp"
            value={formData.postThirtyDayFollowUp}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewFormPage;
