"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.logToFile = exports.clearUsers = exports.addUser = exports.getUsers = exports.removeUser = exports.isValidName = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var users = [];
exports.isValidName = function (name) { return !/[^A-Öa-ö]/.test(name) && name.length > 0; };
exports.removeUser = function (name) {
    users = users.filter(function (el) { return el !== name.toLowerCase(); });
};
exports.getUsers = function () { return users; };
exports.addUser = function (name) { users = __spreadArrays(users, [name.toLowerCase()]); };
exports.clearUsers = function () { users = []; };
exports.logToFile = function (message, fileName) {
    fs_1["default"].appendFile(path_1["default"].join(__dirname, '../', 'logs', fileName), message + " - [" + new Date() + "]\n", function (err) {
        if (err)
            throw err;
    });
    fs_1["default"].appendFile(path_1["default"].join(__dirname, '../', 'logs', 'combined.log'), message + " - [" + new Date() + "]\n", function (err) {
        if (err)
            throw err;
    });
};
