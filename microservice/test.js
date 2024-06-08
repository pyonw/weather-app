async function testMicroservice() {
    try {
      const response = await fetch('http://localhost:3000/api/getRandomItem');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the test function
  testMicroservice();
  