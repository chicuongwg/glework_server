const SwitchModding = require("../models/switchModding.model");

// Create a new Switch Modding order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await SwitchModding.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all Switch Modding orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await SwitchModding.findAll();
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get a specific Switch Modding order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await SwitchModding.findByPk(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update a Switch Modding order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await SwitchModding.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or no changes made",
      });
    }

    const updatedOrder = await SwitchModding.findByPk(id);
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete a Switch Modding order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await SwitchModding.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
