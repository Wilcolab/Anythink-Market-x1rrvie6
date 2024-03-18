/**
 * Express router for handling comments.
 * @module routes/api/comments
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET /api/comments
 * Get all comments.
 * @name GetComments
 * @route {GET} /api/comments
 */
router.get("/", (req, res, next) => {
    Comment.find()
        .then((comments) => {
            return res.json({ comments: comments.map((comment) => comment.toJSON()) });
        })
        .catch(next);
});

/**
 * DELETE /api/comments/:id
 * Delete a comment by ID.
 * @name DeleteComment
 * @route {DELETE} /api/comments/:id
 * @param {string} req.params.id - The ID of the comment to delete.
 */
router.delete("/:id", async (req, res, next) => {
    try {
        await Comment.findByIdAndRemove(req.params.id);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});