import React from 'react'
import renderer from 'react-test-renderer'
import Header from './index.js'
import TestingEnvironment from '../../test-utils/router'

describe('Header Component', () => {
    it('should render authenticated links', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    id: 3123123
                },
                loggedIn: true
            }}>
                <Header />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    }),
        it('should render without authenticated links', () => {
            const tree = renderer.create(
                <TestingEnvironment value={{
                    loggedIn: false
                }}>
                    <Header />
                </TestingEnvironment>
            ).toJSON()
            expect(tree).toMatchSnapshot()
        })
})