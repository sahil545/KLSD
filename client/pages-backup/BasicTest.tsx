export default function BasicTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 React is Working!</h1>
      <p>This confirms the development environment is functioning.</p>
      
      <h2>Next Step: API Connection Test</h2>
      <p>Your live website at keylargoscubadiving.com is completely safe.</p>
      <p>This is a separate test environment.</p>
      
      <button 
        onClick={() => {
          fetch('https://keylargoscubadiving.com/wp-json/wc/v3/orders?per_page=1', {
            headers: {
              'Authorization': 'Basic ' + btoa('ck_a0eca539b380e752ddf8c20467c9ad4fb63d8e19:cs_9a78f89e28a2e6a5bcaac149fd7050c620b7670c')
            }
          })
          .then(response => response.json())
          .then(data => {
            alert('API Test Result: ' + JSON.stringify(data, null, 2));
          })
          .catch(error => {
            alert('API Error: ' + error.message);
          });
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test WooCommerce API Connection
      </button>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
        <h3>What this will test:</h3>
        <ul>
          <li>✅ Your WooCommerce API credentials</li>
          <li>✅ Connection to your live store</li>
          <li>✅ Ability to read order data</li>
        </ul>
        <p><strong>Important:</strong> This only READS data - it won't create or modify anything on your live site.</p>
      </div>
    </div>
  );
}
