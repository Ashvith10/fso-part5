import {useState} from 'react'

const Blog = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [blogVisible, setBlogVisible] = useState(null)
    const hideWhenVisible = {display: blogVisible ? 'none' : ''}
    const showWhenVisible = {display: blogVisible ? '' : 'none'}

    return (
        <div style={blogStyle} id={blog.id}>
            <div class="blog-title">
                {blog.title} {blog.author}
                &nbsp;
                <input
                    type="button"
                    value="view"
                    style={hideWhenVisible}
                    onClick={() => setBlogVisible(true)}
                />  
                <input
                    type="button"
                    value="hide"
                    style={showWhenVisible}
                    onClick={() => setBlogVisible(false)}
                />
            </div>
            <div class="blog-details" style={showWhenVisible}>
                <div class="blog-url">{blog.url}</div>
                <div class="blog-likes">
                    likes {blog.likes}&nbsp;
                    <input
                        type="button"
                        value="like"
                    />
                </div>
                <div class="blog-user">{blog.user.name}</div>
            </div>
        </div>
    )
}

export default Blog
