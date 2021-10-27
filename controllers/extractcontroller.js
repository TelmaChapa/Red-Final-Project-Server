const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Extract } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

// POST CREATE EXTRACT
router.post("/", validateSession, (req, res) => {
    const { beantype, beanamount, alcoholtype, proof, alcoholamount, container, startdate, enddate, overallresult } = req.body;

    Extract.create({
        beantype,
        beanamount,
        alcoholtype,
        proof,
        alcoholamount,
        container,
        startdate,
        enddate,
        overallresult,
        userId: req.user.id
    })
        .then(extract => res.status(200).json(extract))
        .catch(err => res.status(500).json(
            { error: err }))
});

//GET EXTRACT 
router.get('/all', validateSession, (req, res) => {
    let userid = req.user.id
    Extract.findAll({
        where: { userId: userid }
    })
        .then((extracts) => res.status(200).json(extracts))
        .catch(err => res.status(500).json({ error: err }))
});

//UPDATE EXTRACT BY ID
router.put("/update/:id", validateSession, (req, res) => {
    const updateExtract = {
        beantype: req.body.
            beantype,
        beanamount: req.body.
            beanamount,
        alcoholtype: req.body.
            alcoholtype,
        proof: req.body.
            proof,
        alcoholamount: req.body.
            alcoholamount,
        container: req.body.
            container,
        startdate: req.body.
            startdate,
        enddate: req.body.
            enddate,
        overallresult: req.body.
            overallresult
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Extract.update(updateExtract, query)
        .then((extracts) => res.status(200).json(extracts))
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE EXTRACT BY ID
router.delete("/delete/:id", validateSession,
    (req, res) => {
        const query = { where: { id: req.params.id, userId: req.user.id } };
        Extract.destroy(query)
            .then(() => res.status(200).json({ message: "Extract Entry Deleted" }))
            .catch((err) => res.status(500).json({ error: err }))
    });




module.exports = router;