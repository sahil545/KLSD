import { useState } from 'react';

export default function SimpleApiTest() {
  const [result, setResult] = useState<string>('Click button to test API connection...');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      // Test basic WooCommerce API connection
      const url = 'https://keylargoscubadiving.com/wp-json/wc/v3/orders?per_page=5';
      const credentials = btoa('ck_a0eca539b380e752ddf8c20467c9ad4fb63d8e19:cs_9a78f89e28a2e6a5bcaac149fd7050c620b7670c');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        const orders = await response.json();
        
        let resultText = `✅ API CONNECTION SUCCESSFUL!\n\n`;
        resultText += `Status: ${response.status} ${response.statusText}\n`;
        resultText += `Found ${orders.length} recent orders\n\n`;
        
        if (orders.length > 0) {
          resultText += `LATEST ORDER:\n`;
          const latest = orders[0];
          resultText += `Order #${latest.id} (${latest.number})\n`;
          resultText += `Customer: ${latest.billing.first_name} ${latest.billing.last_name}\n`;
          resultText += `Email: ${latest.billing.email}\n`;
          resultText += `Total: $${latest.total}\n`;
          resultText += `Status: ${latest.status}\n`;
          resultText += `Date: ${new Date(latest.date_created).toLocaleString()}\n`;
          
          if (latest.line_items && latest.line_items.length > 0) {
            resultText += `\nItems:\n`;
            latest.line_items.forEach((item: any) => {
              resultText += `- ${item.name} (x${item.quantity})\n`;
            });
          }
        }
        
        setResult(resultText);
      } else {
        const errorText = await response.text();
        setResult(`❌ API CONNECTION FAILED!\n\nStatus: ${response.status} ${response.statusText}\n\nError: ${errorText}`);
      }
    } catch (error: any) {
      setResult(`❌ API CONNECTION ERROR!\n\nError: ${error.message}\n\nThis could be due to:\n- CORS issues\n- Network problems\n- Invalid credentials\n- Server down`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'monospace', 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        marginBottom: '20px',
        color: '#333'
      }}>
        WooCommerce API Connection Test
      </h1>
      
      <button
        onClick={testAPI}
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        whiteSpace: 'pre-line',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        {result}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>API Configuration:</h3>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Base URL:</strong> https://keylargoscubadiving.com
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Endpoint:</strong> /wp-json/wc/v3/orders
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Consumer Key:</strong> ck_a0eca539...d8e19 (masked)
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Method:</strong> GET with Basic Auth
        </p>
      </div>
    </div>
  );
}
