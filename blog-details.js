document.addEventListener('DOMContentLoaded', function () {
    const postDetailsContainer = document.getElementById('post-details');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('id');
    const apiUrl = `https://onlineschool-im71.onrender.com/api/posts/${postId}`;

    function createPostDetails(post) {
        // Ensure the image URL is correctly constructed
        const imageUrl = post.image.startsWith('/') ? `https://onlineschool-im71.onrender.com${post.image}` : post.image;

        return `
            <div class="post-details">
                <h1>Title: ${post.title}</h1>
                <img src="${imageUrl}" alt="${post.title}">
                
                <div class="post-meta">
                    <span><i class="fa fa-calendar"></i> ${new Date(post.created_at).toLocaleDateString()}</span>
                    <span><i class="fa fa-user"></i> ${post.author}</span>
                </div>
                <p>${post.content}</p>
            </div>
        `;
    }

    function fetchPostDetails() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    postDetailsContainer.innerHTML = createPostDetails(data);
                } else {
                    postDetailsContainer.innerHTML = '<p>Post not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
                postDetailsContainer.innerHTML = '<p>Failed to load post details. Please try again later.</p>';
            });
    }

    fetchPostDetails();
});
