/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { NavBar } from '../NavBar';

const emptyForm = {
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
  }

const EditSchedulePage = () => {
  const [cycles, setCycles] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState('');
  const [formData, setFormData] = useState(emptyForm);

  // Fetch all cycles on component mount
  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/forms');
        setCycles(response.data.map((form:Event) => ({ id: form._id, cycle: form.cycle })));
      } catch (error) {
        console.error('Error fetching cycles:', error);
      }
    };

    fetchCycles();
  }, []);

  // Fetch the selected cycle's data
  useEffect(() => {
    const fetchCycleData = async () => {
      if (!selectedCycleId) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/forms/${selectedCycleId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching cycle data:', error);
      }
    };

    fetchCycleData();
  }, [selectedCycleId]);

  // Handle the cycle selection change
  const handleCycleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    console.log(e.target.value)
    setSelectedCycleId(e.target.value);
    setFormData(emptyForm); // Reset form data
  };

  // Handle form data changes
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/forms/${selectedCycleId}`, formData);
      alert('Cycle updated successfully!');
    } catch (error) {
      alert('Error updating cycle');
      console.log(error)
    }
  };
  
  console.log(cycles)

  return (
    <div>
  <NavBar />
  <div className="pt-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <select
        className="block w-full mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
        value={selectedCycleId}
        onChange={handleCycleChange}
      >
        <option value="">Select a Cycle</option>
        {cycles.map((cycle: any, index) => (
          <option key={index} value={cycle.id}>{cycle.cycle}</option>
        ))}
      </select>

      {formData && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* 3 Week Assessment Date */}
            <div>
              <label htmlFor="threeWeek" className="block text-sm font-medium text-gray-700">3 Week Assessment Date:</label>
              <input
                type="date"
                id="threeWeek"
                name="assessments.threeWeek"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                value={formData.assessments?.threeWeek?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>
            
            {/* 6 Week Assessment Date */}
            <div>
              <label htmlFor="sixWeek" className="block text-sm font-medium text-gray-700">6 Week Assessment Date:</label>
              <input
                type="date"
                id="sixWeek"
                name="assessments.sixWeek"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                value={formData.assessments?.sixWeek?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>
            
            {/* 10 Week Assessment Date */}
            <div>
              <label htmlFor="tenWeek" className="block text-sm font-medium text-gray-700">10 Week Assessment Date:</label>
              <input
                type="date"
                id="tenWeek"
                name="assessments.tenWeek"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                value={formData.assessments?.tenWeek?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>
            
        
            
            {/* Mock Interview Date */}
            <div>
              <label htmlFor="mockInterview" className="block text-sm font-medium text-gray-700">Mock Interview Date:</label>
              <input
                type="date"
                id="mockInterview"
                name="mockInterview"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                value={formData.mockInterview?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>
            
            {/* 30 Day Follow Up Date */}
            <div>
              <label htmlFor="postThirtyDayFollowUp" className="block text-sm font-medium text-gray-700">30 Day Follow Up Date:</label>
              <input
                type="date"
                id="postThirtyDayFollowUp"
                name="postThirtyDayFollowUp"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                value={formData.postThirtyDayFollowUp?.split('T')[0] || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Cycle
          </button>
        </form>
      )}
    </div>
  </div>
</div>

  );
};

export default EditSchedulePage;
