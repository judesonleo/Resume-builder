// File: storage.js - Add this to your project
// This script handles offline data persistence using IndexedDB

// Initialize the database
let db;
const DB_NAME = "resumeBuilderDB";
const STORE_NAME = "formData";
const DB_VERSION = 1;

function initDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event.target.error);
			reject("Error opening database");
		};

		request.onsuccess = (event) => {
			db = event.target.result;
			console.log("Database initialized");
			resolve(db);
		};

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: "id",
					autoIncrement: true,
				});
				console.log("Object store created");
			}
		};
	});
}

// Save form data to IndexedDB
function saveFormData(formData) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject("Database not initialized");
			return;
		}

		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.add(formData);

		request.onsuccess = () => {
			console.log("Form data saved");
			resolve(true);
		};

		request.onerror = (event) => {
			console.error("Error saving form data:", event.target.error);
			reject("Error saving form data");
		};
	});
}

// Load form data from IndexedDB
function loadFormData() {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject("Database not initialized");
			return;
		}

		const transaction = db.transaction([STORE_NAME], "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.getAll();

		request.onsuccess = () => {
			console.log("Form data loaded");
			resolve(request.result);
		};

		request.onerror = (event) => {
			console.error("Error loading form data:", event.target.error);
			reject("Error loading form data");
		};
	});
}

// Delete form data from IndexedDB
function deleteFormData(id) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject("Database not initialized");
			return;
		}

		const transaction = db.transaction([STORE_NAME], "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(id);

		request.onsuccess = () => {
			console.log("Form data deleted");
			resolve(true);
		};

		request.onerror = (event) => {
			console.error("Error deleting form data:", event.target.error);
			reject("Error deleting form data");
		};
	});
}

// Collect form data on submission
function collectFormData() {
	const formData = {
		basicInfo: {
			fullName: $("#fullName").val(),
			email: $("#email").val(),
			phone: $("#phone").val(),
			address: $("#address").val(),
			summary: $("#summary").val(),
		},
		socialLinks: {
			linkedin: $("#linkdin").val(),
			github: $("#github").val(),
			twitter: $("#twitter").val(),
		},
		education: [],
		experience: [],
		skills: [],
		softSkills: [],
		languages: [],
		projects: [],
		certifications: [],
	};

	// Collect education data
	$('input[name="degree[]"]').each(function (index) {
		formData.education.push({
			degree: $(this).val(),
			university: $('input[name="university[]"]').eq(index).val(),
			timeframe: $('input[name="timeeducation[]"]').eq(index).val(),
		});
	});

	// Collect experience data
	$('input[name="jobTitle[]"]').each(function (index) {
		formData.experience.push({
			jobTitle: $(this).val(),
			company: $('input[name="company[]"]').eq(index).val(),
		});
	});

	// Collect skills data
	$('input[name="skill[]"]').each(function () {
		formData.skills.push($(this).val());
	});

	// Collect soft skills data
	$('input[name="Softskill[]"]').each(function () {
		formData.softSkills.push($(this).val());
	});

	// Collect languages data
	$('input[name="language[]"]').each(function () {
		formData.languages.push($(this).val());
	});

	// Collect projects data
	$('input[name="projectTitle[]"]').each(function (index) {
		formData.projects.push({
			title: $(this).val(),
			language: $('input[name="projectLanguage[]"]').eq(index).val(),
			summary: $('textarea[id="projectSummary"]').eq(index).val(),
		});
	});

	// Collect certifications data
	$('input[name="CertificationsTitle[]"]').each(function (index) {
		formData.certifications.push({
			title: $(this).val(),
			link: $('input[name="CertificationsLink[]"]').eq(index).val(),
		});
	});

	return formData;
}

// Fill form with saved data
function fillFormWithData(data) {
	// Basic info
	$("#fullName").val(data.basicInfo.fullName);
	$("#email").val(data.basicInfo.email);
	$("#phone").val(data.basicInfo.phone);
	$("#address").val(data.basicInfo.address);
	$("#summary").val(data.basicInfo.summary);

	// Social links
	$("#linkdin").val(data.socialLinks.linkedin);
	$("#github").val(data.socialLinks.github);
	$("#twitter").val(data.socialLinks.twitter);

	// Clear existing fields before populating
	$("#educationFields").html("");
	$("#experienceFields").html("");
	$("#skillFields").html("");
	$("#softSkillFields").html("");
	$("#languageField").html("");
	$("#projectField").html("");
	$("#certificationsField").html("");

	// Add education fields
	data.education.forEach((edu) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Degree" name="degree[]" value="${edu.degree}">
                <input type="text" class="form-control bg-info" placeholder="University" name="university[]" value="${edu.university}">
                <input type="text" class="form-control bg-info" placeholder="Time Frame" name="timeeducation[]" value="${edu.timeframe}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeEducationField(this)">-</button>
                </div>
            </div>
        `;
		$("#educationFields").append(html);
	});

	// Add experience fields
	data.experience.forEach((exp) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Job Title" name="jobTitle[]" value="${exp.jobTitle}">
                <input type="text" class="form-control bg-info" placeholder="Company" name="company[]" value="${exp.company}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeExperienceField(this)">-</button>
                </div>
            </div>
        `;
		$("#experienceFields").append(html);
	});

	// Add skills fields
	data.skills.forEach((skill) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Skill" name="skill[]" value="${skill}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
                </div>
            </div>
        `;
		$("#skillFields").append(html);
	});

	// Add soft skills fields
	data.softSkills.forEach((softSkill) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Soft Skill" name="Softskill[]" value="${softSkill}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
                </div>
            </div>
        `;
		$("#softSkillFields").append(html);
	});

	// Add language fields
	data.languages.forEach((language) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Language" name="language[]" value="${language}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeSkillField(this)">-</button>
                </div>
            </div>
        `;
		$("#languageField").append(html);
	});

	// Add project fields
	data.projects.forEach((project) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Project Title" name="projectTitle[]" value="${project.title}">
                <input type="text" class="form-control bg-info" placeholder="Project Languages" name="projectLanguage[]" value="${project.language}">
                <textarea class="form-control bg-info" id="projectSummary" rows="3" placeholder="Enter your Project Summary">${project.summary}</textarea>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeProjectField(this)">-</button>
                </div>
            </div>
        `;
		$("#projectField").append(html);
	});

	// Add certification fields
	data.certifications.forEach((cert) => {
		var html = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-info" placeholder="Certification Title" name="CertificationsTitle[]" value="${cert.title}">
                <input type="text" class="form-control bg-info" placeholder="Certifications Link" name="CertificationsLink[]" value="${cert.link}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="removeCertificationField(this)">-</button>
                </div>
            </div>
        `;
		$("#certificationsField").append(html);
	});
}

// Initialize database when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	initDatabase()
		.then(() => {
			console.log("IndexedDB initialized successfully");

			// Add auto-save functionality
			const formInputs = document.querySelectorAll("input, textarea");
			formInputs.forEach((input) => {
				input.addEventListener("blur", () => {
					const formData = collectFormData();
					saveFormData(formData)
						.then(() => console.log("Form auto-saved"))
						.catch((err) => console.error("Auto-save failed:", err));
				});
			});

			// Load last saved form data if exists
			loadFormData()
				.then((savedData) => {
					if (savedData && savedData.length > 0) {
						// Get the most recent entry
						const mostRecent = savedData[savedData.length - 1];

						// Ask if user wants to load saved data
						if (
							confirm(
								"Would you like to load your previously saved resume data?"
							)
						) {
							fillFormWithData(mostRecent);
						}
					}
				})
				.catch((err) => console.error("Error loading saved data:", err));
		})
		.catch((err) => console.error("Error initializing IndexedDB:", err));
});
