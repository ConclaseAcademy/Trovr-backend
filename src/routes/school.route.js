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

router.post(
  "/schools",
  createSchoolValidator,
  adminController.createSchool
);

router.get(
  "/schools",
  adminController.getSchools
);

router.get(
  "/schools/:id",
  adminController.getSchoolById
);

router.patch(
  "/schools/:id",
  updateSchoolValidator,
  adminController.updateSchool
);

router.delete(
  "/schools/:id",
  adminController.deleteSchool
);

router.patch(
  "/schools/:id/toggle-status",
  adminController.toggleSchoolStatus
);

/*
USER MANAGEMENT
*/

router.get(
  "/users",
  adminController.getUsers
);

router.patch(
  "/users/:id/suspend",
  adminController.suspendUser
);

router.patch(
  "/users/:id/unsuspend",
  adminController.unsuspendUser
);

/*
ANALYTICS
*/

router.get(
  "/analytics",
  adminController.dashboardAnalytics
);

module.exports = router;