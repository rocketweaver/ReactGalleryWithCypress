describe("Dashboard Test Cases", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("welcome");
    });

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("Found No Post for the First Time", () => {
    cy.contains("Found 0 photos");
  });

  it("Contains Image URL and Description Input, and Publish Button", () => {
    const img = cy.get("[name='image']");
    img
      .should("be.visible")
      .and("not.be.disabled")
      .should("have.attr", "type", "url")
      .and("have.attr", "required", "required")
      .and("have.attr", "placeholder", "Image URL");

    const desc = cy.get("[name='desc']");
    desc
      .should("be.visible")
      .and("not.be.disabled")
      .should("have.attr", "type", "text")
      .and("have.attr", "required", "required")
      .and("have.attr", "placeholder", "What's on your mind?");

    const publishBtn = cy.get("button");
    publishBtn
      .should("be.visible")
      .contains("Publish!")
      .should("have.css", "background-color", "rgb(79, 70, 229)")
      .and("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Upload Some Photos", () => {
    const photos = [
      {
        url: "https://images.unsplash.com/photo-1726503014893-986e13826cd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        desc: "Lorem ipsum",
      },
      {
        url: "https://images.unsplash.com/photo-1728241189734-f422205a6a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
        desc: "Lorem ipsum",
      },
    ];

    photos.forEach(({ url, desc }) => {
      const img = cy.get("[name='image']");
      img.type(url);

      const description = cy.get("[name='desc']");
      description.type(desc);

      const publishBtn = cy.get("button");
      publishBtn.click();

      cy.get("img").should("have.attr", "src", url);
      cy.contains(desc);
    });

    cy.contains(`Found ${photos.length} photos`);
  });
});
