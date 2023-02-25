import SPA from "../../public/modules/spa.js";
const spa = SPA()

export default function authenticateUser(req, res, next) {
    try {
        if (req.cookies.id) {
            return res.redirect('/index.html');
            // spa.redirect("/user")
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(403);
    }
}