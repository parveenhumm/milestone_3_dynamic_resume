// Update these initial visibility settings
const cvForm = document.getElementById('cv-form');
const resumeTemplate = document.getElementById('resume-template');

if (cvForm) {
  cvForm.style.display = 'block';  // Ensure the form is visible initially
}
if (resumeTemplate) {
  resumeTemplate.style.display = 'none';  // Ensure the resume template is hidden initially
}

// Update the generateCV function to switch visibility
function generateCV() {
  // Personal Information
  const name = (document.getElementById('nameField') as HTMLInputElement).value;
  const jobTitle = (document.getElementById('titleField') as HTMLInputElement).value;
  const contact = (document.getElementById('contactField') as HTMLInputElement).value;
  const email = (document.getElementById('emailField') as HTMLInputElement).value;
  const address = (document.getElementById('addressField') as HTMLInputElement).value;
  const linkedin = (document.getElementById('linkedinField') as HTMLInputElement).value;
  const github = (document.getElementById('githubField') as HTMLInputElement).value;
  const objective = (document.getElementById('objectiveField') as HTMLTextAreaElement).value;

  // Populate Resume Template with contenteditable fields
  (document.getElementById('fullnameT') as HTMLElement).innerText = name;
  (document.getElementById('fullnameT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('nameT') as HTMLElement).innerText = name;
  (document.getElementById('nameT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('jobtitleT') as HTMLElement).innerText = jobTitle;
  (document.getElementById('jobtitleT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('phoneT') as HTMLElement).innerText = `Phone: ${contact}`;
  (document.getElementById('phoneT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('emailT') as HTMLElement).innerText = `Email: ${email}`;
  (document.getElementById('emailT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('addressT') as HTMLElement).innerText = `Address: ${address}`;
  (document.getElementById('addressT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('linkedT') as HTMLAnchorElement).href = linkedin;
  (document.getElementById('linkedT') as HTMLElement).innerText = linkedin;
  (document.getElementById('linkedT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('githubT') as HTMLAnchorElement).href = github;
  (document.getElementById('githubT') as HTMLElement).innerText = github;
  (document.getElementById('githubT') as HTMLElement).setAttribute('contenteditable', 'true');
  
  (document.getElementById('objectiveT') as HTMLElement).innerText = objective;
  (document.getElementById('objectiveT') as HTMLElement).setAttribute('contenteditable', 'true');

  // Education
  const degreeFields = document.querySelectorAll('.degreeField') as NodeListOf<HTMLInputElement>;
  const schoolFields = document.querySelectorAll('.schoolField') as NodeListOf<HTMLInputElement>;
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
  const jobFields = document.querySelectorAll('.weJobField') as NodeListOf<HTMLInputElement>;
  const companyFields = document.querySelectorAll('.companyField') as NodeListOf<HTMLInputElement>;
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
  const skills = (document.getElementById('skillsField') as HTMLInputElement).value;
  const subSkills = (document.getElementById('subSkillField') as HTMLTextAreaElement).value;
  const skillsList = `<li contenteditable="true">${skills}</li><li contenteditable="true">${subSkills}</li>`;
  (document.getElementById('skillsT') as HTMLElement).innerHTML = skillsList;

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
  const imgTemplate = document.getElementById('imgTemplate') as HTMLImageElement;

  imgTemplate.addEventListener('click', () => {
    const newImageInput = document.createElement('input');
    newImageInput.type = 'file';
    newImageInput.accept = 'image/*';

    // Listen for image selection
    newImageInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
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
const fileInput = document.getElementById('imgField') as HTMLInputElement;
const imgTemplate = document.getElementById('imgTemplate') as HTMLImageElement;

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