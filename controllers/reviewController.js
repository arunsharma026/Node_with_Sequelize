const { where, Model } = require('sequelize')
const db = require('../models')

const Review = db.reviews

const addReview = async (req, res) => {

  try {
    let Data = {
      productId: req.body.productId,
      rating: req.body.rating,
      description: req.body.description
    }

    console.log("Data", Data)
    const review = await Review.create(Data)

    res.status(200).send(review)
  }
  catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getAllreview = async (req, res) => {
  try {
    const review = await Review.findAll({ where: { productId: req.body.productId } })
    // const review = await Review.findAll(({}))
    res.status(200).send(review)
  }
  catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getOnereview = async (req, res) => {
  const productId = req.body.productId
  try {
    const oneReview = await Review.findAll({
      where: { productId: productId }, 
    })
    res.status(200).send(oneReview)
  }
  catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  addReview,
  getAllreview,
  getOnereview
}