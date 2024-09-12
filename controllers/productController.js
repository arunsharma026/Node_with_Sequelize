const { where } = require("sequelize")
const db = require("../models")

// create main model 

const Product = db.products
const Review = db.reviews


// main work

// 1. create product

const addProduct = async (req, res) => {
    try {

        let info = {
            title: req.body.title != undefined ? req.body.title : "",
            price: req.body.price != undefined ? req.body.price : "",
            description: req.body.description != undefined ? req.body.description : "",
            published: req.body.published !== undefined || req.body.published != null ? req.body.published : false,
        };

        // Log the product info being sent to the database
        console.log("Product info:", info);

        // Create a new product in the database
        const product = await db.products.create(info);

        // Send the created product as the response
        res.status(201).json(product); // 201 Created is more appropriate for creation

        // Log the created product for debugging
        console.log("Created product:", product);
    } catch (error) {
        // Log and send error response
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. get all products

const getAllproducts = async (req, res) => {
    try {
        // Fetch all products with specified attributes
        let products = await Product.findAll({
            attributes: [
                'title',
                'price',
                'description',
            ]
        });

        // Respond with the products data
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// 3. get single product 

const getOneProduct = async (req, res) => {
    let productId = req.params.productId;
    try {
        let product = await Product.findOne({
            where: { id: productId },
            include: [{
                model: Review,
                as: 'reviews12',
                attributes: ['rating', 'description', 'productId', 'createdAt', 'updatedAt'],
                where: { productId: productId }
            }]
        });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// 4. Update products

const updateProduct = async (req, res) => {

    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id } })
    res.status(200).send(product)
}

// 5. DeleteProduct

const deleteProducts = async (req, res) => {
    try {
        const id = req.params.id;

        // Ensure ID is provided
        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Perform the delete operation
        const deleted = await Product.destroy({
            where: { id: id }
        });

        // Check if the product was found and deleted
        if (deleted === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // Log and send error response
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// 6. get published products

const getPublishedProducts = async (req, res) => {
    try {
        // Fetch all published products
        const products = await Product.findAll({
            where: { published: true }
        });

        // If no products found, return an empty array
        if (products.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'No published products found',
            });
        }

        // Respond with the list of published products

        res.status(200).json({
            code: 200,
            message: 'Published products retrieved successfully',
            data: products
        });

    } catch (error) {
        // Log and send error response
        console.error('Error fetching published products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    addProduct,
    getAllproducts,
    getOneProduct,
    updateProduct,
    deleteProducts,
    getPublishedProducts
}