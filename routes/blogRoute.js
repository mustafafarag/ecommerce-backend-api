const express = require("express");
const router = express.Router();
const { createBlog, updateBlog ,getBlog , getAllBlogs, deleteBlog, likeBlog , dislikeBlog} = require("../controller/blogCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");


router.post("/", authmiddleware, isAdmin, createBlog);
router.put("/likes", authmiddleware,isAdmin, likeBlog);
router.put("/dislikes", authmiddleware,isAdmin, dislikeBlog);
router.put("/:id", authmiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authmiddleware, isAdmin, deleteBlog);



module.exports = router;