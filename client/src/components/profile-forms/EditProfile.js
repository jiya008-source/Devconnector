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
  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();

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

    let avatarUrl = formData.avatar;

    // 1. Upload image if selected
    if (file) {
      const formDataFile = new FormData();
      formDataFile.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataFile
      });

      const data = await res.json();
      avatarUrl = data.filePath;
    }

    // 2. Save profile with avatar URL
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
        <i className='fas fa-user' /> Edit your profile
      </p>

      <form className='form' onSubmit={onSubmit}>

        {/* ✅ PROFILE IMAGE INPUT */}
        <div className='form-group'>
          <p>Profile Image</p>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

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

        <input
          type='text'
          placeholder='Company'
          name='company'
          value={company}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Website'
          name='website'
          value={website}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Location'
          name='location'
          value={location}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Skills'
          name='skills'
          value={skills}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Github Username'
          name='githubusername'
          value={githubusername}
          onChange={onChange}
        />

        <textarea
          placeholder='Bio'
          name='bio'
          value={bio}
          onChange={onChange}
        />

        <button
          type='button'
          className='btn btn-light'
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
        >
          Add Social Links
        </button>

        {displaySocialInputs && (
          <Fragment>
            <input name='twitter' value={twitter} onChange={onChange} placeholder='Twitter' />
            <input name='facebook' value={facebook} onChange={onChange} placeholder='Facebook' />
            <input name='youtube' value={youtube} onChange={onChange} placeholder='YouTube' />
            <input name='linkedin' value={linkedin} onChange={onChange} placeholder='LinkedIn' />
            <input name='instagram' value={instagram} onChange={onChange} placeholder='Instagram' />
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary' />
        <Link className='btn btn-light' to='/dashboard'>
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