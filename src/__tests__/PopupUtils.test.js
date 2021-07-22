import { changePosition, calculatePosition } from "../utils/popup.js";

describe("popup utils changePosition", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: "1000",
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: "768",
    });
  });
  it("should return correct position if it fit in screen (LEFT -> LEFT)", () => {
    expect(changePosition(700, "LEFT", "width: 300px;")).toBe("LEFT");
  });
  it("should return correct position if it fit in screen (CENTER -> CENTER)", () => {
    expect(changePosition(150, "CENTER", "width: 300px;")).toBe("CENTER");
  });
  it("should return correct position if it fit in screen (RIGHT -> RIGHT)", () => {
    expect(changePosition(300, "RIGHT", "width: 300px;")).toBe("RIGHT");
  });
  it("should return correct position if it not fit in screen (LEFT -> RIGHT)", () => {
    expect(changePosition(800, "LEFT", "width: 300px;")).toBe("RIGHT");
  });
  it("should return correct position if it not fit in screen (RIGHT -> LEFT)", () => {
    expect(changePosition(200, "RIGHT", "width: 300px;")).toBe("LEFT");
  });
  it("should return correct position if it not fit in screen (CENTER -> LEFT)", () => {
    expect(changePosition(100, "CENTER", "width: 300px;")).toBe("LEFT");
  });
  it("should return correct position if it not fit in screen (CENTER -> RIGHT)", () => {
    expect(changePosition(900, "CENTER", "width: 300px;")).toBe("RIGHT");
  });
});

describe("popup utils calculatePosition", () => {
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 150,
      top: 150,
      bottom: 200,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "RIGHT";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("212px");
    expect(element.style.top).toBe("203px");
    expect(popupArrowElementTop.style.right).toBe("25px");
  });
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 600,
      top: 600,
      bottom: 650,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "CENTER";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("325px");
    expect(element.style.top).toBe("288px");
    expect(popupArrowElementBottom.style.left).toBe("50%");
  });
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 600,
      top: 600,
      bottom: 650,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "LEFT";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("438px");
    expect(element.style.top).toBe("288px");
    expect(popupArrowElementBottom.style.left).toBe("39px");
  });
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 150,
      top: 150,
      bottom: 200,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "LEFT";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("438px");
    expect(element.style.top).toBe("203px");
    expect(popupArrowElementTop.style.left).toBe("39px");
  });
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 200,
      top: 200,
      bottom: 250,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "CENTER";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("325px");
    expect(element.style.top).toBe("253px");
    expect(popupArrowElementTop.style.left).toBe("50%");
  });
  it("should set element left and top to correct values, and choose right direction for popup", () => {
    let element = {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {},
    };
    let relativeElementRect = {
      y: 600,
      top: 600,
      bottom: 650,
      left: 450,
      right: 500,
      width: 50,
    };
    let popupArrowElementBottom = { style: {} };
    let popupArrowElementTop = { style: {} };
    let position = "RIGHT";

    calculatePosition(
      element,
      relativeElementRect,
      popupArrowElementBottom,
      popupArrowElementTop,
      position
    );

    expect(element.style.left).toBe("212px");
    expect(element.style.top).toBe("288px");
    expect(popupArrowElementBottom.style.right).toBe("25px");
  });
});
