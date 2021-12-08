const Service = require("../models/service.js");

exports.serviceId = (req, res, next, id) => {
  Service.findById(id, (err, service) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "không tìm thấy dịch vụ nào",
      });
    }

    req.service = service;
    next();
  });
};

exports.create = async (req, res) => {
  const { name, parent_id } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  try {
    const nameUnique = await Service.findOne({ name });

    if (nameUnique) {
      return res.status(401).json({
        success: false,
        message: "Tên dịch vụ không được trùng nhau",
      });
    }

    const newService = new Service({
      name,
      parent_id: parent_id || null,
    });

    newService.save((err, service) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Không thêm được dịch vụ",
        });
      }

      res.status(200).json({
        success: true,
        message: "Thêm dịch vụ thành công",
        service,
      });
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.listByParentId = async (req, res) => {
  const parent = req.query.parent;

  if (parent) {
    try {
      const listServiceByParent = await Service.find({ parent_id: parent });

      if (!listServiceByParent) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy dịch vụ nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh sách danh mục thành công",
        listServiceByParent,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  } else {
    try {
      const listServiceParent = await Service.find({ parent_id: null });

      if (!listServiceParent) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy dịch vụ nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh sách dịch vụ thành công",
        listServiceParent,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }
};

exports.update = async (req, res) => {
  const { name, parent_id } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  try {
    let updatedService = {
      name,
      parent_id: parent_id || null,
    };

    const serviceUpdateCondition = { _id: req.params.id };

    updatedService = await Service.findOneAndUpdate(
      serviceUpdateCondition,
      updatedService,
      { new: true }
    );

    if (!updatedService) {
      return res.status(401).json({
        success: false,
        message: "Update dịch vụ không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update dịch vụ thành công",
      updatedService,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.detail = (req, res) => {
  const params = req.params.id;

  Service.findOne({ _id: params }).exec((err, detailService) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy dịch vụ nào",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chỉ tiết dịch vụ thành công",
      detailService,
    });
  });
};

exports.remove = async (req, res) => {
  const service = req.service;

  service.remove((err, service) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Xóa dịch vụ không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa dịch vụ thành công",
      service,
    });
  });
};
