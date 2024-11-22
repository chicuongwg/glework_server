const Orders = require("../models/order.model");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user_id, service_type, total_cost, payment_status } = req.body;

    if (!service_type || !total_cost) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newOrder = await Orders.create({
      user_id,
      service_type,
      total_cost,
      payment_status,
    });

    res.status(201).json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
};

// Get all orders (for admin or user-specific)
const getOrders = async (req, res) => {
  try {
    const user_id = req.query.user_id; // Optional filter by user ID
    const filter = user_id ? { where: { user_id } } : {};

    const orders = await Orders.findAll(filter);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
