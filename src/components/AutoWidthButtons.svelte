<script>
  import { onMount } from "svelte"
  import { fly, fade } from "svelte/transition"
  import { beforeUpdate, afterUpdate } from "svelte"
  import throttle from "lodash/throttle"
  import CustomDropdown from "../components/CustomDropdown.svelte"

  export let list = []
  export let group
  export let value
  export let buttonElement
  export let selectedText
  export let selectedButton

  let moreDropdownElement
  let moreDropdownButton
  let button
  let widthDropDown
  let moreButton = []
  let visible = false
  let buttons
  let widthButton = 0
  let widthBox = 0
  let normalWidth = false
  let once = true
  let width
  let oldWidth
  let count = 0
  let buttonsLength
  let dropDownListRevers

  function resizeMinus() {
    if (moreButton.length == 0) {
      if (
        document.getElementById(group + "Line").offsetWidth >
        document.getElementById(group).offsetWidth
      ) {
        count = count + 1
        buttons[buttonsLength - count].style.display = "none"
        moreButton.push(list[buttonsLength - count])
        resizeMinus()
      } else {
        return
      }
    }
    if (moreButton.length != 0) {
      if (
        document.getElementById(group + "Line").offsetWidth + 110 >
        document.getElementById(group).offsetWidth
      ) {
        count = count + 1
        buttons[buttonsLength - count].style.display = "none"
        moreButton.push(list[buttonsLength - count])
        resizeMinus()
      } else {
        return
      }
    }
  }

  function resizePlus() {
    if (
      document.getElementById(group + "Line").offsetWidth <
      document.getElementById(group).offsetWidth + 150
    ) {
      buttons[buttonsLength - count].style.display = "block"
      count = count - 1
      moreButton.pop()
      resizeMinus()
    } else {
      return
    }
  }

  function resizeWindow() {
    if (oldWidth < document.getElementById(group).offsetWidth) {
      resizePlus()
      oldWidth = document.getElementById(group).offsetWidth
    }
    if (oldWidth > document.getElementById(group).offsetWidth) {
      resizeMinus()
      oldWidth = document.getElementById(group).offsetWidth
    }
  }

  onMount(async () => {
    oldWidth = document.getElementById(group).offsetWidth
    buttons = document.getElementById(group + "Line").childNodes
    buttonsLength = buttons.length
    resizeMinus()
    //  resizePlus()
  })

  const throttledResize = throttle(resizeWindow, 25)
</script>

<svelte:window on:resize={throttledResize} />
<svelte:body
  on:click={(e) => {
    if (buttonElement.contains(e.target)) {
      return
    } else {
      visible = false
    }
  }}
/>

<div class="box flex justify-between" id={group}>
  <div class="line flex" id="{group}Line">
    {#each list as item, i}
      <div class="OutLineRadio {button}">
        <input
          bind:group
          class="visuallyhidden"
          type="radio"
          value={item.name}
          name={group}
          id={item.id}
        />
        <label
          class="cursor-pointer flex items-center rounded leading-snug border border-gray-500 hover:text-main hover:border-gray-700 bg-white"
          for={item.id}
          on:click={() => {
            if (selectedButton == true) {
              selectedButton = !selectedButton
            }
            selectedText = "Еще"
            resizePlus()
          }}
        >
          {item.name}
        </label>
      </div>
    {/each}
  </div>
  {#if count != 0}
    <div class="drop" id="{group}Drop">
      <div class="OutLineRadio">
        <div class="dropButton rounded relative inline-block hover:text-main">
          <button
            bind:this={buttonElement}
            class="text-gray-600 rounded border hover:border-gray-700 h-full hover:text-main w-full flex items-baseline justify-between px-12 border-gray-500
{selectedText != 'Еще' ? 'border-info  text-main font-semibold' : ''}"
            on:click={() => {
              visible = !visible
            }}
            type="button"
          >
            <span class="mr-8 ">{selectedText}</span>
            <svg
              class="stroke-current mt-2"
              width="12"
              height="8"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class:rotated={visible}
            >
              <path
                d="M1 1L6 6L11 1"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {#if visible}
            <CustomDropdown
              bind:dropdownVisible={visible}
              css="width: 180px;"
              buttonRef={buttonElement}
              relativeElement={buttonElement}
              position="RIGHT"
            >
              <div class="bg-white rounded">
                <div
                  class="custom-scrollbar overflow-y-auto rounded py-16 bg-white z-10 dropDown"
                >
                  <ul class="w-full">
                    {#each moreButton as item, i}
                      <li
                        class="hover:bg-gray-200 w-full cursor-pointer text-main dropLi"
                      >
                        <input
                          bind:group
                          type="radio"
                          class="visuallyhidden"
                          value={item.name}
                          name={group}
                          id={item.id}
                        />
                        <label
                          on:click={() => {
                            selectedText = item.name
                            group = item.name
                            if (selectedButton != true) {
                              selectedButton = !selectedButton
                            }
                            if (
                              document.getElementById(group + "Line").offsetWidth + 150 >
                              document.getElementById(group).offsetWidth
                            ) {
                              count = count + 1
                              buttons[buttonsLength - count].style.display = "none"
                              moreButton.push(list[buttonsLength - count])
                              resizeMinus()
                            } else {
                              return
                            }
                            resizeWindow()
                          }}
                          class="px-12 h-full cursor-pointer w-full inline-flex items-center"
                          for={item.id}
                        >
                          <span>{item.name}</span>
                        </label>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </CustomDropdown>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .visible {
    display: block;
  }
  .OutLineRadio {
    margin-right: 16px;
  }

  .OutLineRadio button {
    align-items: center;
  }
  .OutLineRadio input:checked + label {
    @apply border-info text-main;
    font-weight: 600;
  }
  .OutLineRadio label {
    color: var(--gray-600);
    height: 35px;
    display: block;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
    display: flex;
    items-align: center;
    justify-content: center;
  }
  .OutLineRadio label:hover {
    color: var(--color-main);
  }
  .OutLineRadio .unused {
    height: 35px;
    display: block;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 1px;
    background: #f6f6f6;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--gray-700);
  }
  .dropButton {
    width: auto;
    height: 35px;
    margin-right: -16px;
  }
  .dropButton span {
    white-space: nowrap;
  }
  .selectLi {
    min-height: 35px;
    height: 34px;
  }
  .selectUl {
    top: 35px;
    left: 0;
    z-index: 11;
    @apply absolute;
  }

  .dropLi {
    height: 45px;
    text-align: center;
  }
  .dropLi span {
    margin: 0 auto;
  }

  svg {
    transition: transform 0.2s linear;
  }
  .rotated {
    transform: rotate(-180deg);
    transform-origin: center;
  }
</style>
