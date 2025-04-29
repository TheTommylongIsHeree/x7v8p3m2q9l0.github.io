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
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon-stars"></i>';
        }
    });
}

// Fetch portfolio data from API
async function fetchPortfolioData() {
    // try {
    //     const response = await fetch('https://your-netlify-api-endpoint.netlify.app/.netlify/functions/getPortfolioData');
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch portfolio data');
    //     }
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
        // console.error('Error fetching portfolio data:', error);
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
                    image: 'data:image/png;base64,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',
                    liveUrl: '#',
                    githubUrl: 'https://github.com/x7v8p3m2q9l0/x7v8p3m2q9l0.github.io',
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
            <img src="${project.image || 'jupiter.png'}" alt="${project.title}" class="project-image">
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
