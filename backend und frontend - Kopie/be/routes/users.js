/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: string
 *           enum: [Administrator, Standard, Guest, 1, 2, 3]
 *           description: The role of the user
 *         created:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *       example:
 *           username: "Manuel"
 *           password: "test123"
 *           email: "manuel.richardt@ai.hs-fulda.de"
 *           role: "Standard"
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id or create new user if not exists
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of the new users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /users/byName:
 *   get:
 *     summary: Get the user by name
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     responses:
 *       200:
 *         description: The user response by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

var express = require('express');
var router = express.Router();

let userController = require('../controllers/usersController')

router.route("/")
.get((req,res,next)=> {
  let response = userController.getAllUsers();
  res.status(response.status).json(response.data);
})
.post((req,res,next)=> {
  let response = userController.createUser(req.body);
  res.status(response.status).json(response.data);
})

router.get('/byName', (req, res) => {
  let response = userController.filterByName(req.query.username);
  res.status(response.status).json(response.data);
});

router.route("/:id")
.get((req,res,next)=> {
  let response = userController.readUser(req.params.id);
  res.status(response.status).json(response.data);
})
.put((req,res,next)=> {
  let response = userController.updateUser(req.params.id, req.body);
  res.status(response.status).json(response.data);
})
.delete((req,res,next)=> {
  let response = userController.deleteUser(req.params.id);
  res.status(response.status).json(response.data);
})

module.exports = router;
