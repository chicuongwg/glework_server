const OrderDetail = require("../models/orderDetail.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

// Lấy danh sách chi tiết đơn hàng theo orderId
exports.getOrderDetailsByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderDetails = await OrderDetail.findAll({
      where: { orderId },
      include: [
        {
          model: Order,
          attributes: ['telephone', 'address', 'createdAt', 'totalCost', 'status', 'paymentStatus'],
          include: [
            {
              model: User,
              attributes: ['firstName', 'lastName', 'email'],
            },
          ],
        },
      ],
    });

    if (orderDetails.length === 0) {
      return res.status(404).json({ message: 'No order details found for this order' });
    }

    res.json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};

// Tạo chi tiết đơn hàng mới
exports.createOrderDetail = async (req, res) => {
  try {
    const { orderId, fieldName, fieldValue } = req.body;

    // Kiểm tra xem orderId có hợp lệ không
    if (!orderId || !fieldName) {
      return res.status(400).json({ error: "orderId and fieldName are required." });
    }

    const newOrderDetail = await OrderDetail.create({ orderId, fieldName, fieldValue });
    res.status(201).json(newOrderDetail);
  } catch (error) {
    console.error('Error creating order detail:', error); // Log lỗi
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật chi tiết đơn hàng
exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const { fieldName, fieldValue } = req.body;

  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }

    orderDetail.fieldName = fieldName;
    orderDetail.fieldValue = fieldValue;
    await orderDetail.save();

    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa chi tiết đơn hàng
exports.deleteOrderDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }

    await orderDetail.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
