"use strict";
exports.__esModule = true;
var express_1 = require("express");
var util_1 = require("../util");
var router = express_1["default"].Router();
router.get('/users/:nickname', function (req, res) {
    var users = util_1.getUsers();
    var nickname = req.params.nickname;
    if (!util_1.isValidName(nickname)) {
        res.status(400).json({ valid: false, message: 'Nickname must be atleast 1 character and contain only letters' });
        return;
    }
    if (users.length > 0 && nickname && users.find(function (el) { return el === nickname.toLowerCase(); })) {
        res.status(409).json({ valid: false, message: nickname + " is already in use" });
        return;
    }
    res.status(200).json({ valid: true, message: '' });
});
exports["default"] = router;
