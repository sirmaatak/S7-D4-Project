const errorMessages = {
  name: "Minimum 3 characters needed",
  surname: "Minimum 3 characters needed",
  email: "Invalid mail adress",
  password:
    "8 characters long 1 uppercase & 1 lowercase character and 1 number needed",
  terms: "Must accept the terms",
};

describe('Tests for Login Page', () => {
  describe('Error Messages', () => {
  it('Name input not pass to test for less than 3 chars', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="name-input"]').type('sr')
    //Assert
     cy.contains(errorMessages.name)
  })
  it('Surname input not pass to test for less than 3 chars', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="surname-input"]').type('a')
    //Assert
     cy.contains(errorMessages.surname)
  })
  it('Email input not pass to test for invalid email address', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="email-input"]').type('deneme@')
    //Assert
     cy.contains(errorMessages.email)
  })
  it('Password input not pass to test for invalid password', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="password-input"]').type('*Sirma')
    //Assert
     cy.contains(errorMessages.password)
  })
  })
  describe('Tests for Register Button', () => {
  it('Register Button is disabled when all inputs are unvalid', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="name-input"]').type('sr')
    //Assert
    cy.get('[data-cy="register-button"]').should('be.disabled')
  }) 
  it('Register Button is enable when all inputs are valid', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="name-input"]').type('sirma')
     cy.get('[data-cy="surname-input"]').type('atak')
     cy.get('[data-cy="email-input"]').type('sirma.atak@outlook.com')
     cy.get('[data-cy="password-input"]').type('*Sirma123*')
     cy.get('[data-cy="checkbox-input"]').check()
    //Assert
    cy.get('[data-cy="register-button"]').should('be.enabled')
  }) 
  it('Redirect to Success page when form is valid ', () => {
    //Arrange 
     cy.visit('http://localhost:5176/')
    //Act
     cy.get('[data-cy="name-input"]').type('sirma')
     cy.get('[data-cy="surname-input"]').type('atak')
     cy.get('[data-cy="email-input"]').type('sirma.atak@outlook.com')
     cy.get('[data-cy="password-input"]').type('*Sirma123*')
     cy.get('[data-cy="checkbox-input"]').check()
     cy.get('[data-cy="register-button"]').click()
    //Assert
    cy.url().should("be.equals", 'http://localhost:5176/success')
  }) 
  })
})