<script>
  let signedIn = false

  import Button from "./Button.svelte"
  import PuzzleModal from "./PuzzleModal.svelte"
  import PuzzleModalPhone from "./PuzzleModalPhone.svelte"
  import PuzzleModalPhoneFinal from "./PuzzleModalPhoneFinal.svelte"

  import { onMount } from "svelte"

  let puzzleModalVisible = false
  function togglePuzzleModalVisible() {
    puzzleModalVisible = !puzzleModalVisible
  }

  let puzzleSuccess = false
  let showPuzzleSuccess = false
  let showPuzzleTired = false
  let puzzlePhoneModalVisible = false
  let puzzlePhoneFinalModalVisible = false

  let order = []

  class Puzzle {
    constructor() {
      this.setupPuzzleData()
      this.setupPuzzleParts()
      this.time = 35 * 1000
      this.timer = undefined
      this.timerStarted = false
    }
    startTimer() {
      if (!this.timerStarted) {
        this.timer = setTimeout(() => {
          this.onTimeout()
        }, this.time)
        this.timerStarted = true
      }
    }
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
    onTimeout() {
      this.stopTimer()
      showPuzzleTired = true
    }
    setupPuzzleData() {
      showPuzzleSuccess = false
      showPuzzleTired = false

      order = [...Array(9).keys()]
      this.key = order.join("")
      do {
        order = order.sort(() => Math.random() - 0.5)
        console.log("shuffled")
      } while (this.key === order.join(""))
    }
    checkIfWon() {
      let res = ""
      document
        .querySelectorAll(".puzzle-image")
        .forEach((item) => (res += item.getAttribute("data-i")))
      if (res === this.key) {
        this.showSuccess()
        this.stopTimer()
      }
    }
    showSuccess() {
      puzzleSuccess = true
      const animationTime = 700
      setTimeout(() => {
        showPuzzleSuccess = true
      }, animationTime)
    }
    setupPuzzleParts() {
      this.items = document.querySelectorAll(".puzzle-image-wrapper")
      this.items.forEach((item) => {
        item.addEventListener("dragstart", (e) => this.handleDragStart(e), false)
        item.addEventListener("dragenter", (e) => this.handleDragEnter(e), false)
        item.addEventListener("dragleave", (e) => this.handleDragLeave(e), false)
        item.addEventListener("dragend", (e) => this.handleDragEnd(e), false)
        item.addEventListener("dragover", (e) => this.handleDragOver(e), false)
        item.addEventListener("drop", (e) => this.handleDrop(e), false)
      })
    }
    handleDragStart(e) {
      this.dragSrcEl = e.target

      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text/html", e.target.innerHTML)
    }

    handleDragEnd(e) {
      this.items.forEach(function (target) {
        target.classList.remove("over")
      })
    }

    handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault()
      }

      return false
    }

    handleDragEnter(e) {
      if (e.preventDefault) {
        e.preventDefault()
      }
      e.target.classList.add("over")
    }

    handleDragLeave(e) {
      if (e.preventDefault) {
        e.preventDefault()
      }
      e.target.classList.remove("over")
    }
    handleDrop(e) {
      e.stopPropagation()
      if (this.dragSrcEl !== e.target) {
        this.dragSrcEl.innerHTML = e.target.innerHTML
        e.target.innerHTML = e.dataTransfer.getData("text/html")
        setTimeout(() => {
          this.checkIfWon()
        }, 100)
        this.startTimer()
      }

      return false
    }
  }

  let receivePresent = () => {
    if (signedIn) {
      togglePuzzleModalVisible()
    } else {
      openPuzzlePhoneModal()
    }
  }
  function openPuzzlePhoneModal() {
    puzzlePhoneModalVisible = true
  }
  function closePuzzlePhoneModal(res) {
    puzzlePhoneModalVisible = false
  }
  function openPuzzlePhoneFinalModal() {
    puzzlePhoneFinalModalVisible = true
  }
  function closePuzzleModalPhoneFinal() {
    puzzlePhoneFinalModalVisible = false
    puzzlePhoneModalVisible = false
  }

  onMount(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }

    const images = document.querySelectorAll("img[data-src]")
    const sources = document.querySelectorAll("source[data-srcset]")
    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "IMG") {
            entry.target.src = entry.target.dataset.src
            entry.target.srcset = entry.target.dataset.srcset
            entry.target.removeAttribute("data-src")
            entry.target.removeAttribute("data-srcset")
          } else if (entry.target.tagName === "SOURCE") {
            entry.target.srcset = entry.target.dataset.srcset
            entry.target.removeAttribute("data-srcset")
          }
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    Array.from(images).forEach((image) => observer.observe(image))
    Array.from(sources).forEach((source) => observer.observe(source))

    new Puzzle()

    return () => {
      images.forEach((image) => observer.unobserve(image))
      sources.forEach((source) => observer.unobserve(source))
      observer.disconnect()
    }
  })
</script>

<div class="error-404-wrapper">
  <div class="fox-column">
    <img
      data-src="404/404-fox.png"
      data-srcset="404/404-fox.png,
                404/404-fox.png 1.5x,
                404/404-fox.png 2x,
                404/404-fox.png 3x"
      class="fox-image"
      alt=""
    />
    {#if !showPuzzleSuccess}
      {#if showPuzzleTired}
        <div class="tired">
          <Button on:click={receivePresent}>Утомило. Хочу приз!</Button>
        </div>
      {/if}
    {/if}
  </div>
  <div class="puzzle-column">
    <div class="puzzle-header">Упс, кажется, этой страницы не существует. :)</div>
    <div class="puzzle-message">
      <p>Вы можете вернуться на сайт или сыграть в суперсекретную игру!</p>
      <p>Перемещай кусочки пазла, собери картинку и получи приз!</p>
    </div>

    <div class="puzzle-table" class:success={puzzleSuccess}>
      <div class="puzzle">
        <div class="puzzle-row">
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[0]}>
                <img
                  data-src="404/puzzle{order[0] + 1}.png"
                  data-srcset="404/puzzle{order[0] + 1}.png,
                                                                                            404/puzzle{order[0] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[0] +
                    1}.png 2x,
                                                                                            404/puzzle{order[0] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[1]}>
                <img
                  data-src="404/puzzle{order[1] + 1}.png"
                  data-srcset="404/puzzle{order[1] + 1}.png,
                                                                                            404/puzzle{order[1] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[1] +
                    1}.png 2x,
                                                                                            404/puzzle{order[1] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[2]}>
                <img
                  data-src="404/puzzle{order[2] + 1}.png"
                  data-srcset="404/puzzle{order[2] + 1}.png,
                                                                                            404/puzzle{order[2] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[2] +
                    1}.png 2x,
                                                                                            404/puzzle{order[2] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="puzzle-row">
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[3]}>
                <img
                  data-src="404/puzzle{order[3] + 1}.png"
                  data-srcset="404/puzzle{order[3] + 1}.png,
                                                                                            404/puzzle{order[3] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[3] +
                    1}.png 2x,
                                                                                            404/puzzle{order[3] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[4]}>
                <img
                  data-src="404/puzzle{order[4] + 1}.png"
                  data-srcset="404/puzzle{order[4] + 1}.png,
                                                                                            404/puzzle{order[4] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[4] +
                    1}.png 2x,
                                                                                            404/puzzle{order[4] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[5]}>
                <img
                  data-src="404/puzzle{order[5] + 1}.png"
                  data-srcset="404/puzzle{order[5] + 1}.png,
                                                                                            404/puzzle{order[5] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[5] +
                    1}.png 2x,
                                                                                            404/puzzle{order[5] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="puzzle-row">
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[6]}>
                <img
                  data-src="404/puzzle{order[6] + 1}.png"
                  data-srcset="404/puzzle{order[6] + 1}.png,
                                                                                            404/puzzle{order[6] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[6] +
                    1}.png 2x,
                                                                                            404/puzzle{order[6] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[7]}>
                <img
                  data-src="404/puzzle{order[7] + 1}.png"
                  data-srcset="404/puzzle{order[7] + 1}.png,
                                                                                            404/puzzle{order[7] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[7] +
                    1}.png 2x,
                                                                                            404/puzzle{order[7] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="puzzle-cell">
            <div class="puzzle-image-wrapper" draggable="true">
              <div class="puzzle-image" data-i={order[8]}>
                <img
                  data-src="404/puzzle{order[8] + 1}.png"
                  data-srcset="404/puzzle{order[8] + 1}.png,
                                                                                            404/puzzle{order[8] +
                    1}.png 1.5x,
                                                                                            404/puzzle{order[8] +
                    1}.png 2x,
                                                                                            404/puzzle{order[8] +
                    1}.png 3x"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="puzzle-present">
        <img src="/404/404-puzzle.png" alt="" />
        <div class="puzzle-present-inner">
          {#if showPuzzleSuccess}
            <div class="puzzle-present-message">Вы выиграли!</div>
            <Button on:click={receivePresent}>Получить приз</Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
{#if puzzleModalVisible}
  <PuzzleModal on:close={togglePuzzleModalVisible} />
{/if}

{#if puzzlePhoneModalVisible}
  {#if !puzzlePhoneFinalModalVisible}
    <PuzzleModalPhone
      onRes={openPuzzlePhoneFinalModal}
      on:close={closePuzzlePhoneModal}
    />
  {/if}
  {#if puzzlePhoneFinalModalVisible}
    <PuzzleModalPhoneFinal on:close={closePuzzleModalPhoneFinal} />
  {/if}
{/if}

<style>
  p {
    margin: 1em auto;
  }

  .puzzle-message p {
    margin: 9px 0;
  }
  .error-404-wrapper :global(button) {
    font-size: 16px;
    padding: 12px 36px 13px;
    margin-top: 30px;
  }
  .error-404-wrapper .tired {
    margin-top: auto;
  }
  .error-404-wrapper .tired :global(button) {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3px;
  }
  .error-404-wrapper {
    margin: 2px 0 11px;
    background: linear-gradient(
        180deg,
        var(--color-light) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--gray-100);

    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;

    min-height: calc(100vh - 5.5em - 636px);

    padding: 48px 96px 80px 96px;
  }

  .error-404-wrapper .puzzle-present :global(button) {
    margin-top: 0;
  }
  .fox-column {
    flex-grow: 1;
    padding: 3px 0 0 0;
    display: flex;
    flex-direction: column;
  }
  .fox-image {
    width: 100%;
  }
  .puzzle-column {
    margin-left: 150px;
    max-width: 520px;
    min-width: 520px;
  }
  .puzzle-header {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 115%;
    color: var(--color-main);
  }
  .puzzle-message {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 135%;
    color: var(--color-main);
    margin: 24px 0 34px;
  }

  .puzzle {
    width: 100%;
    transition: transform 0.3s ease-out 0.4s;
    padding: 6px;
  }
  .puzzle-table.success .puzzle {
    transform: scale(1.02484472);
  }
  .puzzle-table {
    position: relative;
  }
  .puzzle-present {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    transition: 0.7s ease-in 0.7s;
  }
  .puzzle-present img {
    position: absolute;
  }
  .puzzle-present-inner {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.83) 0%,
      rgba(255, 255, 255, 0) 57.98%
    );
  }
  .puzzle-table.success .puzzle-present {
    opacity: 1;
    z-index: 1;
  }
  .puzzle-present-inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .puzzle-row {
    display: flex;
  }
  .puzzle-cell {
    transition: margin 0.3s ease-in;
    display: flex;
  }
  .puzzle-image-wrapper {
    cursor: grab;
    display: flex;
    width: 100%;
  }
  .puzzle-table:not(.success) :global(.puzzle-image-wrapper:hover),
  .puzzle-table:not(.success) :global(.puzzle-image-wrapper.over) {
    border: 2px solid var(--color-info);
    overflow: hidden;
  }
  .puzzle-table:not(.success) :global(.puzzle-image-wrapper:hover .puzzle-image),
  .puzzle-table:not(.success) :global(.puzzle-image-wrapper.over .puzzle-image) {
    margin: -2px;
  }

  .puzzle-cell:first-child {
    margin-right: 3px;
  }
  .puzzle-cell:nth-child(2) {
    margin: 0 3px;
  }
  .puzzle-cell:last-child {
    margin-left: 3px;
  }
  .puzzle-row:first-child .puzzle-cell {
    margin-bottom: 3px;
  }
  .puzzle-row:nth-child(2) .puzzle-cell {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .puzzle-row:last-child .puzzle-cell {
    margin-top: 3px;
  }
  .puzzle-table {
    max-width: 495px;
    min-width: 495px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .puzzle-table.success .puzzle-row:last-child .puzzle-cell,
  .puzzle-table.success .puzzle-row:nth-child(2) .puzzle-cell,
  .puzzle-table.success .puzzle-row:first-child .puzzle-cell,
  .puzzle-table.success .puzzle-row .puzzle-cell {
    margin: 0;
  }
  .puzzle-cell {
    flex-grow: 1;
    max-width: 161px;
    display: flex;
    width: 100%;
  }
  .puzzle-image {
    pointer-events: none;
    flex-grow: 1;
    display: flex;
  }
  .puzzle-image img {
    pointer-events: none;
    width: 100%;
  }

  .puzzle-present-message {
    padding-top: 68px;
    padding-bottom: 24px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 135%;
    color: var(--color-main);
  }

  @media screen and (max-width: 1300px) {
    .error-404-wrapper {
      padding: 34px 80px 68px;
    }
    .error-404-wrapper :global(button) {
      margin-top: 24px;
      padding: 12px 0 12px;
      width: 100%;
      max-width: 224px;
    }
    .fox-column {
      padding-top: 53px;
      max-width: 458px;
    }
    .fox-image {
    }
    .puzzle-column {
      margin-left: 96px;
      max-width: 487px;
      min-width: unset;
    }

    .puzzle-present-message {
      padding-top: 60px;
      padding-bottom: 24px;
    }
    .puzzle-header {
    }
    .puzzle-message {
      font-size: 15px;
      margin: 18px 0 32px;
    }

    .puzzle {
    }
    .puzzle-table.success .puzzle {
      transform: scale(1.02666667);
    }
    .puzzle-table {
      max-width: 462px;
      min-width: 368px;
    }

    .puzzle-row {
    }

    .error-404-wrapper :global(button) {
      font-size: 15px;
    }
    .puzzle-present-message {
      font-size: 42px;
    }
  }
  @media screen and (max-width: 1000px) {
    .error-404-wrapper .tired :global(button) {
      margin-bottom: 2px;
    }
    .fox-column {
      padding-top: 76px;
    }
    .fox-image {
    }
    .puzzle-column {
      margin-left: 80px;
      min-width: 368px;
    }
    .puzzle-message p {
      margin: 8px 0;
    }

    .puzzle {
      padding: 4px;
    }
    .puzzle-present-message {
      padding-top: 60px;
      padding-bottom: 24px;
    }
    .puzzle-table.success .puzzle {
      transform: scale(1.02222222);
    }
    .puzzle-table {
      width: 368px;
      height: 368px;
    }

    .puzzle-cell:first-child {
      margin-right: 2px;
    }
    .puzzle-cell:nth-child(2) {
      margin: 0 2px;
    }
    .puzzle-cell:last-child {
      margin-left: 2px;
    }
    .puzzle-row:first-child .puzzle-cell {
      margin-bottom: 2px;
    }
    .puzzle-row:nth-child(2) .puzzle-cell {
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .puzzle-row:last-child .puzzle-cell {
      margin-top: 2px;
    }

    .puzzle-row {
    }
    .puzzle-cell {
      width: 120px;
      height: 120px;
    }

    .puzzle-present-message {
      font-size: 36px;
    }
  }
</style>
