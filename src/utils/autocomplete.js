const defaultStyles = {
  AUTO_COMPLETE_LIST_ITEM_ACTIVE: "autocomplete-list-item-active",
  AUTO_COMPLETE_LIST_ITEM: "autocomplete-list-item",
};

export class Autocomplete {
  constructor(data, styles, currentFocus) {
    this.data = data;
    this.styles = styles || defaultStyles;
    this.currentFocus = -1;
  }
  set currFocus(cf) {
    this.currentFocus = cf;
  }
  inputKeydown(e, onEscape) {
    if (e.key === "Escape") {
      onEscape();
    }
    const x = document.querySelectorAll(
      `.${this.styles.AUTO_COMPLETE_LIST_ITEM}`
    );
    if (e.key === "ArrowDown") {
      this.currentFocus++;
      this.addActive(x);
    } else if (e.key === "ArrowUp") {
      if (this.currentFocus !== -1) {
        this.currentFocus--;
        this.addActive(x);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (x) x[this.currentFocus].click();
      }
    }
  }
  addActive(ul) {
    if (ul.length < 1) return false;
    const active = document.querySelector(
      `.${this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE}`
    );
    if (active) {
      active.classList.remove(this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE);
    }

    if (this.currentFocus >= ul.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = ul.length - 1;

    ul[this.currentFocus].classList.add(
      this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE
    );
  }
  autocompleteMouseOver(e) {
    const active = document.querySelector(
      `.${this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE}`
    );
    const li = e.target.closest(`.${this.styles.AUTO_COMPLETE_LIST_ITEM}`);
    if (!li) {
      return;
    }
    if (active) {
      active.classList.remove(this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE);
      li.classList.add(this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE);
    } else {
      li.classList.add(this.styles.AUTO_COMPLETE_LIST_ITEM_ACTIVE);
    }
    this.currentFocus = li.dataset.value;
  }
}
