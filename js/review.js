document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    alert('Thank you for your review!');
    
    window.location.href = 'index.html';
});