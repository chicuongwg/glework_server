const Order = require("../models/order.model");
const User = require("../models/user.model");
const Service = require("../models/service.model");

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: User,
            attributes: ["firstName", "lastName"],
          },
          {
            model: Service,
            attributes: ["id", "name"],
          },
        ],
      });
  
      console.log('Orders:', orders);
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({ error: error.message });
    }
  };
// Lấy danh sách đơn hàng theo userId
exports.getAllOrdersWithUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          attributes: ["address"],
        },
        {
          model: Service,
          attributes: ["name"],
        },
      ],
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết một đơn hàng
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching order with ID:', id); // Log the ID being fetched

    const order = await Order.findOne({
      where: { orderId: id },
      include: [
        {
          model: User,
          attributes: ["address"],
        },
        {
          model: Service,
          attributes: ["name", "description"],
        },
      ],
    });

    console.log('Order fetched:', order); // Log the fetched order

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { userId, serviceId, totalCost, status, paymentStatus, address, telephone } = req.body;

    // Kiểm tra xem các trường bắt buộc có hợp lệ không
    if (!userId || !serviceId || !totalCost || !address || !telephone) {
      return res.status(400).json({ message: "Missing required fields", missingFields: ["userId", "serviceId", "totalCost", "address", "telephone"] });
    }

    // Kiểm tra các trường có giá trị hợp lệ nếu cần
    if (typeof totalCost !== 'number' || totalCost <= 0) {
      return res.status(400).json({ message: "Total cost must be a positive number" });
    }

    // Nếu không có status và paymentStatus, gán mặc định
    const orderStatus = status || 'Pending'; // Gán "Pending" mặc định
    const orderPaymentStatus = paymentStatus || 'Pending'; // Gán "Pending" mặc định

    // Kiểm tra điện thoại có đúng định dạng hay không (Ví dụ: Định dạng Việt Nam)
    const phoneRegex = /^(\+84|0)[3|5|7|8|9]\d{8}$/; // Kiểm tra điện thoại Việt Nam
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({ message: "Invalid telephone format" });
    }

    // Tạo đơn hàng mới
    const newOrder = await Order.create({
      userId,
      serviceId,
      totalCost,
      status: orderStatus,
      paymentStatus: orderPaymentStatus,
      address,
      telephone,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error); // Log lỗi chi tiết để dễ debug
    // Kiểm tra loại lỗi và trả về thông báo phù hợp
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: "Order with this data already exists" });
    }
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};



// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Order.destroy({ where: { orderId: id } });
    if (result === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Cập nhật trạng thái đơn hàng và trạng thái thanh toán theo ID
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const { status, paymentStatus } = req.body; // Lấy trạng thái mới từ body

  try {
    // Kiểm tra xem trạng thái có hợp lệ không
    const validOrderStatuses = ["Pending", "Finished", "Ongoing", "Paused", "Canceled"];
    const validPaymentStatuses = ["Pending", "Paid", "Canceled"];

    let updatedFields = {};
    if (status && validOrderStatuses.includes(status)) {
      updatedFields.status = status; // Cập nhật trạng thái đơn hàng
    }
    if (paymentStatus && validPaymentStatuses.includes(paymentStatus)) {
      updatedFields.paymentStatus = paymentStatus; // Cập nhật trạng thái thanh toán
    }

    const order = await Order.findOne({ where: { orderId: id } }); // Tìm đơn hàng theo ID
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Cập nhật các trường
    await order.update(updatedFields); // Cập nhật các trường đã thay đổi

    res.status(200).json(order); // Trả về đơn hàng đã cập nhật
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
};
