<script>
  import {createEventDispatcher} from "svelte";
  import {onMount} from "svelte";
  import cloneDeep from "lodash/cloneDeep";
  import throttle from "lodash/throttle";
  import CustomDropdown from "../components/CustomDropdown.svelte";
  import DropdownLinkList from "../components/DropdownLinkList.svelte";

  export let menulist = [{index: 0}];
  export let className = '';
  export let currentMenuIndex = menulist[0].index;
  export let pos;

  export let bigPadding = false;

  let moreDropdownVisible = false;
  let moreDropdownElement;
  let moreDropdownButton;

  let selectedItem = "Еще"

  let buttons;
  let buttonsWidth;
  let maxWidth;
  let menuRef;
  let oldWidth;
  let buttonsLength;
  let dropDownList = [];
  let dropDownListRevers = [];
  let count = 0;
  let buttonDropMoreCategories = 0;
  const dispatch = createEventDispatcher();


  function changeText() {
    selectedItem = item.name;
  }
  function checkSizeMinus() {
    maxWidth = document.getElementById('navTabbar').offsetWidth
    buttonsWidth = document.getElementById('ulTabbar').offsetWidth
    if (dropDownListRevers.length == 0) {
      if (maxWidth < buttonsWidth + 88) {
        count = count + 1;
        buttons[buttonsLength - count].style.display = "none";
        dropDownList.push(menulist[buttonsLength - count])
        buttonDropMoreCategories = 81
        dropDownListRevers = dropDownList
        checkSizeMinus()
      }
    }
    if (dropDownListRevers.length != 0){
      if (maxWidth < buttonsWidth + buttonDropMoreCategories + 88) {
        count = count + 1;
        buttons[buttonsLength - count].style.display = "none";
        dropDownList.push(menulist[buttonsLength - count])
        checkSizeMinus()
      } else {
        return;
      }
    }
  }
  function checkSizePlus() {
    if(count != 0) {
      buttonDropMoreCategories = document.getElementById('buttonDropMoreCategories').offsetWidth
      maxWidth = document.getElementById('navTabbar').offsetWidth
      buttonsWidth = document.getElementById('ulTabbar').offsetWidth
      if (maxWidth > buttonsWidth + buttonDropMoreCategories + 250 ) {
        buttons[buttonsLength - count].style.display = "block";
        count = count - 1
        dropDownList.shift()
        checkSizePlus()
      } else {
        return;
      }
    }
  }

function resizeWindow() {
  console.log('checking resize');
  buttons =  document.getElementById('ulTabbar').childNodes
  buttonsLength = buttons.length;
  if (oldWidth < document.getElementById('navTabbar').offsetWidth) {
    checkSizePlus();
    oldWidth = document.getElementById('navTabbar').offsetWidth
  }
  if (oldWidth > document.getElementById('navTabbar').offsetWidth){
    checkSizeMinus();
    oldWidth = document.getElementById('navTabbar').offsetWidth
  }
  dropDownListRevers = dropDownList.reverse()
}

  onMount(async() => {
    buttons =  document.getElementById('ulTabbar').childNodes
    buttonsLength = buttons.length;
    oldWidth = document.getElementById('navTabbar').offsetWidth

    checkSizeMinus();
    dropDownListRevers = dropDownList.reverse()
  })

  const throttledResize = throttle(resizeWindow, 25);

  function showMoreNav() {
    moreDropdownVisible = !moreDropdownVisible;
  }

  function handleClick(e) {
    currentMenuIndex = parseInt(e.target.dataset.index);
    if (currentMenuIndex === 1) {
      menuRef.scrollLeft = 0;
    }
    if (currentMenuIndex === 2) {
      menuRef.scrollLeft = menuRef.scrollWidth;
    }
    dispatch("change", {
      header: currentMenuIndex
    });
  }



  $: if(currentMenuIndex) {
    if(currentMenuIndex < document.getElementById('ulTabbar').childNodes.length - count) {
      selectedItem = "Еще"
    } else {
      selectedItem = menulist[currentMenuIndex].name
      }
    setTimeout(()=>{
      let dropdownWidth = 0;
      if (document.getElementById('buttonDropMoreCategories')) {
        dropdownWidth = document.getElementById('buttonDropMoreCategories').offsetWidth;
      }
      if (document.getElementById('navTabbar').offsetWidth < document.getElementById('ulTabbar').offsetWidth + dropdownWidth + 88) {
        count = count + 1;
        buttons[buttonsLength - count].style.display = "none";
        dropDownList.unshift(menulist[buttonsLength - count])
        }
      checkSizePlus()
      if (document.getElementById('navTabbar').offsetWidth < document.getElementById('ulTabbar').offsetWidth + dropdownWidth + 88) {
        count = count + 1;
        buttons[buttonsLength - count].style.display = "none";
        dropDownList.unshift(menulist[buttonsLength - count])
      }
    }, 1)
  }

  $: if(currentMenuIndex == 0) {
    selectedItem = "Еще"
    setTimeout(()=>{
      checkSizePlus()
    }, 1)
  }

</script>

<style>
  nav {
    height: auto;
    @apply px-80;
    border-radius: 4px 4px 0 0;
    width: 100%;
    overflow: hidden;
  }

  li {
    height: 63px;
    box-sizing: border-box;
  }
  #ulTabbar {
    margin-left: -16px;
  }
  @media (max-width: 1300px) {
    nav {
      @apply px-44;
      }
  }

  @media (min-width: 1301px) {
    li button {
      @apply px-16;
    }
    #ulTabbar {
      margin-left: -14px;
    }
  }

  .dropDown{
    width: 100%;
    max-height:300px;
  }
  .dropDown li {
    height: auto;
  }
  .dropDown li:last-child a {
    border-bottom-color: transparent;
  }
  .buttonDrop {
    height: 63px;
  }
  .shadow-popup li {
    height: auto;
  }
  #buttonDropMoreCategories:hover div {
    background: var(--gray-300);
  }
  #buttonDropMoreCategories img {
    transition: transform 0.2s linear;
  }
  #buttonDropMoreCategories img.rotated {
    transform: rotate(-180deg);
    transform-origin: center;
  }
  .bigPadding {
    @apply px-80;
  }

</style>
<svelte:window on:resize={throttledResize} />
<nav style={pos} class="{className} z-20 border-t border-right-left-clr bg-white flex justify-between border-bottom-clr border-b border-r border-l justify-between " id="navTabbar" class:bigPadding>
  <ul id="ulTabbar" class="flex h-full" bind:this={menuRef} style="scroll-behavior: smooth;">
    {#each menulist as menu, i}
      <li class="horrizontalItem h-full flex items-center border-b-4 {currentMenuIndex === menu.index ? 'border-accent' : 'border-transparent'}">
        <button data-index={i} on:click={handleClick} class="px-14 h-full whitespace-nowrap text-main {currentMenuIndex === menu.index ? 'font-semibold' : 'font-normal'}">
          {menu.name}
        </button>
      </li>
    {/each}
  </ul>
  {#if count != 0}
    <div class="inline-flex items-center h-full forDrop">
      <button id="buttonDropMoreCategories"
              bind:this={moreDropdownButton}
              on:click={showMoreNav}
              class="h-full flex items-center border-b-4 {selectedItem != 'Еще' ? 'border-accent' : 'border-transparent'} buttonDrop">
        <div class="flex items-center {moreDropdownVisible ? 'bg-gray-300' : ''} px-16 leading-12 whitespace-nowrap rounded-full text-main">
          <span class="items-center mr-8 h-full whitespace-nowrap text-main block {selectedItem != 'Еще' ? 'font-semibold' : 'font-normal'}">{selectedItem}</span>
          <img class="w-full h-full items-center pr-4" class:rotated="{moreDropdownVisible}"
               bind:this={moreDropdownElement}
               src="arrow_down.svg" alt="arrow_icon">
        </div>
      </button>
    </div>
    {#if moreDropdownVisible}
      <CustomDropdown
              bind:dropdownVisible={moreDropdownVisible}
              css="width:400px;"
              buttonRef={moreDropdownButton}
              relativeElement={moreDropdownButton}
              position="RIGHT">
        <div class="bg-white rounded">
          <div class="custom-scrollbar overflow-y-auto rounded py-16 bg-white z-10 dropDown">
            <ul class="w-full">
              {#each dropDownList as menu, i}
                <li class="hover:bg-gray-200 w-full pl-40 cursor-pointer text-black">
                  <a      data-index={menu.index}
                          on:click={handleClick}
                          class="w-full block text-left border-gray-200 hover:border-b-transparent border-b py-12">
                          {menu.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </CustomDropdown>
    {/if}
  {/if}
</nav>
