import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Home />}>
        <Route path=":getId" element={<GetId />} />
      </Route>

      <Route path="/myapps" element={<Navigate replace to="/contact" />} />

      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/contact" element={<Contact />}>
        <Route path="email" element={<Email />} />
        <Route path="phone" element={<Phone />} />
      </Route>

      <Route path="/skills" element={<Skills />}>
        <Route path=":getName" element={<GetSkillName />} />
      </Route>

      <Route path="/skilldashboard" element={<SkillDashboard />} />
    </Routes>
  </Router>
);

function Home() {
  const urlId = "paramId";
  return (
    <div>
      <h2>Home Page</h2>
      <Link className="btn btn-info mx-2" to="/contact">
        Move to Contact Page
      </Link>
      <Link className="btn btn-info mx-2" to="/skills">
        Move to Skills Page
      </Link>
      <Link className="btn btn-secondary" to={urlId}>
        Get Url
      </Link>
      <Outlet />
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact Page</h2>
      <h4>Feel free to contact</h4>
      <Link className="btn btn-primary mx-2" to="/contact/email">
        My email
      </Link>
      <Link className="btn btn-success mx-2" to="/contact/phone">
        My contact
      </Link>
      <Outlet />
    </div>
  );
}

function Email() {
  return (
    <div className="mt-4">
      <h2>My Email Id</h2>
      <h4>abhinavkale1234@gmail.com</h4>
    </div>
  );
}

function Phone() {
  return (
    <div className="mt-4">
      <h2>My Contact Phone No</h2>
      <h4>1234567890</h4>
    </div>
  );
}

function GetId() {
  const { getId } = useParams();
  return (
    <div className="mt-4">
      <h4>Url Params id: {getId}</h4>
    </div>
  );
}

function Skills() {
  const skillsList = ["React", "NodeJs", "JavaScript", "C++"];
  const [getRandomSkill, setGetRandomSkill] = useState(
    skillsList[Math.floor(Math.random() * skillsList.length)]
  );
  return (
    <div>
      <h2>Skills Page</h2>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "#9F2BC1" : "#E1A2B8",
            isActive: !isActive,
          };
        }}
        className="btn btn-secondary"
        onClick={() =>
          setGetRandomSkill(
            skillsList[Math.floor(Math.random() * skillsList.length)]
          )
        }
        to={`/skills/${getRandomSkill}`}
      >
        Click here to get my Random skills
      </NavLink>

      <Outlet />
    </div>
  );
}

function SkillDashboard() {
  const location = useLocation()
  return (
    <div>
      <h2>Learn this skills from this channel <a href={location.state} target="_blank">Here</a></h2>
    </div>
  );
}

function GetSkillName() {
  const { getName } = useParams();
  const navigate = useNavigate()
  return (
    <div className="mt-4">
      <h3>Randomly selected skill: {getName}</h3>
      <h5>Want to learn this skill?</h5>
      <button className="btn btn-warning" onClick={() => {
        navigate("/skilldashboard", {state: "https://www.youtube.com/c/TraversyMedia"})
      }}>Click here</button>
      
      {/* <Link to="/skilldashboard" state={"https://www.youtube.com/c/TraversyMedia"}>Click here</Link> */}
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
