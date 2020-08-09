import fs from 'fs';
import path from 'path';

let users: Array<string> = [];

export const isValidName = (name: string): boolean => !/[^A-Öa-ö]/.test(name) && name.length > 0;

export const removeUser = (name: string): void => {
  users = users.filter((el) => el !== name.toLowerCase());
};
export const getUsers = (): Array<string> => users;
export const addUser = (name: string): void => { users = [...users, name.toLowerCase()]; };
export const clearUsers = (): void => { users = []; };

export const logToFile = (message: string, fileName: string): void => {
  fs.appendFile(path.join(__dirname, '../', 'logs', fileName), `${message} - [${new Date()}]\n`, (err) => {
    if (err) throw err;
  });
  fs.appendFile(path.join(__dirname, '../', 'logs', 'combined.log'), `${message} - [${new Date()}]\n`, (err) => {
    if (err) throw err;
  });
};
