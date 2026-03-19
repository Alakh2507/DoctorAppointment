import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            console.error("token missing")
            return res.status(401).json({ success: false, message: "Token missing" })

        }

        if (!authHeader.startsWith("Bearer ")) {
            console.error("Invalid token format")
            return res.status(401).json({ success: false, message: "Invalid token format" })

        }

        const dtoken = authHeader.split(" ")[1]

        if (!dtoken) {
            console.error("Token invalid")
            return res.status(401).json({ success: false, message: "Token invalid" })

        }

        const decode = await jwt.verify(dtoken, process.env.JWT_SECRET)

        req.docId = decode.id;
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
}

export default authDoctor;