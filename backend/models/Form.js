const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  cycle: { type: String, required: true },
  training: { type: String, required: true },
  pdCoach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pdDays: [String], // Assuming PD days are a list of strings, adjust as necessary
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Example for assessments and other dates:
  assessments: {
    threeWeek: { type: Date },
    sixWeek: { type: Date },
    tenWeek: { type: Date }
  },
  techInstructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  learnerSupport: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  financialCoach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  perScholasSite: { type: String },
  talentSolutions: { type: String },
  mockInterview: { type: Date },
  postThirtyDayFollowUp: { type: Date },
  // Add any other fields as necessary
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form