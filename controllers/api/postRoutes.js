const router = require('express').Router();
const sequelize = require('../../config/connection');
const { user } = require('../../models')
const { post } = require('../../models');
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

//post new post

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




 



// find all 
router.get("/", async (req,res) => {
  const postData = await post.findAll( {
    
    include: [
      {
        model: user,
        attributes: ["name"],
      },
      {
        model: comment,
      },
    ],
  });
  const allPosts = postData.get({ plain: true });
  console.log("here?!");
  console.log(postData);
  res.render("homePage", {
    ...allPosts,
    user_id: req.session.user_id,
    userLoggedIn: req.session.username,
    logged_in: req.session.logged_in,

  });
});



router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const updatePost = await post.update({
     
    },
    {
      where: {
        id: req.params.id,
      },
    });
    let responseBack = await post.findByPk(req.params.id);

    res.status(200).json(responseBack);
  } catch (err) {
    res.status(400).json(err)
  }
});

// delete post

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

module.exports = router;
