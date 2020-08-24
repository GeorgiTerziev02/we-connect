describe('Pages functionality', () => {
    it('should contain Login and Register buttons', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Register')
        cy.get('button').contains('Login')
    })

    it('should navigate to login page', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.get('h1').contains('Login')
    })

    it('login successfully', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('#username').type('1')
        cy.get('#password').type('1')
        cy.get('button').contains('Login').click()
        cy.location('pathname').should('eq', '/')
        cy.get('h1').contains('Hello, 1!')
    })
})