import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import helper from './Helper'

describe('<BlogForm />', () => {
  test('Form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const addBlog = jest.fn()
    const virtualUser = userEvent.setup()

    const { container } = render(<BlogForm addBlog={addBlog} />)

    const titleInput = container.querySelector('input[name="Title"]')
    await virtualUser.type(titleInput, helper.blog.title)

    const authorInput = container.querySelector('input[name="Author"]')
    await virtualUser.type(authorInput, helper.blog.author)

    const urlInput = container.querySelector('input[name="URL"]')
    await virtualUser.type(urlInput, helper.blog.url)

    const createButton = container.querySelector('input[name="Create"]')
    await virtualUser.click(createButton)

    const { user, likes, ...formBlog } = helper.blog

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toStrictEqual(formBlog)
  })
})
