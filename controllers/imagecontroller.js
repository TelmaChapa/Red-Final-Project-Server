const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Extract } = require("../models");
const validateSession = require("../middleware/validate-session");
const { update } = require("../models/user");

const router = Router();

//POST IMAGE
router.post("/", validateSession, (req, res) => {
    const { imageupload, description } = req.body;

    Image.create({
        imageupload,
        description,
    })
        .then(image => res.status(200).json(image))
        .catch(err => res.status(500).json({ error: err }))
});

//GET IMAGE
router.get('/all', validateSession, (req, res) => {
    let userid = req.user.id
    Image.findAll({
        where: { user_id: userid }
    })
        .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ALL IMAGES
router.get('/all', validateSession, (req, res) => {
    Image.findAll({
    })
        .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json({ error: err }))
});

//UPDATE IMAGE BY ID
router.update("/:id", validateSession, (req, res) {
    const udateImage = {
        imageupload: req.body.log.
            imageupload,
        description: req.body.log.
            description
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Image.update(updateImageEntry, query)
        .then((images) => res.status(200).json(images))
        .catch((err) => res.status(500).json({ error: err }));
});


//DELETE IMAGE BY ID
router.delete("/:id", validateSession, (req, res) => {
    const query = { where: { id: req.user.id } };
    Image.destroy(query)
        .then(() => res.status(200).json({ message: "Image Entry Deleted" }))
        .catch((err) => res.status(500).json({ error: err }))
});

module.exports = router;