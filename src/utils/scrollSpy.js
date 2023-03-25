import throttle from "lodash/throttle";

// see bootstrap scrollspy
class ScrollSpy {
  constructor(element, headers) {
    this._element = element;
    this._scrollElement = element.tagName === "BODY" ? window : element;
    this._block = false;
    this._headers = headers;
    this._selector = "[data-scrollspy]";
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    this._headerOffset = 160;

    this.throttledProcess = throttle(this._process.bind(this), 60);

    this.throttledProcess = this.throttledProcess.bind(this)

    this._element.addEventListener(
      "scroll",
      this.throttledProcess
    );

    this.refresh();
    this._process();
  }

  // Public

  refresh() {
    const offsetBase = this._getScrollTop();

    this._offsets = [];
    this._targets = [];

    this._scrollHeight = this._getScrollHeight();

    const targets = this._headers;
    targets.forEach((element) => {
      if (element) {
        const elementBCR = element.getBoundingClientRect();
        if (elementBCR.width || elementBCR.height) {
          this._offsets.push(
            elementBCR.top +
              document.body.scrollTop -
              this._headerOffset +
              offsetBase
          );
        }
      }
    });
    this._targets = targets;
 //   console.log("offsets", this._offsets);
  }

  destroy() {
    this._element.removeEventListener(
      "scroll",
      this.throttledProcess
    );
  }

  // Private

  _getScrollTop() {
    return this._scrollElement === window
      ? this._scrollElement.pageYOffset
      : this._scrollElement.scrollTop;
  }

  _getScrollHeight() {
    return (
      this._scrollElement.scrollHeight ||
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    );
  }

  _getOffsetHeight() {
    return this._scrollElement === window
      ? window.innerHeight
      : this._scrollElement.getBoundingClientRect().height;
  }

  _process() {
    const scrollTop = this._getScrollTop();
    const scrollHeight = this._getScrollHeight();
    const maxScroll = scrollHeight - this._getOffsetHeight();

    // if (this._scrollHeight !== scrollHeight) {
    //   this.refresh()
    // }

    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];
      if (this._activeTarget && !this._activeTarget.isSameNode(target)) {
        this._activate(target);
      }

      return;
    }

    if (
      this._activeTarget &&
      scrollTop < this._offsets[0] &&
      this._offsets[0] > 0
    ) {
      this._activeTarget = null;
      return;
    }

    for (let i = this._offsets.length; i--; ) {
      let isSameNode = true;
      if (this._activeTarget) {
        isSameNode = !this._activeTarget.isSameNode(this._targets[i]);
      }
      let isActiveTarget =
        isSameNode &&
        scrollTop >= this._offsets[i] &&
        (typeof this._offsets[i + 1] === "undefined" ||
          scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i], i);
      }
    }
  }

  block() {
    console.log("block fn");
    this._block = true;
  }

  unblock() {
    console.log("unblock fn");
    this._block = false;
  }
  _activate(target, i) {
    this._activeTarget = target;
    const activateEvent = new CustomEvent("scrollspy-activate", {
      bubbles: true,
      cancelable: true,
      detail: { index: i },
    });
    console.log("is block", this._block);
    if (!this._block) {
      this._scrollElement.dispatchEvent(activateEvent);
    }
  }
}

export default ScrollSpy;
