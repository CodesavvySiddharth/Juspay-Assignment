import React, { useContext } from 'react';
import { topSellingProducts } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

// Inter font style
const interFont = {
  fontFamily: 'Inter',
  fontWeight: 400
};

const ProductSalesTable = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="w-full h-full">
      <h3
        className="pl-4 mb-4 transition-colors duration-200"
        style={{
          color: darkMode ? '#F3F4F6' : '#111827',
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'Semi Bold',
          fontSize: '16px',
          leadingTrim: 'NONE',
          lineHeight: '20px',
          letterSpacing: '0%',
        }}
      >
        Top Selling Products
      </h3>

      <div className="w-full overflow-x-auto">
        <table
          className="w-full table-fixed"
          style={{ minWidth: isMobile ? 480 : 600 }}
        >
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '21.7%' }} />
            <col style={{ width: '21.7%' }} />
            <col style={{ width: '21.6%' }} />
          </colgroup>

          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${
                  darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(28, 28, 28, 0.2)'
                }`
              }}
            >
              <th
                className="pb-3 pl-4 text-left"
                style={{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : '#1C1C1C66', ...interFont }}
              >
                Name
              </th>
              <th
                className="pb-3 pl-4 text-left"
                style={{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : '#1C1C1C66', ...interFont }}
              >
                Price
              </th>
              <th
                className="pb-3 pl-4 text-left"
                style={{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : '#1C1C1C66', ...interFont }}
              >
                Quantity
              </th>
              <th
                className="pb-3 pl-4 text-left"
                style={{ color: darkMode ? 'rgba(255, 255, 255, 0.4)' : '#1C1C1C66', ...interFont }}
              >
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {topSellingProducts.map((product, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: `1px solid ${
                    darkMode ? 'rgba(255,255,255,0.02)' : '#f3f4f6'
                  }`,
                  transition: 'background .15s',
                }}
                className={
                  darkMode ? 'hover:bg-black/20' : 'hover:bg-gray-50'
                }
              >
                <td
                  className="text-left"
                  style={{
                    padding: isMobile ? '8px 8px' : '12px 16px',
                    color: darkMode ? 'white' : 'black',
                    ...interFont
                  }}
                >
                  {product.name}
                </td>
                <td
                  className="text-left"
                  style={{
                    padding: isMobile ? '8px 8px' : '12px 16px',
                    color: darkMode ? 'white' : 'black',
                    ...interFont
                  }}
                >
                  {product.price}
                </td>
                <td
                  className="text-left"
                  style={{
                    padding: isMobile ? '8px 8px' : '12px 16px',
                    color: darkMode ? 'white' : 'black',
                    ...interFont
                  }}
                >
                  {product.quantity}
                </td>
                <td
                  className="text-left"
                  style={{
                    padding: isMobile ? '8px' : '12px',
                    color: darkMode ? 'white' : 'black',
                    ...interFont
                  }}
                >
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSalesTable;
