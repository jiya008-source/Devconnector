import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

const CreateProfile = ({ createProfile, setAlert }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    let hasError = false;

    if (status === '' || status === '0') {
      setAlert('Status is required', 'danger');
      hasError = true;
    }

    if (skills === '') {
      setAlert('Skills is required', 'danger');
      hasError = true;
    }

    if (hasError) return;

    createProfile(formData, navigate);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>

      <small>* = required field</small>

      <form className="form" onSubmit={onSubmit}>
        
        {/* STATUS */}
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor or Teacher">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* BASIC FIELDS */}
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
        </div>

        {/* TOGGLE BUTTON */}
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            {displaySocialInputs ? 'Hide Social Links' : 'Add Social Network Links'}
          </button>
          <span> Optional</span>
        </div>

        {/* SOCIAL INPUTS */}
        {displaySocialInputs && (
          <Fragment>

            <div className="form-group social-input">
              <i className="fab fa-twitter"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin"></i>
              <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>

          </Fragment>
        )}

        {/* BUTTONS */}
        <input type="submit" className="btn btn-primary my-1" value="Submit" />

        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { createProfile, setAlert })(CreateProfile);