import React, { useState, useEffect } from 'react';
import './App.css'; 

const GitHubProfile = () => {
  const [theme, setTheme] = useState('dark');
  const [userData, setUserData] = useState(null);

  const projects = [
    {
      title: 'Decentralized Finance App',
      image: 'https://via.placeholder.com/150',
      description: 'A DeFi application that allows users to trade tokens on the blockchain.',
      category: 'Blockchain',
      languages: ['Solidity', 'React', 'JavaScript']
    },
    {
      title: 'Portfolio Website',
      image: 'https://via.placeholder.com/150',
      description: 'A personal portfolio website built with React.',
      category: 'Frontend',
      languages: ['React', 'CSS', 'JavaScript']
    },
    {
      title: 'API for Financial Data',
      image: 'https://via.placeholder.com/150',
      description: 'A RESTful API that provides real-time financial data.',
      category: 'Backend',
      languages: ['Node.js', 'Express', 'MongoDB']
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('https://api.github.com/users/birdnavas');
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">

      <div className="main-content">
        <div className="left-column">
        <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
          <div className="profile-container-left">
            <div className="profile-header">
              <img src={userData.avatar_url} alt="Profile" className="avatar" />
              <div className="profile-info">
                <h2>{userData.name}</h2>
                <p>{userData.bio}</p>
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                  GitHub
                </a>
              </div>
            </div>

            <div className="skills-container">
              <h3>Skills</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <h4>JavaScript</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '80%' }}></div>
                  </div>
                  <p>80% proficiency</p>
                </div>
                <div className="skill-item">
                  <h4>Blockchain</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '70%' }}></div>
                  </div>
                  <p>70% proficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="projects-container">
            <h2>Live Projects</h2>
            <div className="all-projects-list">
              {projects.map((project, index) => (
                <div className="project-card" key={index}>
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="project-category">
                      <span className="category">{project.category}</span>
                    </div>
                    <div className="project-languages">
                      {project.languages.map((language, idx) => (
                        <span key={idx} className="language">{language}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
