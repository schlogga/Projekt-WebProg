/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - articlenumber
 *         - title
 *         - description
 *         - count
 *         - userid
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the equipment
 *         articlenumber:
 *           type: integer
 *           description: The article number of the equipment
 *         title:
 *           type: string
 *           description: The title of the equipment
 *         description:
 *           type: string
 *           description: The description of the equipment
 *         pic:
 *          type: file
 *          description: The picture of the equipment
 *         count:
 *           type: integer
 *           description: The amount of the equipment
 *         userid:
 *           type: integer
 *           description: The id of the user who owns the equipment
 *       example:
 *             articlenumber: 1235
 *             title: "Screwdriver"
 *             pic: "/uploads/test.png"
 *             description: "A screwdriver is a tool, manual or powered, used for screwing (installing) and unscrewing (removing) screws."
 *             count: 5
 *             userid: 2
 */

/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: The equipment managing API
 * /equipment:
 *   get:
 *     summary: Lists all the equipments
 *     tags: [Equipment]
 *     responses:
 *       200:
 *         description: The list of the equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *   post:
 *     summary: Create a new equipment
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: The created equipment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       500:
 *         description: Some server error
 * /equipment/{id}:
 *   get:
 *     summary: Get the equipment by id
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The equipment id
 *     responses:
 *       200:
 *         description: The equipment response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: The equipment was not found
 *   put:
 *    summary: Update the equipment by the id or create new equipment if not exists
 *    tags: [Equipment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The equipment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Equipment'
 *    responses:
 *      200:
 *        description: The equipment was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Equipment'
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the equipment by id
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The equipment id
 *     responses:
 *       200:
 *         description: The list of the equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 */

var express = require('express');
var router = express.Router();

let equipmentController = require('../controllers/equipmentController')

router.route("/")
  .get((req, res, next) => {
    let response = equipmentController.getAllEquipments();
    res.status(response.status).json(response.data);
  })
  .post((req, res, next) => {
    let response = equipmentController.createEquipment(req);
    res.status(response.status).json(response.data);
  })

router.route("/:id")
  .get((req, res, next) => {
    let response = equipmentController.readEquipment(req.params.id, req.body);
    res.status(response.status).json(response.data);
  })
  .put((req, res, next) => {
    /**
     * Update am 10.07.2024
     * By: Dominik Rupprecht
     * Grund: falsche Variable übergeben
     */
    let response = equipmentController.updateEquipment(req.params.id, req);
    res.status(response.status).json(response.data);
  })
  .delete((req, res, next) => {
    let response = equipmentController.deleteEquipment(req.params.id, req.body);
    res.status(response.status).json(response.data);
  })

module.exports = router;
