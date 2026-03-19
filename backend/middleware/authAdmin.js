import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
  
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization token missing" 
      });
    }

    // Remove 'Bearer ' prefix
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization token missing" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized as admin" 
      });
    }

    req.admin = decoded; // attach decoded payload
    // Middleware already verified token and attached admin info
  // console.log("Admin email:", req.admin.email); // safe to use

    next(); // continue to the route

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    });
  }
};

export default authAdmin;
