function getWidthFromCss(css) {
  let width = "";
  css.split(";").forEach((item) => {
    if (item.search("width") !== -1) {
      width = parseInt(item.split(":")[1]);
    }
  });
  return width;
}

/**
 * changes position of popup if it not fits in screen
 * @param {number} realtiveElementLeft distanse from relevant window edge
 * @param {string} position Direction of popup
 * @param {string} css
 * @returns {string} position
 */
export function changePosition(relativeElementLeft, position, css) {
  if (
    window.innerWidth - relativeElementLeft - getWidthFromCss(css) < 0 &&
    position === "LEFT"
  ) {
    return "RIGHT";
  } else if (
    relativeElementLeft - getWidthFromCss(css) < 0 &&
    position === "RIGHT"
  ) {
    return "LEFT";
  } else if (
    window.innerWidth - relativeElementLeft - getWidthFromCss(css) / 2 < 0 &&
    position === "CENTER"
  ) {
    return "RIGHT";
  } else if (
    relativeElementLeft - getWidthFromCss(css) / 2 < 0 &&
    position === "CENTER"
  ) {
    return "LEFT";
  }
  return position;
}

/**
 * calculates popup position
 * @param {HTMLElement} popup element to position
 * @param {DOMRect} relative element's rect
 * @param {HTMLElement} bottom arrow html element
 * @param {HTMLElement} top arrow html element
 * @param {string} position of element
 */
export function calculatePosition(
  element,
  relativeElementRect,
  popupArrowElementBottom,
  popupArrowElementTop,
  position
) {
  if (window.innerHeight - relativeElementRect.y - element.offsetHeight - 50 < 0) {
    // top
    if (position === "RIGHT") {
      element.style.left =
        relativeElementRect.right - element.offsetWidth + 12 + "px";
      element.style.top =
        relativeElementRect.top - element.offsetHeight - 12 + "px";
      popupArrowElementBottom.style.right =
        relativeElementRect.width / 2 + "px";
    } else if (position === "CENTER") {
      element.style.left =
        relativeElementRect.left +
        relativeElementRect.width / 2 -
        element.offsetWidth / 2 +
        "px";
      element.style.top =
        relativeElementRect.top - element.offsetHeight - 12 + "px";
      popupArrowElementBottom.style.left = "50%";
    } else if (position === "LEFT") {
      element.style.left = relativeElementRect.left - 12 + "px";
      element.style.top =
        relativeElementRect.top - element.offsetHeight - 12 + "px";
      popupArrowElementBottom.style.left =
        relativeElementRect.width / 2 + 14 + "px";
    }
  } else {
    // bottom
    if (position === "RIGHT") {
      element.style.left =
        relativeElementRect.right - element.offsetWidth + 12 + "px";
      element.style.top = relativeElementRect.bottom + 3 + "px";
      popupArrowElementTop.style.right = relativeElementRect.width / 2 + "px";
    } else if (position === "CENTER") {
      element.style.left =
        relativeElementRect.left +
        relativeElementRect.width / 2 -
        element.offsetWidth / 2 +
        "px";
      element.style.top = relativeElementRect.bottom + 3 + "px";
      popupArrowElementTop.style.left = "50%";
    } else if (position === "LEFT") {
      element.style.left = relativeElementRect.left - 12 + "px";
      element.style.top = relativeElementRect.bottom + 3 + "px";
      popupArrowElementTop.style.left =
        relativeElementRect.width / 2 + 14 + "px";
    }
  }
  return true;
}
