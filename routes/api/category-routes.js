const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [{
// be sure to include its associated Products
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error" })
  });
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [{
// be sure to include its associated Products
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error" })
  });
  
  
});

router.post('/', (req, res) => {
  // create a new category expects "category name"
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ message: "There has been an error "});
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(categoryData => res.json({ message: "The category has been updated!" }))
  .catch(err => {
    res.status(404).json({ message: "No category found with this ID " });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id "});
      return;
    }
    res.json({ message: "The category has been deleted!" });
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  })
});

module.exports = router;
