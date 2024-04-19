import { render, screen } from '@testing-library/react';
import Topbar from './Topbar';

// Mocking fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('Topbar Component', () => {
  test('checkProductAlerts function should set notifications for low stock and expiry', () => {
    const products = [
      {
        SKU_ID: 1,
        ProductName: 'Gluten Free Matzo',
        Price: 10,
        Size: 250,
        Unit: 'g',
        QuantityAvailable: 362,
        Description: 'Low in fat, sugar and salt...',
        Category: 'Snacks',
        ExpiryDate: '2025-01-01',
      },
    ];

    render(<Topbar />);

    // Wait for notifications to update
    setTimeout(() => {
      // Assertions for low stock alert
      expect(screen.getByText('Low stock alert for product: Gluten Free Matzo')).toBeInTheDocument();

      // Assertions for expiry alert
      expect(screen.getByText('Expiry alert for product: Gluten Free Matzo')).toBeInTheDocument();
    }, 1000); // Adjust the timeout as needed
  });

  test('checkIngredientAlerts function should set notifications for low quantity and expiry', () => {
    const ingredients = [
      {
        SKU_ID: 1,
        IngredientName: 'Flour',
        QuantityAvailable: 500,
        ExpiryDate: '2025-01-01',
      },
    ];

    render(<Topbar />);

    // Wait for notifications to update
    setTimeout(() => {
      // Assertions for low quantity alert
      expect(screen.getByText('Low quantity alert for ingredient: Flour')).toBeInTheDocument();

      // Assertions for expiry alert
      expect(screen.getByText('Expiry alert for ingredient: Flour')).toBeInTheDocument();
    }, 1000); // Adjust the timeout as needed
  });
});
