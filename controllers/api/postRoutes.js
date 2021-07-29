const router = require('express').Router();
const { user } = require('../../models')
const { post } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const updatePost = await post.update({
      // image: req.body.image,
      likes: req.body.likes,
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
