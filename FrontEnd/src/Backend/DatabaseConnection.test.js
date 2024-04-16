const {
    fetchUsers,
    fetchPurchaseOrders,
    fetchVendors,
    fetchProducts,
    fetchIngredients,
    closeMySQLConnection,
    connection
  } = require('./DatabaseConnection.js');
  
  // Mock MySQL connection and query functions
  jest.mock('mysql', () => ({
    createConnection: jest.fn(() => ({
      query: jest.fn(),
      end: jest.fn() // Add the end method to the mock implementation
    }))
  }));
  
  describe('Database Connection', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('fetchUsers should call query with correct SQL', () => {
      const callback = jest.fn();
      fetchUsers(callback);
      expect(connection.query).toHaveBeenCalledWith(
        'SELECT * FROM Users',
        expect.any(Function)
      );
    });
  
    it('closeMySQLConnection should call end', () => {
      closeMySQLConnection();
      expect(connection.end).toHaveBeenCalled();
    });
  });
  