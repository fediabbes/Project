const { body, validationResult } = require('express-validator');


exports.RegisterValidation = [
    body('email', "Not a Valid Email").isEmail(),
    body("password", "Should be at least 6 Characters").isLength({ min: 6 })
]


exports.Validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}
