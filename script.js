document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    messageDiv.innerHTML = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Loading...';
    
    setTimeout(() => {
        const correctLogin = 'test@test.com';
        const correctPassword = 'Test123';
        
        if (login === correctLogin && password === correctPassword) {
            const responses = [
                { 
                    success: true, 
                    message: "✅ Login successful!", 
                    entity: { 
                        UserID: Math.floor(Math.random() * 1000), 
                        Email: login, 
                        Status: "Active",
                        LastLogin: new Date().toLocaleString(),
                        SessionID: "sess_" + Math.random().toString(36).substr(2, 9)
                    } 
                },
                { 
                    success: true, 
                    message: "✅ Welcome back!", 
                    entity: { 
                        UserID: Math.floor(Math.random() * 1000),
                        Email: login, 
                        Role: "User",
                        Plan: "Premium",
                        Expires: "2024-12-31"
                    } 
                }
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            messageDiv.innerHTML = `
                <div class="alert alert-success">
                    <h5>${randomResponse.message}</h5>
                    <div class="mt-2">
                        <strong>Entity Details:</strong>
                        <pre class="mt-2 p-2 bg-light rounded">${JSON.stringify(randomResponse.entity, null, 2)}</pre>
                    </div>
                </div>
            `;
        } else {
            const errorMessages = [
                "❌ Invalid login or password",
                "❌ Authentication failed", 
                "❌ Access denied - check your credentials",
                "❌ Login failed - user not found"
            ];
            
            const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            
            messageDiv.innerHTML = `
                <div class="alert alert-danger">
                    <h5>${randomError}</h5>
                    <p class="mb-0">
                        <strong>Provided:</strong><br>
                        Login: ${login}<br>
                        Password: ${password}
                    </p>
                        <small class="text-muted">
                        <strong>Expected:</strong><br>
                        Login: ${correctLogin}<br>
                        Password: ${correctPassword}
                    </small>
                    <hr>
                </div>
            `;
        }
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit';
        
    }, 1500); 
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login').value = 'test@test.com';
    document.getElementById('password').value = 'Test123';
});

document.getElementById('login').addEventListener('input', clearMessage);
document.getElementById('password').addEventListener('input', clearMessage);

function clearMessage() {
    document.getElementById('message').innerHTML = '';
}