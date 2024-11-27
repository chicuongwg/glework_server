const express = require("express");
const { getServiceOptionsByServiceId } = require("../controllers/serviceOption.controller");

const router = express.Router();

/**
 * @swagger
 * /service-options/{id}:
 *   get:
 *     tags:
 *       - ServiceOption
 *     summary: Retrieve a list of options by serviceId
 *     description: Returns a list of options for a specific service based on `serviceId`.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the service to retrieve options for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of options for the service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       optionName:
 *                         type: string
 *                       price:
 *                         type: number
 *                       isMultiple:
 *                         type: boolean
 *                       optionGroup:
 *                         type: string
 *       404:
 *         description: Service not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/:id", getServiceOptionsByServiceId);

module.exports = router;
