fetch('http://localhost:3000/api'{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
    }),
}).then(response => response.json())