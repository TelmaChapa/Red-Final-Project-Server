const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Image } = require("../models");
const validateSession = require("../middleware/validate-session");


const router = Router();
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjM1Mjk1NjYxLCJleHAiOjE2MzUzODIwNjF9.V3bNO7faz0unEKolWMzOyu8YGPTpqnvbsJkazcJksMQ
//POST IMAGE
router.post("/create", validateSession, (req, res) => {
    const { imageupload, description } = req.body;
    const owner = req.user.id

    Image.create({
        imageupload,
        description,
        userId: owner

    })
        .then(image => res.status(200).json(image))
        .catch(err => res.status(500).json({ error: err }))
});

//GET IMAGE
router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Image.findAll({
        where: { userId: userid }
    })
        .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ALL IMAGES
router.get('/all', (req, res) => {
    Image.findAll({
    })
        .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json({ error: err }))
});

//UPDATE IMAGE BY ID
router.put("/update/:id", validateSession, (req, res) => {
    const updateImage = {
        imageupload: req.body.
            imageupload,
        description: req.body.
            description
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Image.update(updateImage, query)
        .then((images) => res.status(200).json(images))
        .catch((err) => res.status(500).json({ error: err }));
});


//DELETE IMAGE BY ID
router.delete("/delete/:id", validateSession, (req, res) => {
    let query;
    if (req.user.role == "admin") {
        query = { where: { id: req.params.id } };
    } else {
        query = { where: { id: req.params.id, userId: req.user.id } };
    }

    Image.destroy(query)
        .then(() => res.status(200).json({ message: "Image Entry Deleted" }))
        .catch((err) => res.status(500).json({ error: err }))
});

module.exports = router;