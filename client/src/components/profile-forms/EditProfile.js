import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
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
  instagram: '',
  avatar: ''
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };

      for (const key in profileData) {
        if (profile[key]) profileData[key] = profile[key];
      }

      if (profile.social) {
        for (const key in profile.social) {
          if (profile.social[key]) profileData[key] = profile.social[key];
        }
      }

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadError(null);

    let avatarUrl = formData.avatar;

    // Upload image if a file was selected
    if (file) {
      try {
        const formDataFile = new FormData();
        formDataFile.append('image', file);

        const res = await fetch('https://devconnector-ja35.onrender.com/api/upload', {
          method: 'POST',
          body: formDataFile
        });

        // Check if the response is OK before parsing JSON
        if (!res.ok) {
          const text = await res.text();
          console.error('Upload server error:', text);
          setUploadError(`Upload failed (${res.status}): ${text}`);
          return;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Upload did not return JSON:', text);
          setUploadError('Upload endpoint returned an unexpected response. Check your server.');
          return;
        }

        const data = await res.json();
        avatarUrl = data.filePath;
      } catch (err) {
        console.error('Upload error:', err);
        setUploadError('Upload failed. Check console for details.');
        return;
      }
    }

    // Save profile with avatar URL
    createProfile(
      { ...formData, avatar: avatarUrl },
      navigate,
      true
    );
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Edit and customize your profile
      </p>
      <small>* = required field</small>

      <form className='form' onSubmit={onSubmit}>

        {/* Profile Image */}
        <div className='form-group'>
          <h4>Profile Image</h4>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          {uploadError && (
            <p style={{ color: 'red', marginTop: '5px' }}>{uploadError}</p>
          )}
        </div>

        {/* Status */}
        <div className='form-group'>
          <select name='status' value={status} onChange={onChange}>
            <option value=''>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        {/* Company */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Website */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Location */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Skills */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* GitHub Username */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Bio */}
        <div className='form-group'>
          <textarea
            name='bio'
            cols='30'
            rows='5'
            placeholder='A short bio about yourself'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        {/* Social Links Toggle */}
        <div className='form-group'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn my-1' to='/dashboard'>
          Go Back
        </Link>

      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);