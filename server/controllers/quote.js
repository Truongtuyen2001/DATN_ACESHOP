const { Quote } = require("../models/quote.js");

exports.IdByQuote = (req, res, next, id) => {
  Quote.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        status: false,
        error: "Error"
      })
    }
    req.data = data;
    next();
  })
}

exports.createQuote = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      status: false,
      message: "Bạn cần nhập tên giá liên hệ !!",
    });
  }
  try {
    const newQuote = Quote.findOne({ name });
    newQuote.save((err, data) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: "Không thể thêm báo giá",
        });
      }
      res.status(200).json({
        success: true,
        message: "Thêm thành công báo giá",
        data,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.listQuote = (req, res) => {
  Quote.find((err, data) => {
    if (err || data) {
      return res.status(400).json({
        status: false,
        error: "Không thể lấy danh sách báo giá !!"
      })
    }
    return res.status(200).json({
      status: true,
      message: "Lấy danh sách báo giá thành công",
      data
    })
  })
}

exports.detailQuote = (req, res) => {
  return res.json(req.quote);
}

exports.updateQuote = (req, res) => {
    let quote = req.quote;
    quote = _.assignIn(quote, req.body);

    quote.save((err, data) => {
      if(err) {
        return res.status(401).json({
          status: flase,
          error : "Không update được quote"
        })
      }
      return res.status(200).json({
        status: true,
        message : "Cập nhật quote thành công!!",
        data
      })
    })
}

exports.removeQuote = (req, res) => {
    let quote = req.quote;
    quote.remove((err, quote) => {
       if(err || !quote) {
         return res.status(400).json({
           status :true, 
           error : "Không thể xoá quote"
         })
       }
       return res.status(200).json({
         status: true,
         message : "Xoá thành công quote",
         quote
       })
    })
}
