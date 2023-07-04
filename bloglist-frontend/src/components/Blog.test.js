import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import helper from './Helper'

describe('<Blog />', () => {
  test('Render blog\'s title and author, not URL or like by default', () => {
    const { container } = render(<Blog blog={helper.blog} user={helper.user} />)

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
    const virtualUser = userEvent.setup()
    const { container } = render(<Blog blog={helper.blog} user={helper.user} />)

    const url = container.querySelector('.blog-url')
    const like = container.querySelector('.blog-likes')

    expect(url).not.toBeVisible()
    expect(like).not.toBeVisible()

    const showButton = container.querySelector('.show')
    await virtualUser.click(showButton)

    expect(url).toBeVisible()
    expect(like).toBeVisible()
  })

  test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const updateBlog = jest.fn()
    const virtualUser = userEvent.setup()

    const { container } = render(<Blog blog={helper.blog} updateBlog={updateBlog} user={helper.user} />)

    const likeButton = container.querySelector('.like')
    await virtualUser.click(likeButton)
    await virtualUser.click(likeButton)

    expect (updateBlog.mock.calls).toHaveLength(2)
  })
})
