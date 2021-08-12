const router = require('express').Router();
const { user } = require('../../models');
const { post } = require('../../models');
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/:id', async (req, res) => {
//     try {
//       const newComment = await comment.create({
//         ...req.body,
//         user_id: req.session.user_id,
//         post_id: req.params.id,
//         username: req.session.username,
//         logged_in: req.session.logged_in
//       },
//       );
//       res.render("homePage", {
//         ...newComment,
//         user_id: req.session.user_id,
//         userLoggedIn: req.session.username,
//         logged_in: req.session.logged_in,
    
//       });
//       console.log("IS IT REACHING HERE")
//       res.status(200).json(newComment);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(req.body);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    comment.create({
      message: req.body.message,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
});

  // get all comments

  router.get("/", async (req,res) => {
            comment.findAll({})
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            })
  });


//get one comment

router.get('/:id', (req, res) => {
  comment.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


//delete a comment

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

module.exports = router;