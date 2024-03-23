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
function addSoftSkillField() {
    var html = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Soft Skill" name="Softskill[]">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
            </div>
        </div>
    `;
    $('#softSkillFields').append(html);

}
function addNewProject(){
    var html = `
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Project Title" name="projectTitle[]">
    <input type="text" class="form-control" placeholder="Project Languages" name="projectLanguage[]">
    <textarea class="form-control" id="projectSummary" rows="3" placeholder="Enter your Project Summary"></textarea>
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" onclick="removeProjectField(this)">-</button>
        </div>
</div>
    `;
    $('#projectField').append(html);


}
function removeProjectField(element){
    $(element).closest('.input-group').remove();
}
function language() {
    var html = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Language" name="language[]">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
            </div>
        </div>
    `;
    $('#languageField').append(html);

}
function addNewCertification(){
    var html = `
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Certification Title" name="certificationsTitle[]">
    <input type="text" class="form-control" placeholder="Certification Link" name="certificationsLink[]">
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" onclick="removeCertificationField(this)">-</button>
        </div>`
    $('#certificationsField').append(html);
}
function removeCertificationField(element){
    $(element).closest('.input-group').remove();

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
        var summary = $('#summary').val();
        var address = $('#address').val();
        var Linkdin = $('#linkdin').val();
        var Github = $('#github').val();
        var Twitter = $('#twitter').val();
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
        var Softskills = [];
        $('input[name="Softskill[]"]').each(function() {
            var Softskill = $(this).val();
            Softskills.push(Softskill);
        });
        var languages = [];
        $('input[name="language[]"]').each(function() {
            var language = $(this).val();
            languages.push(language);
        });
        var projectTitles = [];
        $('input[name="projectTitle[]"]').each(function() {
            var projectTitle = $(this).val();
            projectTitles.push(projectTitle);
        });
        var projectLanguages = [];
        $('input[name="projectLanguage[]"]').each(function() {
            var projectLanguage = $(this).val();
            projectLanguages.push(projectLanguage);
        });
        var projectSummary = [];
        $('textarea[id="projectSummary"]').each(function() {
            var projectSummaries = $(this).val();
            projectSummary.push(projectSummaries);
        });
        var CertificationsTiles = [];
        $('input[name="CertificationsTitle[]"]').each(function() {
            var certificationtitle = $(this).val();
            CertificationsTiles.push(certificationtitle);
        });
        var CertificationsLinks = [];
        $('input[name="CertificationsLink[]"]').each(function() {
            var certificationLink = $(this).val();
            CertificationsLinks.push(certificationLink);
        });


        var projectsHtml = projectTitles.map(function(projectTitle, index) {
            return `
                <div class="title">
                    <h4>${projectTitle}</h4>
                    <h4>${projectLanguages[index]}</h4>
                </div>
                <p>${projectSummary[index]}</p>`;
        }).join('');

        var certificationsHtml = CertificationsTiles.map(function(certificationtitle, index) {
            return `
                <ul>
                    <li>${certificationtitle}</li>
                    <li>${CertificationsLinks[index]}</li>
                </ul>`;
        }).join('');


        var image = document.getElementById('image').files[0]; 
        var imageElement = '';
        if (image) {
            var imageUrl = URL.createObjectURL(image);
            imageElement = `<img src="${imageUrl}" alt="User Image" style=" width:5.42cm;
            height: 5.42cm;">`;
        } else {
            imageElement = '<p>No image selected</p>';
        }
        
        
        var resumeContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href='https://fonts.googleapis.com/css?family=League Spartan' rel='stylesheet'>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="./template/template2.css">
            
        </head>
        <body>
            <div class="template-main" id="main-form">
                <div class="header">
                    <div class="img">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="">
                    </div>
                    <h1 >
                        ${fullName}
                    </h1>
                </div>  
                <div class="main">
                <div class="first">
                    <div class="profile-section">
                        <h3 class="heading">My contact</h3>
                        <div class="links">
                            <a href="">${address}</a>
                            <a href="">${phone}</a>
                            <a href="">${email}</a>
                            <a href="">${Linkdin}</a>
                            <a href="">${Github}</a>
                            <a href="">${Twitter}</a>
                            
                        </div>
                        
                        <div class="Soft-Skills">
                            <h3 class="heading">Soft Skills</h3>
                            <div class="lists">
                                <ul>
                                ${Softskills.map(function(Softskill) {
                                    return `<li>${Softskill}</li>`;
                                }).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="education">
                            <h3 class="heading">Education Background</h3>
                            <div class="lists">
                                <ul>
                                ${education.map(function(edu) {
                                    return `<li>${edu.degree} from ${edu.university}</li>`;
                                }).join('')}
                                    
                                    
                                </ul>
                            </div>
                        </div>
                        <div class="language">
                            <h3 class="heading">Language</h3>
                            <div class="lists">
                                <ul>
                                ${languages.map(function(language) {
                                    return `<li>${language}</li>`;
                                }).join('')}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div class="second">
                    <div class="Summary">
                        <h3 class="heading">Summary</h3>
                        <p class="lists">
                                ${summary}
                        </p>
                    </div>
                    <div class="education">
                        <h3 class="heading">Projects & experience</h3>
                        <div class="lists">
                            <div class="projects">
                            ${projectsHtml}
                                
                                
                                
                            </div>
                        </div>
                        <div class="Technical-Skills">
                        <h3 class="heading">Technical Skills</h3>
                        <div class="lists">
                        
                            <ul>
                            ${skills.map(function(skill) {
                                return `<li>${skill}</li>`;
                            }).join('')}
                                
                            </ul>
                        </div>
                    </div>
                    <div class="certifications">
                        <div class="certicate">
                            <h3 class="heading">
                                Certifications
                            </h3>
                            <div class="lists">
                                ${certificationsHtml}
                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <script src="/template/script1.js">
                
            </script>
            <script src="../script.js"></script> 
        </body>
        </html>`
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