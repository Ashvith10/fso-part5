const CreateNew = ({title, setTitle, author, setAuthor, url, setUrl, createBlog}) => {
    return (
        <div>
            <h2>create new</h2>
            <div>
                <form onSubmit={createBlog}>
                    <div>
                        title:
                        <input
                            type="text"
                            value={title}
                            name="Title"
                            onChange={({target}) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:
                        <input
                            type="text"
                            value={author}
                            name="Author"
                            onChange={({target}) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:
                        <input
                            type="text"
                            value={url}
                            name="URL"
                            onChange={({target}) => setUrl(target.value)}
                        />
                    </div>
                    <input type="submit" value="create"/>
                </form>
            </div>
        </div>
    )
}

export default CreateNew
