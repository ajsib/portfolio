import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Section = styled.div`
  text-align: center;
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;


const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #0C356A;
    transform: scale(1.05);
    // cursor: pointer;
  }
`;

const ProfileSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 100%;
  margin: auto; // Centers the image
`;

const ProfileDetails = styled.div`
  text-align: left;

  @media (max-width: 500px) {
    text-align: center; /* Center-align the content on smaller screens */
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ContentTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
`;

const RightContent = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: right;
`;

const LeftContent = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: left;
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Creates a responsive grid
  gap: 20px;
  padding: 20px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr; // Single column on smaller screens
  }
`;

const ProjectItem = styled.div`
  transition: all 0.2s ease-in-out;
  // ADD PADDING
  padding: 20px;
  //  ROUND CORNERS
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4); /* Uniform box shadow */

  &:hover {
    cursor: pointer;
    transform: translateX(-5px);
  }
`;


const WorkItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Creates a responsive grid
  gap: 20px;
  padding: 20px;
  text-align: left;

  @media (max-width: 500px) {
    grid-template-columns: 1fr; // Single column on smaller screens
  }
`;

const ContactContainer = styled(Section)`
  border-top: 2px solid #eee;
  padding-top: 20px;
`;

// Container for Work Experience and Education Sections
const ExperienceEducationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr; // Stacks vertically on smaller screens
  }
`;

// Centered Container for the Projects Section
const CenteredSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EducationItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Creates a responsive grid
  gap: 20px;
  padding: 20px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr; // Single column on smaller screens
  }
`;

const AboutMe = () => {
  return (
    <Container>
      <ProfileSection>
        <ProfileImage src="/photos/aidanAvatar1.png" alt="Aidan Sibley" />
        <ProfileDetails>
          <Title>Aidan Sibley</Title>
          <SubTitle>Computer Science Student, Army Reservist, Lead Developer</SubTitle>
        </ProfileDetails>
     </ProfileSection>
     <Section>
      <ContentTitle>Who I Am</ContentTitle>
      <Content>
        I am a person who thrives in both technical and high-intensity leadership roles. My journey with computer science and development, coupled with my experience as an Army Reservist, has equipped me with a unique blend of skills. 
      </Content>
      <Content>
      I am passionate about applying my technical expertise in real-world scenarios, constantly seeking new challenges and opportunities to grow.
      </Content>
      </Section>

      <CenteredSection>
        <ContentTitle>Projects</ContentTitle>
        <ProjectContainer>
          <ProjectItem>
            <h3>Meeting Coordination</h3>
            <Content>
              A MERN application for coordinating group meeting times. Utilized by teams at Queen&apos;s Data Analytics Association.
            </Content>
          </ProjectItem>

          <ProjectItem>
            <h3>Headline Social</h3>
            <Content>
              A social media platform focusing on text-based communication, designed for genuine connections. Built using the MERN stack.  
            </Content>
          </ProjectItem>

          <ProjectItem>
            <h3>Password Manager</h3>
            <Content>
              A secure password manager with public-private encryption features. Developed with React-Native, Qt (C++), Node-Express server, and SQL DB.
            </Content>
          </ProjectItem>
        </ProjectContainer>
      </CenteredSection>
      <ExperienceEducationContainer>
        <Section>
          <ContentTitle>Work Experience</ContentTitle>

          <WorkItem>
            <h3>Software Developer, Canadian Army Headquarters</h3>
            <LeftContent>
              Leading development of a digital tools suite to automate workflows. Emphasizing modern frameworks, Microsoft Azure, and DevOps integration.
            </LeftContent>
          </WorkItem>

          <WorkItem>
            <h3>Infantry Reservist, Canadian Armed Forces</h3>
            <LeftContent>
              Completed rigorous military training and contributed to various intensive courses. Recognized for resilience, teamwork, and performance under pressure.
            </LeftContent>
          </WorkItem>
        </Section>
        <Section>
        <ContentTitle>Education</ContentTitle>

        <EducationItem>
          <h3>Queen&apos;s University</h3>
          <RightContent>
            Bachelor of Computing (Hons.) - Specialization in Computer Science with Artificial Intelligence <br></br><br></br>
            Data Analytics Certificate
          </RightContent>
        </EducationItem>
        <EducationItem> 
          <h3> Achievements</h3>
          <RightContent>
          Queen&apos;s University Excellence Scholarship
            <br></br>            <br></br>
            Dean's Honour List, Queen&apos;s University
          </RightContent>

        </EducationItem>

      </Section>
      </ExperienceEducationContainer>

      <ContactContainer>
        <ContentTitle>Get In Touch</ContentTitle>
        <Content>Feel free to reach out for any professional inquiries or collaborations.</Content>
        <Content>Email: ajsibley6@gmail.com</Content>
        <Content>Phone: +1.289.834.2566</Content>
      </ContactContainer>
    </Container>
  );
};

export default AboutMe;