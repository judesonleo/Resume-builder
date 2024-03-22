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
        var image = document.getElementById('image').files[0]; 
        var imageElement = '';
        if (image) {
            var imageUrl = URL.createObjectURL(image);
            imageElement = `<img src="${imageUrl}" alt="User Image" style=" width:5.42cm;
            height: 5.42cm;">`;
        } else {
            imageElement = '<p>No image selected</p>';
        }
        
        var resumeContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="./template/template1.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

        </head>
        <body>
            <div class="template-main" id="main-form">
                <div class="first">
                    <div class="img">
                        ${imageElement}
                    </div>
                    <div class="profile-section">
                        <div class="name">
                            ${fullName}
                        </div>
                        <div class="links">
                            <a href="">${email}</a>
                            <a href="">${phone}</a>
                            <a href=""></a>
                            <a href=""></a>
                            <a href=""></a>
                            <a href=""></a>
                        </div>
                        <div class="about">
        
                        </div>
                        <div class="skills">
                            ${skills.map(function(skill) {
                                return `<div class="skill">${skill}</div>`;})}
                        </div>
                        <div class="language">
        
                        </div>
                        
                    </div>
                </div>
                <div class="second">
                    <div class="summary">
        
                    </div>
                    <div class="education">
                    ${education.map(function(edu) {
                        return `<div class="education-item">
                            <div class="degree">${edu.degree}</div>
                            <div class="university-name">${edu.university}</div>
                        </div>`;})}
                    </div>
                    <div class="technical-skills">
        
                    </div>
                    <div class="projects">
        
                    </div>
                    <div class="certifications">
                        
                    </div>
                </div>
            </div>
            <button id="downloadButton" onclick="printCV()">Download PDF</button>
                        <script>
                        document.getElementById('downloadButton').addEventListener('click', function() {
                            const element = document.querySelector('.template-main');
                            html2pdf()
                                .from(element)
                                .set({ format: 'A4', orientation: 'portrait' }) 
                                .save();
                        });
                        </script>
            <script src="/template/script1.js">
                
            </script>
            <script src="../script.js"></script>
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

function generateResume(event) {
    let fullName = document.getElementById('fullName').value;
    console.log(fullName);
    
}
function printCV(){
    window.print('template-main');
}