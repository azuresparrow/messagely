const { SECRET_KEY } = require("../config");
const { Router } = require("express");

const User = require("../models/user");
const Message = require("../models/message");
const ExpressError = require("../expressError");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
 router.get("/:id", ensureCorrectUser, async function (req, res, next){
    try{
        const { id } = req.params;
        const message = await Message.get(id);
        return res.json({message});
    } catch(err){
        return next(err);
    }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
 router.post("/", ensureCorrectUser, async function (req, res, next){
    try{
        const { id } = req.params;
        const message = await Message.create(req.body);
        return res.json({message});
    } catch(err){
        return next(err);
    }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 module.exports = router;