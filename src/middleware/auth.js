import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers['api_key'];
        const uid = req.headers['uid']
        if (!token && !uid) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        let payload
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "Unauthorized" });
                } else {
                    payload = decoded;
                }
            });
        }
        next();

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
export { auth }