import { isValidName, addUser, removeUser, getUsers, clearUsers } from './util';

describe('Utility functions', () => {
  afterEach(() => { clearUsers(); });

  describe('the isValidName function', () => {
    it('should not pass if input is empty', () => {
      expect(isValidName('')).toBe(false);
    });

    it('should not pass if special characters or spaces are in name', () => {
      expect(isValidName('Erik!')).toBe(false);
      expect(isValidName('erik hansson')).toBe(false);
    });

    it('should pass with valid input', () => {
      expect(isValidName('Erik')).toBe(true);
    });
  });

  describe('the clearUsers function', () => {
    it('should clear the users array', () => {
      addUser('erik');
      clearUsers();
      expect(getUsers()).toEqual([]);
    });
  })

  describe('the addUser function', () => {
    it('should add the passed in name to the users array', () => {
      addUser('erik');
      expect(getUsers()).toEqual(['erik']);
    });
    it('should transform all names to lower-case', () => {
      addUser('ErIkA');
      expect(getUsers()).toEqual(['erika']);
    });
  });

  describe('the getUsers function', () => {
    it('should return an empty array if there are no users', () => {
      expect(getUsers()).toEqual([]);
    });

    it('should return a list of all active users', () => {
      const nicknames = ['erik', 'adam', 'daniel', 'josephine'];
      nicknames.forEach((el) => addUser(el));
      expect(getUsers()).toEqual(nicknames);
    });
  });

  describe('the removeUsers function', () => {
    it('should remove a user matching the passed in name', () => {
      addUser('erik');
      addUser('johanna');
      removeUser('erik');
      expect(getUsers()).toEqual(['johanna']);
    });

    it('should be case insensitive', () => {
      addUser('erik');
      addUser('johanna');
      removeUser('JohAnnA');
    })
  })

});