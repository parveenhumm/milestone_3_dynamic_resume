"use strict";
// Update these initial visibility settings
const cvForm = document.getElementById('cv-form');
const resumeTemplate = document.getElementById('resume-template');
if (cvForm) {
    cvForm.style.display = 'block'; // Ensure the form is visible initially
}
if (resumeTemplate) {
    resumeTemplate.style.display = 'none'; // Ensure the resume template is hidden initially
}
// Update the generateCV function to switch visibility
function generateCV() {
    // Personal Information
    const name = document.getElementById('nameField').value;
    const jobTitle = document.getElementById('titleField').value;
    const contact = document.getElementById('contactField').value;
    const email = document.getElementById('emailField').value;
    const address = document.getElementById('addressField').value;
    const linkedin = document.getElementById('linkedinField').value;
    const github = document.getElementById('githubField').value;
    const objective = document.getElementById('objectiveField').value;
    // Populate Resume Template with contenteditable fields
    document.getElementById('fullnameT').innerText = name;
    document.getElementById('fullnameT').setAttribute('contenteditable', 'true');
    document.getElementById('nameT').innerText = name;
    document.getElementById('nameT').setAttribute('contenteditable', 'true');
    document.getElementById('jobtitleT').innerText = jobTitle;
    document.getElementById('jobtitleT').setAttribute('contenteditable', 'true');
    document.getElementById('phoneT').innerText = `Phone: ${contact}`;
    document.getElementById('phoneT').setAttribute('contenteditable', 'true');
    document.getElementById('emailT').innerText = `Email: ${email}`;
    document.getElementById('emailT').setAttribute('contenteditable', 'true');
    document.getElementById('addressT').innerText = `Address: ${address}`;
    document.getElementById('addressT').setAttribute('contenteditable', 'true');
    document.getElementById('linkedT').href = linkedin;
    document.getElementById('linkedT').innerText = linkedin;
    document.getElementById('linkedT').setAttribute('contenteditable', 'true');
    document.getElementById('githubT').href = github;
    document.getElementById('githubT').innerText = github;
    document.getElementById('githubT').setAttribute('contenteditable', 'true');
    document.getElementById('objectiveT').innerText = objective;
    document.getElementById('objectiveT').setAttribute('contenteditable', 'true');
    // Education
    const degreeFields = document.querySelectorAll('.degreeField');
    const schoolFields = document.querySelectorAll('.schoolField');
    let educationList = '';
    for (let i = 0; i < degreeFields.length; i++) {
        const degree = degreeFields[i].value;
        const school = schoolFields[i].value;
        educationList += `<li contenteditable="true">${degree} from ${school}</li>`;
    }
    const educationSection = document.getElementById('aqT');
    if (educationSection) {
        educationSection.innerHTML = educationList;
    }
    // Work Experience
    const jobFields = document.querySelectorAll('.weJobField');
    const companyFields = document.querySelectorAll('.companyField');
    let workList = '';
    for (let i = 0; i < jobFields.length; i++) {
        const job = jobFields[i].value;
        const company = companyFields[i].value;
        workList += `<li contenteditable="true">${job} at ${company}</li>`;
    }
    const workSection = document.getElementById('weT');
    if (workSection) {
        workSection.innerHTML = workList;
    }
    // Skills
    const skills = document.getElementById('skillsField').value;
    const subSkills = document.getElementById('subSkillField').value;
    const skillsList = `<li contenteditable="true">${skills}</li><li contenteditable="true">${subSkills}</li>`;
    document.getElementById('skillsT').innerHTML = skillsList;
    // Allow all editable sections to be clicked and edited immediately
    makeResumeEditable();
    // Add functionality to make the image editable
    makeImageEditable();
    // Switch visibility: hide form and show resume
    if (cvForm) {
        cvForm.style.display = 'none';
    }
    if (resumeTemplate) {
        resumeTemplate.style.display = 'grid';
    }
}
// Function to make all resume sections editable
function makeResumeEditable() {
    const editableElements = document.querySelectorAll('#resume-template [contenteditable="true"]');
    editableElements.forEach((element) => {
        element.addEventListener('input', () => {
            console.log(`Content in ${element.id} was updated.`);
        });
    });
}
// Function to make the image editable
function makeImageEditable() {
    const imgTemplate = document.getElementById('imgTemplate');
    imgTemplate.addEventListener('click', () => {
        const newImageInput = document.createElement('input');
        newImageInput.type = 'file';
        newImageInput.accept = 'image/*';
        // Listen for image selection
        newImageInput.addEventListener('change', (event) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        imgTemplate.src = reader.result;
                    }
                };
            }
        });
        // Trigger file input when image is clicked
        newImageInput.click();
    });
}
// Code for setting the image initially
const fileInput = document.getElementById('imgField');
const imgTemplate = document.getElementById('imgTemplate');
fileInput?.addEventListener('change', () => {
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                imgTemplate.src = reader.result;
            }
        };
    }
});
// Function to print the CV
function printCV() {
    window.print();
}
// Event listener for form submission
document.getElementById('resume-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    generateCV();
});
