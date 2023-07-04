import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    'url':'https://www.google.com',
    'title':'Title',
    'author':'Author',
    'user': {
      'username':'Username',
      'name':'Name',
      'id':'64802c91105d71169d4b524a'
    },
    'likes':5,
    'id':'64914457e7969414b64dd0e4'
  }

  const user = {
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaHZpdGgiLCJpZCI6IjY0YTQwNTMwYjIxM2U4YmIxODRjMjdlNSIsImlhdCI6MTY4ODQ3MDg0MX0.3AnYebHX6gURlN8I2LQTSZQsC16n1HlgV6Wr-_10FtA',
    'username': 'ashvith',
    'name': 'Ashvith'
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

  test('blog\'s URL and number of likes are shown when \'show\' button is pressed', async () => {
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
})
