const {
  validationResult,
} = require(
  "express-validator"
);

const asyncHandler =
  require("../utils/asyncHandler");

const ApiError =
  require("../utils/ApiError");

const adminService =
  require("../services/school.service");

exports.createSchool =
  asyncHandler(
    async (req, res) => {
      const errors =
        validationResult(
          req
        );

      if (!errors.isEmpty()) {
        throw new ApiError(
          400,
          errors.array()[0]
            .msg
        );
      }

      const school =
        await adminService.createSchool(
          req.body
        );

      return res
        .status(201)
        .json({
          success: true,
          data: school,
        });
    }
  );

exports.getSchools =
  asyncHandler(
    async (req, res) => {
      const schools =
        await adminService.getSchools();

      return res
        .status(200)
        .json({
          success: true,
          data: schools,
        });
    }
  );

exports.getSchoolById =
  asyncHandler(
    async (req, res) => {
      const school =
        await adminService.getSchoolById(
          req.params.id
        );

      return res
        .status(200)
        .json({
          success: true,
          data: school,
        });
    }
  );

exports.updateSchool =
  asyncHandler(
    async (req, res) => {
      const school =
        await adminService.updateSchool(
          req.params.id,
          req.body
        );

      return res
        .status(200)
        .json({
          success: true,
          data: school,
        });
    }
  );

exports.deleteSchool =
  asyncHandler(
    async (req, res) => {
      await adminService.deleteSchool(
        req.params.id
      );

      return res
        .status(200)
        .json({
          success: true,
          message:
            "School deleted successfully",
        });
    }
  );

exports.toggleSchoolStatus =
  asyncHandler(
    async (req, res) => {
      const school =
        await adminService.toggleSchoolStatus(
          req.params.id
        );

      return res
        .status(200)
        .json({
          success: true,
          data: school,
        });
    }
  );

exports.getUsers =
  asyncHandler(
    async (req, res) => {
      const {
        page,
        limit,
        search,
      } = req.query;

      const users =
        await adminService.getUsers(
          Number(page) || 1,
          Number(limit) || 10,
          search || ""
        );

      return res
        .status(200)
        .json({
          success: true,
          data: users,
        });
    }
  );

exports.suspendUser =
  asyncHandler(
    async (req, res) => {
      const user =
        await adminService.suspendUser(
          req.params.id
        );

      return res
        .status(200)
        .json({
          success: true,
          data: user,
        });
    }
  );

exports.unsuspendUser =
  asyncHandler(
    async (req, res) => {
      const user =
        await adminService.unsuspendUser(
          req.params.id
        );

      return res
        .status(200)
        .json({
          success: true,
          data: user,
        });
    }
  );

exports.dashboardAnalytics =
  asyncHandler(
    async (req, res) => {
      const analytics =
        await adminService.dashboardAnalytics();

      return res
        .status(200)
        .json({
          success: true,
          data: analytics,
        });
    }
  );