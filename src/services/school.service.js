const { Op } =
  require("sequelize");

const {
  School,
  User,
} = require("../models");

const ApiError =
  require("../utils/ApiError");

exports.createSchool =
  async (payload) => {
    const existingSchool =
      await School.findOne({
        where: {
          [Op.or]: [
            {
              name:
                payload.name,
            },
            {
              domain:
                payload.domain,
            },
          ],
        },
      });

    if (existingSchool) {
      throw new ApiError(
        400,
        "School already exists"
      );
    }

    const school =
      await School.create(
        payload
      );

    return school;
  };

exports.getSchools =
  async () => {
    return await School.findAll({
      order: [
        ["createdAt", "DESC"],
      ],
    });
  };

exports.getSchoolById =
  async (id) => {
    const school =
      await School.findByPk(id);

    if (!school) {
      throw new ApiError(
        404,
        "School not found"
      );
    }

    return school;
  };

exports.updateSchool =
  async (id, payload) => {
    const school =
      await School.findByPk(id);

    if (!school) {
      throw new ApiError(
        404,
        "School not found"
      );
    }

    await school.update(payload);

    return school;
  };

exports.deleteSchool =
  async (id) => {
    const school =
      await School.findByPk(id);

    if (!school) {
      throw new ApiError(
        404,
        "School not found"
      );
    }

    await school.destroy();

    return true;
  };

exports.toggleSchoolStatus =
  async (id) => {
    const school =
      await School.findByPk(id);

    if (!school) {
      throw new ApiError(
        404,
        "School not found"
      );
    }

    school.isActive =
      !school.isActive;

    await school.save();

    return school;
  };

exports.getUsers =
  async (
    page = 1,
    limit = 10,
    search = ""
  ) => {
    const offset =
      (page - 1) * limit;

    const result =
      await User.findAndCountAll(
        {
          where: {
            [Op.or]: [
              {
                fullName: {
                  [Op.iLike]:
                    `%${search}%`,
                },
              },
              {
                email: {
                  [Op.iLike]:
                    `%${search}%`,
                },
              },
            ],
          },

          include: [
            {
              model: School,
            },
          ],

          limit,

          offset,

          order: [
            [
              "createdAt",
              "DESC",
            ],
          ],
        }
      );

    return {
      total:
        result.count,

      page,

      limit,

      users: result.rows,
    };
  };

exports.suspendUser =
  async (userId) => {
    const user =
      await User.findByPk(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    user.isSuspended =
      true;

    await user.save();

    return user;
  };

exports.unsuspendUser =
  async (userId) => {
    const user =
      await User.findByPk(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    user.isSuspended =
      false;

    await user.save();

    return user;
  };

exports.dashboardAnalytics =
  async () => {
    const totalUsers =
      await User.count();

    const totalSchools =
      await School.count();

    const verifiedUsers =
      await User.count({
        where: {
          isVerified: true,
        },
      });

    const suspendedUsers =
      await User.count({
        where: {
          isSuspended: true,
        },
      });

    return {
      totalUsers,
      totalSchools,
      verifiedUsers,
      suspendedUsers,
    };
  };




//   This file provides Admin/School Management functionality:

// Schools
//  ├── Create
//  ├── Read
//  ├── Update
//  ├── Delete
//  └── Activate/Deactivate

// Users
//  ├── List
//  ├── Search
//  ├── Pagination
//  ├── Suspend
//  └── Unsuspend

// Dashboard
//  ├── Total Users
//  ├── Total Schools
//  ├── Verified Users
//  └── Suspended Users

// In backend architecture terms, this is a service layer that contains the business rules, while controllers simply call these methods and return responses.