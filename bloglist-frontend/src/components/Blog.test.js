import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    'url': 'https://www.google.com',
    'title': 'Title',
    'author': 'Author',
    'user': {
      'username': 'Username',
      'name': 'Name',
    },
    'likes': 1,
  }

  const user = {
    'username': 'Username',
    'name': 'Name'
  }

  test('Render blog\'s title and author, not URL or like by default', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const title = container.querySelector('.blog-title')
    expect(title).toBeVisible()

    let author = container.querySelector('.blog-author')
    expect(author).toBeVisible()

    const url = container.querySelector('.blog-url')
    expect(url).not.toBeVisible()

    const like = container.querySelector('.blog-likes')
    expect(like).not.toBeVisible()
  })

  test('Blog\'s URL and number of likes are shown when \'show\' button is pressed', async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const url = container.querySelector('.blog-url')
    const like = container.querySelector('.blog-likes')

    expect(url).not.toBeVisible()
    expect(like).not.toBeVisible()

    const virtualUser = userEvent.setup()
    const button = container.querySelector('.show')
    await virtualUser.click(button)

    expect(url).toBeVisible()
    expect(like).toBeVisible()
  })

  test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} updateBlog={mockHandler} user={user} />)

    const virtualUser = userEvent.setup()
    const button = container.querySelector('.like')
    await virtualUser.click(button)
    await virtualUser.click(button)

    expect (mockHandler.mock.calls).toHaveLength(2)
  })
})
