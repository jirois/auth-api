const checkRole = (requireRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requireRole) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

export default checkRole;
