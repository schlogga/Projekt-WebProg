/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - userid
 *         - equipmentids
 *         - start
 *         - end
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the borrow
 *         userid:
 *           type: integer
 *           description: Id of the user who borrowed the equipment
 *         equipmentids:
 *           type: integer array
 *           description: Ids of the equipment that was borrowed
 *         start:
 *           type: date
 *           format: date
 *           description: The date the borrow started
 *         end:
 *           type: date
 *           format: date
 *           description: The date the borrow ended
 *       example:
 *         userid: 2
 *         equipmentids: [1]
 *         start: "2024-06-01"
 *         end: "2024-07-01"
 */

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: The borrow managing API
 * /borrows:
 *   get:
 *     summary: Lists all the borrows
 *     tags: [Borrow]
 *     responses:
 *       200:
 *         description: The list of the borrows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
 *   post:
 *     summary: Create a new borrow
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Borrow'
 *     responses:
 *       201:
 *         description: The created borrow.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       500:
 *         description: Some server error
 * /borrows/{id}:
 *   get:
 *     summary: Get the borrow by id
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The borrow id
 *     responses:
 *       200:
 *         description: The borrow response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       404:
 *         description: The borrow was not found
 *   put:
 *    summary: Update the borrow by the id or create new borrow if not exists
 *    tags: [Borrow]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The borrow id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Borrow'
 *    responses:
 *      200:
 *        description: The borrow was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Borrow'
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the borrow by id
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The borrow id
 *     responses:
 *       200:
 *         description: The list of the new borrows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
 */

var express = require('express');
var router = express.Router();

let borrowController = require('../controllers/borrowController')

router.route("/")
.get((req,res,next)=> {
  let response = borrowController.getAllBorrows();
  res.status(response.status).json(response.data);
})
.post((req,res,next)=> {
  let response = borrowController.createBorrow(req.body);
  res.status(response.status).json(response.data);
})

router.route("/:id")
.get((req,res,next)=> {
  let response = borrowController.readBorrow(req.params.id, req.body);
  res.status(response.status).json(response.data);
})
.put((req,res,next)=> {
  let response = borrowController.updateBorrow(req.params.id, req.body);
  res.status(response.status).json(response.data);
})
.delete((req,res,next)=> {
  let response = borrowController.deleteBorrow(req.params.id, req.body);
  res.status(response.status).json(response.data);
})

module.exports = router;
