const express = require('express');
const router = express.Router();
const formCtrl = require('../controllers/formController');

// Route to create a new form
router.post('/', formCtrl.createForm);

// Route to get all forms
router.get('/', formCtrl.getAllForms);

// Route to get a specific form by ID
router.get('/:id', formCtrl.getFormById);

// Route to update an existing form
router.put('/:id', formCtrl.updateForm);

// Route to delete a form
router.delete('/:id', formCtrl.deleteForm);

module.exports = router;
