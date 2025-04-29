// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const projectsGrid = document.getElementById('projects-grid');
const skillsContainer = document.getElementById('skills-container');
const footerYear = document.getElementById('year');
const nameElement = document.getElementById('name');
const bioElement = document.getElementById('bio');
const footerNameElement = document.getElementById('footer-name');
const contactForm = document.getElementById('contact-form');

// Set current year
footerYear.textContent = new Date().getFullYear();

// Theme toggle functionality
function setupThemeToggle() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon-stars"></i>';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Fetch portfolio data from API
async function fetchPortfolioData() {
    try {
        const response = await fetch('https://your-netlify-api-endpoint.netlify.app/.netlify/functions/getPortfolioData');
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Fallback to sample data if API call fails
        return {
            profile: {
                name: 'NegativeZ',
                bio: 'A normal developer',
                email: 'rbgkbj@gmail.com',
                location: 'Vietnam',
                socialLinks: {
                    github: 'https://github.com/x7v8p3m2q9l0',
                    linkedin: 'https://linkedin.com',
                    twitter: 'https://twitter.com'
                }
            },
            projects: [
                {
                    id: 1,
                    title: 'Portfolio Website',
                    description: 'A responsive portfolio website built with HTML, CSS, and JavaScript. I loved Jupiter:)',
                    image: 'jupiter.jpg',
                    liveUrl: '#',
                    githubUrl: 'https://github.com/x7v8p3m2q9l0',
                    technologies: ['HTML', 'CSS', 'JavaScript']
                },
            ],
            skills: [
                {
                    id: 1,
                    name: 'HTML',
                    category: 'Frontend',
                    icon: 'fa-brands fa-html5'
                },
                {
                    id: 2,
                    name: 'CSS',
                    category: 'Frontend',
                    icon: 'fa-brands fa-css'
                },
                {
                    id: 3,
                    name: 'JavaScript',
                    category: 'Frontend',
                    icon: 'fa-brands fa-square-js'
                },
                {
                    id: 5,
                    name: 'Node.js',
                    category: 'Backend',
                    icon: 'fa-brands fa-node-js'
                },
                {
                    id: 6,
                    name: 'Python',
                    category: 'Backend',
                    icon: 'fa-brands fa-python'
                }
            ]
        };
    }
}

// Render projects
function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <img src="${project.image || 'placeholder-image.jpg'}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>` : ''}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Render skills
function renderSkills(skills) {
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-category">${skill.category}</p>
        `;
        
        skillsContainer.appendChild(skillCard);
    });
}

// Update profile information
function updateProfileInfo(profile) {
    nameElement.textContent = profile.name;
    bioElement.textContent = profile.bio;
    footerNameElement.textContent = profile.name;
    
    // Update contact info
    document.querySelector('.contact-item:nth-child(1) p').textContent = profile.email;
    document.querySelector('.contact-item:nth-child(2) p').textContent = profile.location;
    
    // Update social links
    const socialLinks = document.querySelector('.social-links');
    if (profile.socialLinks) {
        const links = socialLinks.querySelectorAll('a');
        if (links[0] && profile.socialLinks.github) links[0].href = profile.socialLinks.github;
        if (links[1] && profile.socialLinks.linkedin) links[1].href = profile.socialLinks.linkedin;
        if (links[2] && profile.socialLinks.twitter) links[2].href = profile.socialLinks.twitter;
    }
}

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch('https://your-netlify-api-endpoint.netlify.app/.netlify/functions/submitContactForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        
        // Reset form and show success message
        contactForm.reset();
        alert('Message sent successfully!');
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again later.');
    }
});

// Initialize
async function init() {
    setupThemeToggle();
    
    // Fetch data and render components
    const portfolioData = await fetchPortfolioData();
    
    updateProfileInfo(portfolioData.profile);
    renderProjects(portfolioData.projects);
    renderSkills(portfolioData.skills);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
