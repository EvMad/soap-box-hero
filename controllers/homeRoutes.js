const router = require('express').Router();
const { user, post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {

  try {
    // Get all posts
    const userPosts = await post.findAll({
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });
    const allPosts = userPosts.map((post) => post.get({ plain: true }));
  // res.send('hello');
  res.render('homePage', {
    post,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
});



router.post('/', async (req,res) => {
  res.render('createPost');
})

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await user.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
