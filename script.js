function addEducationField() {
    var html = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Degree" name="degree[]">
            <input type="text" class="form-control" placeholder="University" name="university[]">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="removeEducationField(this)">-</button>
            </div>
        </div>
    `;
    $('#educationFields').append(html);
}

function removeEducationField(element) {
    $(element).closest('.input-group').remove();
}

function addExperienceField() {
    var html = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Job Title" name="jobTitle[]">
            <input type="text" class="form-control" placeholder="Company" name="company[]">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="removeExperienceField(this)">-</button>
            </div>
        </div>
    `;
    $('#experienceFields').append(html);
}

function removeExperienceField(element) {
    $(element).closest('.input-group').remove();
}
function addSkillField() {
    var html = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Skill" name="skill[]">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
            </div>
        </div>
    `;
    $('#skillFields').append(html);
}

function removeSkillField(element) {
    $(element).closest('.input-group').remove();
}
$(document).ready(function() {
    function generateResume(event) {
        event.preventDefault(); 
        var fullName = $('#fullName').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var education = [];
        $('input[name="degree[]"]').each(function(index) {
            var degree = $(this).val();
            var university = $('input[name="university[]"]').eq(index).val();
            education.push({ degree: degree, university: university });
        });
        var experience = [];
        $('input[name="jobTitle[]"]').each(function(index) {
            var jobTitle = $(this).val();
            var company = $('input[name="company[]"]').eq(index).val();
            experience.push({ jobTitle: jobTitle, company: company });
        });
        var skills = [];
        $('input[name="skill[]"]').each(function() {
            var skill = $(this).val();
            skills.push(skill);
        });
        var resumeContent = `
            <html>
            <head>
                <title>Generated Resume</title>
                <style>
                    /* Add your custom styles here */
                </style>
            </head>
            <body>
                <h1>Resume</h1>
                <p><strong>Full Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <h2>Education</h2>
                <ul>
                    ${education.map(edu => `<li>${edu.degree} - ${edu.university}</li>`).join('')}
                </ul>
                <h2>Work Experience</h2>
                <ul>
                    ${experience.map(exp => `<li>${exp.jobTitle} at ${exp.company}</li>`).join('')}
                </ul>
                <h2>Skills</h2>
                <p>${skills.join(', ')}</p>
            </body>
            </html>
        `;
        var resumePage = window.open();
        resumePage.document.open();
        resumePage.document.write(resumeContent);
        resumePage.document.close();
    }

    $('#resumeForm').submit(generateResume);
});
