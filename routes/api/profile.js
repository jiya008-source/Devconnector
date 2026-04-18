const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const config = require('config');
const axios = require('axios');


// =======================
// GET CURRENT PROFILE
// =======================
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// =======================
// CREATE / UPDATE PROFILE
// =======================
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      avatar   
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    //  ADD AVATAR SUPPORT
    if (avatar) profileFields.avatar = avatar;

    // Skills handling
    if (skills) {
      profileFields.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => skill.trim());
    }

    // Social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // UPDATE
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // CREATE
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// =======================
// GET ALL PROFILES
// =======================
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// =======================
// GET PROFILE BY USER ID
// =======================
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).send('Profile Not Found');
    }

    res.status(500).send('Server error');
  }
});


// =======================
// DELETE PROFILE + USER + POSTS
// =======================
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// =======================
// EXPERIENCE (UNCHANGED)
// =======================
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newExp = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// =======================
// EDUCATION (UNCHANGED)
// =======================
// (keep your existing education routes as-is)


// =======================
// GITHUB (UNCHANGED)
// =======================
router.get('/github/:username', async (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos` +
      `?per_page=5&sort=created:asc` +
      `&client_id=${config.get('githubClientId')}` +
      `&client_secret=${config.get('githubSecret')}`;

    const response = await axios.get(uri, {
      headers: { 'User-Agent': 'node.js' }
    });

    res.json(response.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ msg: 'No GitHub profile found' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;