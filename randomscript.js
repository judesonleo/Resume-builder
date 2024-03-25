const formSteps = document.querySelectorAll('.form-step');
const prevButton = document.querySelector('.step-prev');
const nextButton = document.querySelector('.step-next');
const submitButton = document.querySelector('.step-submit');
const fillstyle = document.querySelectorAll('.material-symbols-rounded');
let currentStep = 0;

function showStep(stepIndex) {
    formSteps.forEach((step, index) => {
        if (index === stepIndex) {
            step.style.display = 'block';
        } else {
            step.style.display = 'none';
        }
    });
    console.log(stepIndex);
    fillSteps(stepIndex);
}

function fillSteps(stepIndex) {
    fillstyle.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('fill');
        } else {
            step.classList.remove('fill');
        }
    });
}

const nextStep = () => {
    console.log("Before nextStep:", currentStep);
    if (currentStep < formSteps.length - 1) {
        console.log("After nextStep:", currentStep);
        currentStep++;
        showStep(currentStep);
        updateButtons();
    }
};

const prevStep = () => {
    console.log("Before prevStep:", currentStep);
    if (currentStep > 0) {
        console.log("After prevStep:", currentStep);
        currentStep--;
        showStep(currentStep);
        updateButtons();
    }
};


const updateButtons = () => {
    if (currentStep === 0) {
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('disabled');
    }

    if (currentStep === formSteps.length - 1) {
        nextButton.disabled = true;
        nextButton.classList.add('disabled');
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    } else {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
};

prevButton.addEventListener('click', prevStep);
nextButton.addEventListener('click', nextStep);

showStep(currentStep);
updateButtons();
