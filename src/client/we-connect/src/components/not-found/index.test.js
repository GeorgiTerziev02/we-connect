import React from 'react'
import renderer from 'react-test-renderer'
import NotFound from './index'
import TestingEnvironment from '../../test-utils/router'

// always mock before describe
jest.mock('../../images/banner_error_404.jpg', () => 'Image')

describe('Not found component', () => {
    it('should render not found component', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    id: 2342
                },
                loggedIn: true
            }}>
                <NotFound />
            </TestingEnvironment>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })
})