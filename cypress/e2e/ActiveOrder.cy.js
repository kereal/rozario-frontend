describe("EditModal", () => {
  before(() => {
    cy.visit("/profile");
    cy.wait(600);
  });
  beforeEach(() => {
    cy.contains("Редактировать данные").click();
    cy.wait(600);
    cy.get('button[data-testid="editmodal-button"]:visible').click();
    cy.wait(800);
    cy.get('[data-testid="editmodal-modal"]').should("have.class", "modal");    
  });

  it("should change time range: 2 hours interval", () => {
    cy.get('.modal button[data-section="datepicker"]').click();
    cy.get(".calendar-grid").should("have.class", "calendar-grid");
    cy.get('input[data-testid="editmodal-time-range-from"]')
      .clear()
      .type("1300")
      .should("have.value", "13:00");
    cy.get('input[data-testid="editmodal-time-range-to"]').should(
      "have.value",
      "15:00"
    );
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("сб, 21 марта, с 13:00 до 15:00");
  });

  it("should change recipient: other person", () => {
    cy.get('.modal button[data-section="recipient"]').click();
    cy.get('input[value="anotherPerson"] + label').click();
    cy.get('[data-testid="editmodal-recipient"]')
      .clear()
      .type("Valera Ivanov")
      .should("have.value", "Valera Ivanov");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("Valera Ivanov");
  });

  it("should change recipients Phone number", () => {
    cy.get('.modal button[data-section="recipientPhone"]').click();
    cy.get('[data-testid="editmodal-recipient-phone"]')
      .clear()
      .type("+79215678943")
      .should("have.value", "+7 921 567-89-43");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("+7 921 567-89-43");
  });

  it("should change user defined destination", () => {
    cy.get('.modal button[data-section="destination"]').click();
    cy.get('input[value="address"] + label').click();
    cy.get('[data-testid="editmodal-address"]')
      .clear()
      .type("Murmansk")
      .should("have.value", "Murmansk");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("Murmansk");
  });

  it("should change destination to clarify address", () => {
    cy.get('.modal button[data-section="destination"]').click();
    cy.get('input[value="noAddress"] + label').click();
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("Уточнить у получателя");
  });

  it("should change destination to self pickup", () => {
    cy.get('.modal button[data-section="destination"]').click();
    cy.get('input[value="selfPickup"] + label').click();
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("Мурманск, промышленная 19");
  });

  it("should change postcard text", () => {
    cy.get('.modal button[data-section="postcard"]').click();
    cy.get('[data-testid="editmodal-postcard"]')
      .clear()
      .type("Happy Birthday!!!")
      .should("have.value", "Happy Birthday!!!");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("Happy Birthday!!");
  });

  it("should change clients phone number", () => {
    cy.get('.modal button[data-section="clientPhone"]').click();
    cy.get('[data-testid="editmodal-clients-phone"]')
      .clear()
      .type("+79213455566")
      .should("have.value", "+7 921 345-55-66");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
  });

  it("should change comment", () => {
    cy.get('.modal button[data-section="comment"]').click();
    cy.get('[data-testid="editmodal-comment"]')
      .clear()
      .type("this is my comment")
      .should("have.value", "this is my comment");
    cy.get('button[data-testid="save-button"]').click();
    cy.wait(600);
    cy.get("span").contains("this is my comment");
  });

  it("should not change data on close button", () => {
    cy.get('.modal button[data-section="comment"]').click();
    cy.get('[data-testid="editmodal-comment"]')
      .clear()
      .type("this is new comment")
      .should("have.value", "this is new comment");
    cy.get('button[data-testid="close-button"]').click();
    cy.wait(600);
    cy.get("span").contains("this is my comment");
  });
});

describe("Edit tab", () => {
  before(() => {
    cy.visit("/profile");
    cy.wait(600);
  });

  it("should show correctly", () => {
    cy.get('[data-testid="order-details-button"]').click({force: true})
    cy.wait(600)
    cy.get('[data-testid="order-details"]')
  })
})


describe("Content", () => {
  before(() => {
    cy.visit("/profile");
    cy.wait(600);
  });

  it("should open each tab", () => {
    cy.get('.active-order .menu-section[data-id="2"]').click()
    cy.get('.active-order .menu-section span').should('contain', 'Магазин')
    cy.get('h3.title').should('contain', 'Ваш заказ скоро будет готов')

    cy.get('.active-order .menu-section[data-id="3"]').click()
    cy.get('.active-order .menu-section span').should('contain', 'Фотография')
    cy.get('h3.title').should('contain', 'Оцените фото заказа до доставки')

    cy.get('.active-order .menu-section[data-id="4"]').click()
    cy.get('.active-order .menu-section span').should('contain', 'Доставка')
    cy.get('h3.title').should('contain', 'Курьер в пути')
    
    cy.get('.active-order .menu-section[data-id="5"').click()
    cy.get('.active-order .menu-section span').should('contain', 'Выполнен')
    cy.get('h3.title').should('contain', 'Ваш заказ доставлен!')

    cy.get('.active-order .menu-section[data-id="1"]').click()
    cy.get('.active-order .menu-section span').should('contain', 'Редактировать данные')
    cy.get('h3.title').should('contain', 'Заказ оформлен, спасибо!')
  })

});

describe("Done tab", () => {
  before(() => {
    cy.visit("/profile");
    cy.wait(600);
    cy.get('.active-order .menu-section[data-id="5"').click()
  });

  it("should set correct bonus points", () => {
    cy.get('label[for="flower-freshness-second-star1"').click()
    cy.get('label[for="courier-second-star1"').click()
    cy.get('label[for="service-second-star1"').click()

    cy.get('.compliment-item button[data-index="0"]').click()
    cy.get('.content-right textarea').type("comment")

    cy.get('.progress-bar div:visible').should('have.attr', 'style', 'width: 100%;')
  })
})

