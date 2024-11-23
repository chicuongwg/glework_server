const Order = require("../models/order.model");
const User = require("../models/user.model");
const Service = require("../models/service.model");

// Lấy danh sách đơn hàng theo userId
exports.getAllOrders = async (req, res) => {
  const { userId } = req.query; // Lấy userId từ query string

  try {
    const orders = await Order.findAll({
      where: { userId: userId }, // Lọc theo userId
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
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { userId, serviceId, totalCost, status, paymentStatus } = req.body;
    const newOrder = await Order.create({
      userId,
      serviceId,
      totalCost,
      status,
      paymentStatus,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
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
