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

    const sortedPosts = userPosts.sort((a,b) => (a.date_posted < b.date_posted) ? 1 : -1 );

    const allPosts = sortedPosts.map((post) => post.get({ plain: true }));
  
  res.render('homePage', {
    allPosts,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
});

//post route

router.post('/', async (req, res) => {
  try { 
    const newPost = await post.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username
    });
    
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete route

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


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

router.get("/createPost", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await user.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: post }],
    });
    const loggedUser = userData.get({ plain: true });


    
    res.render('createPost');
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/createPost', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/createPost');
    return;
  }

  res.render('createPost');
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
