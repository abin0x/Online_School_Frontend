document.addEventListener('DOMContentLoaded', function () {
    const blogContainer = document.querySelector('.blog-cards-container');
    const apiUrl = 'https://onlineschool-im71.onrender.com/api/posts/';

    function truncateText(text, limit = 100) {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + '...';
    }

    function createBlogCard(post) {
        const truncatedContent = truncateText(post.content, 60); 

        return `
            <div class="blog-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span><i class="fa fa-calendar"></i> ${new Date(post.created_at).toLocaleDateString()}</span>
                        <span><i class="fa fa-comment"></i> Comment (${post.comments_count || 0})</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${truncatedContent}</p>
                    <a href="blog-details.html?id=${post.id}" class="btn_view_all_courses">Read More &rarr;</a>
                </div>
            </div>
        `;
    }

    function fetchBlogPosts() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    let blogHtml = '';
                    data.forEach(post => {
                        blogHtml += createBlogCard(post);
                    });
                    blogContainer.innerHTML = blogHtml;
                } else {
                    blogContainer.innerHTML = '<p>No blog posts available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
                blogContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
            });
    }

    fetchBlogPosts();
});
