import {
  contactInfo,
  jobData,
  educationData,
  languages,
  tools,
  certifications,
  projectsData,
} from "./resumeData";

export default function App() {
  return (
    <div>
      <Header />
      <h2>Employment History</h2>
      <Divider />
      <Employment />
      <h2>Education</h2>
      <Divider />
      <Education />
      <h2>Technical Skills</h2>
      <Divider />
      <TechSkills />
      <h2>Projects</h2>
      <Divider />
      <Projects />
    </div>
  );
}

function Header() {
  return (
    <p>
      {contactInfo.map((info, index) => (
        <div key={index}>
          <h1 className="headerMain">{info.name}</h1>
          <div className="headerSub">
            {info.citizenship} || {info.clearance}
          </div>
          <div className="headerSub">
            {info.phoneNumber} || {info.email} || {info.linkedin} ||{" "}
            {info.github}
          </div>
        </div>
      ))}
    </p>
  );
}

function Divider() {
  return <hr></hr>;
}

function Employment() {
  return (
    <div>
      {jobData.map((job, index) => (
        <div key={index}>
          <div className="jobHeader">
            <b>
              {job.employer}
              <span className="rightAlign">{job.location}</span>
            </b>
          </div>
          <b>
            <i>{job.title}</i>
          </b>
          <span className="rightAlign">
            {job.startDate} - {job.endDate}
          </span>
          <ul>
            {job.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div>
      {educationData.map((education, index) => (
        <p key={index}>
          <b>
            <div>
              {education.school}
              <span className="rightAlign">{education.location}</span>
            </div>
          </b>
          <div className="indentTab">
            {education.degree}, {education.major} || {education.gpa}
            <span className="rightAlign">
              {education.startDate} - {education.endDate}
            </span>
          </div>
        </p>
      ))}
    </div>
  );
}

function TechSkills() {
  return (
    <div>
      <p>
        <b>Programming Languages:</b>{" "}
        {languages.map((language) => language).join(", ")}
      </p>
      <p>
        <b>Tools/Software:</b> {tools.map((tool) => tool).join(", ")}
      </p>
      <p>
        <b>Certifications:</b> {certifications.map((certs) => certs).join(", ")}
      </p>
    </div>
  );
}

function Projects() {
  return (
    <div>
      {projectsData.map((project, index) => (
        <p key={index}>
          <b>{project.name}</b>
          <span className="rightAlign">
            {project.tools.map((tool) => tool).join(", ")}
          </span>
          <ul>
            {project.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </p>
      ))}
    </div>
  );
}
