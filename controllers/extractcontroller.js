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
        overallresult
    })
        .then(extract => res.status(200).json(extract))
        .catch(err => res.status(500).json(
            { error: err }))
});

//GET EXTRACT 
router.get('/all', validateSession, (req, res) => {
    let userid = req.user.id
    Extract.findAll({
        where: { user_id: userid }
    })
        .then(extracts => res.status(200).json(extracts))
        .catch(err => res.status(500).json(
            { error: err }))
});

//UPDATE EXTRACT BY ID
router.update("/:id", validateSession, (req, res) {
    const updateExtract = {
        beantype: req.body.log.
            beantype,
        beanamount: req.body.log.
            beanamount,
        alcoholtype: req.body.log.
            alcoholtype,
        proof: req.body.log.
            proof,
        alcoholamount: req.body.log.
            alcoholamount,
        container: req.body.log.
            container,
        startdate: req.body.log.
            startdate,
        enddate: req.body.log.
            enddate,
        overallresult: req.body.log.
            overallresult
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Extract.update(updateExtractEntry, query)
        .then((extracts) => res.status(200).json(extracts))
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE EXTRACT BY ID
router.delete("/:id", validateSession,
    (req, res) => {
        const query = { where: { id: req.user.id } };
        Extract.destroy(query)
            .then(() => res.status(200).json({ message: "Extract Entry Deleted" }))
            .catch((err) => res.status(500).json({ error: err }))
    });




module.exports = router;