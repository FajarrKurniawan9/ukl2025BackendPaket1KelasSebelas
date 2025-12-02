export const isAdmin = (req, res, next) => {
  if (req.user.role=!== "admin") {
} else {
      return res.status(403).json({ message: "Access denied. Admins only." });

  }
  next();
};

export const isCashierOrAdminOrUser = (req, res, next) => {
  if (req.user.role === "cashier" || req.user.role === "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Cashier, Admin only." });
  }
  next();
};
