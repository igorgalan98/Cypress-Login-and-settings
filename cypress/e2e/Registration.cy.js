/// <reference types="cypress" />

const {
    randEmail,
    randAccount,
    randPassword,
    randLastName,
    randFirstName,
    randPhoneNumber,
    randBrand,
    randAddress,
    randNumber,
    randCity,
    randState,
    randZipCode,
 } = require('@ngneat/falso');

 let user;

    describe('Create account', () => {
        user = {
            email: randEmail(),
            account: randAccount(),
            password: randPassword(),
            LastName: randLastName(),
            FirstName: randFirstName(),
            PhoneNumber: randPhoneNumber(),
            Company: randBrand(),
            Number: randNumber(),
            Address: randAddress(),
            City: randCity(),
            State: randState(),
            Zip: randZipCode(),
        }


        it('Should make the registration with success', () => {

            cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
            cy.get('#reg_email').type(user.email)
            cy.get('#reg_password').type(user.password)
            cy.get(':nth-child(4) > .button').click()
            cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá')
            cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain', 'A partir do painel de controle de sua conta, você pode ver suas compras recentes, gerenciar seus endereços de entrega e faturamento, e editar sua senha e detalhes da conta.')

            cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
            cy.get(':nth-child(1) > .title > .edit').click()
            cy.get('#billing_first_name').type(user.FirstName)
            cy.get('#billing_last_name').type(user.LastName)
            cy.get('#billing_company').type(user.Company)
            cy.get('#select2-billing_country-container').click().type('Cabo Verde' + '{Enter}')
            cy.get('#billing_address_1').type(user.Number)
            cy.get('#billing_address_2').type('Cabo Verde')
            cy.get('#billing_city').type(user.City)
            cy.get('#billing_state').type(user.State)
            cy.get('#billing_postcode').type(user.Zip)
            cy.get('#billing_phone').type(user.PhoneNumber)
            cy.get('#billing_email').clear().type(user.email)
            cy.get('.button').click()

            cy.get('.page-title').should('contain', 'Endereço')
            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        })
 });
