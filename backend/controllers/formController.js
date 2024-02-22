const Form = require('../models/Form');
const User = require('../models/User')

// Create a new form
exports.createForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        const savedForm = await form.save();

        // If tracking forms in User documents, update the associated user(s)
        await User.findByIdAndUpdate(req.body.pdCoach, { $push: { forms: savedForm._id } });
        // Repeat the above line as necessary for other roles involved in the form, handling nulls appropriately

        res.status(201).json(savedForm);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// Get all forms
exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().populate('pdCoach techInstructor learnerSupport financialCoach');
        res.status(200).json(forms);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// Get a specific form by ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('pdCoach techInstructor learnerSupport financialCoach');
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(updatedForm);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // If tracking forms in User documents, update the associated user(s) to remove this form's ID
        // This is a simplified example; in practice, you'd need to handle this for all related users
        await User.findByIdAndUpdate(form.pdCoach, { $pull: { forms: form._id } });
        // Repeat the above line as necessary for other roles involved in the form, handling nulls appropriately

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};