const router =
  require("express").Router();

const adminController =
  require("../controllers/school.controller");

const authMiddleware =
  require("../middlewares/auth.middleware");

const roleMiddleware =
  require("../middlewares/role.middleware");

const roles =
  require("../constants/roles");

const {
  createSchoolValidator,
  updateSchoolValidator,
} = require(
  "../validators/school.validator"
);

/*
ALL ROUTES REQUIRE ADMIN
*/

router.use(
  authMiddleware
);

router.use(
  roleMiddleware(
    roles.ADMIN
  )
);

/*
SCHOOL ROUTES
*/

/**
 * @swagger
 * /admin/schools:
 *   post:
 *     summary: Create a new school
 *     description: Creates a new school with its allowed email domain.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - domain
 *             properties:
 *               name:
 *                 type: string
 *                 example: University of Lagos
 *               domain:
 *                 type: string
 *                 example: unilag.edu.ng
 *               logo:
 *                 type: string
 *                 example: https://example.com/logo.png
 *     responses:
 *       201:
 *         description: School created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

router.post(
  "/schools",
  createSchoolValidator,
  adminController.createSchool
);

/**
 * @swagger
 * /admin/schools:
 *   get:
 *     summary: Get all schools
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of schools
 */

router.get(
  "/schools",
  adminController.getSchools
);

/**
 * @swagger
 * /admin/schools/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: School retrieved successfully
 *       404:
 *         description: School not found
 */

router.get(
  "/schools/:id",
  adminController.getSchoolById
);

/**
 * @swagger
 * /admin/schools/{id}:
 *   patch:
 *     summary: Update school
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               domain:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       200:
 *         description: School updated successfully
 *       404:
 *         description: School not found
 */

router.patch(
  "/schools/:id",
  updateSchoolValidator,
  adminController.updateSchool
);

/**
 * @swagger
 * /admin/schools/{id}:
 *   delete:
 *     summary: Delete school
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 */

router.delete(
  "/schools/:id",
  adminController.deleteSchool
);

/**
 * @swagger
 * /admin/schools/{id}/toggle-status:
 *   patch:
 *     summary: Enable or disable a school
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: School status updated successfully
 *       404:
 *         description: School not found
 */

router.patch(
  "/schools/:id/toggle-status",
  adminController.toggleSchoolStatus
);

/*
USER MANAGEMENT
*/

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a paginated list of registered users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */

router.get(
  "/users",
  adminController.getUsers
);

/**
 * @swagger
 * /admin/users/{id}/suspend:
 *   patch:
 *     summary: Suspend a user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User suspended successfully
 *       404:
 *         description: User not found
 */

router.patch(
  "/users/:id/suspend",
  adminController.suspendUser
);

/**
 * @swagger
 * /admin/users/{id}/unsuspend:
 *   patch:
 *     summary: Unsuspend a user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User unsuspended successfully
 *       404:
 *         description: User not found
 */

router.patch(
  "/users/:id/unsuspend",
  adminController.unsuspendUser
);

/*
ANALYTICS
*/

/**
 * @swagger
 * /admin/analytics:
 *   get:
 *     summary: Get dashboard analytics
 *     description: Returns marketplace statistics for the admin dashboard.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 1024
 *                 totalSchools:
 *                   type: integer
 *                   example: 15
 *                 activeListings:
 *                   type: integer
 *                   example: 238
 *                 soldListings:
 *                   type: integer
 *                   example: 521
 *                 verifiedUsers:
 *                   type: integer
 *                   example: 812
 *                 suspendedUsers:
 *                   type: integer
 *                   example: 7
 */

router.get(
  "/analytics",
  adminController.dashboardAnalytics
);

module.exports = router;