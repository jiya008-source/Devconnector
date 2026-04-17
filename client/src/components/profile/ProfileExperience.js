import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>

    <p>
      {new Date(from).toLocaleDateString()} -{' '}
      {to === null ? 'Now' : new Date(to).toLocaleDateString()}
    </p>

    <p>
      <strong>Position: </strong> {title}
    </p>

    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;