const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: "Please authenticate." });
	}
};

const authorize = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ error: "Access denied." });
	}
	next();
};

module.exports = { authenticate, authorize };
