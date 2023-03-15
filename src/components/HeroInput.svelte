<script>
  import { onMount } from "svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import HeroInputIconButtonWrapper from "./HeroInputIconButtonWrapper.svelte";
  import ItemList from "./ItemList.svelte";
  import { Machine, interpret } from "xstate";
  import { HERO_INPUT_STATES } from "../data/constants.js";

  export let occasionList;
  export let personList;
  export let flowerList;

  const filter = {
    occasion: { text: "", path: "" },
    flower: { text: "", path: "" },
    person: { text: "", path: "" }
  };

  let filteredLink = "/";
  const svgSize = 20;
  let finalDropdownButton;
  let heroInputContainer;
  let personDropdownVisible = false;
  let personDropdownIcon;
  let personDropdownButton;
  let occasionDropdownVisible = false;
  let occasionDropdownIcon;
  let occasionDropdownButton;
  let flowerDropdownVisible = false;
  let flowerDropdownIcon;
  let flowerDropdownButton;

  function filterLink() {
    let path = "/";
    let query = "";
    if (filter.flower.path) {
      path = `bouquet/${filter.flower.path}`;
      if (filter.occasion.path) {
        path = `bouquet/${filter.flower.path}/${filter.occasion.path}`;
        if (filter.person.path) {
          path = `bouquet/${filter.flower.path}/${filter.occasion.path}/${filter.person.path}`;
        }
      } else if (filter.person.path) {
        path = `bouquet/${filter.flower.path}/${filter.person.path}`;
      }
    } else if (filter.occasion.path) {
      path = `bouquet/${filter.occasion.path}`;
      if (filter.person.path) {
        path = `bouquet/${filter.occasion.path}/${filter.person.path}`;
      }
    } else {
      path = `bouquet/${filter.person.path}`;
    }
    const url = new URL(path + query, window.location.href);
    return url;
  }

  const heroInputMachine = Machine(
    {
      id: "heroInput",
      initial: "occasion",
      states: {
        occasion: {
          exit: "closeOccasionDropdown",
          on: {
            COMPLETE: [
              {
                target: "person",
                cond: "ifPerson",
                actions: "occasion"
              },
              {
                target: "flower",
                cond: "ifFlower",
                actions: "occasion"
              },
              {
                target: "end",
                cond: "ifEnd",
                actions: "occasion"
              }
            ],
            TO_PERSON: {
              target: "person"
            },
            TO_FLOWER: {
              target: "flower"
            }
          }
        },
        person: {
          exit: "closePersonDropdown",
          on: {
            COMPLETE: [
              {
                target: "flower",
                cond: "ifFlower",
                actions: "person"
              },
              {
                target: "occasion",
                cond: "ifOccasion",
                actions: "person"
              },
              {
                target: "end",
                cond: "ifEnd",
                actions: "person"
              }
            ],
            TO_OCCASION: {
              target: "occasion"
            },
            TO_FLOWER: {
              target: "flower"
            }
          }
        },
        flower: {
          exit: "closeFlowerDropdown",
          on: {
            COMPLETE: [
              {
                target: "end",
                actions: "flower"
              }
            ],
            TO_PERSON: {
              target: "person"
            },
            TO_OCCASION: {
              target: "occasion"
            },
            RESET: {
              target: "occasion",
              actions: "reset"
            }
          }
        },
        end: {
          on: {
            COMPLETE: {
              target: "final"
            },
            RESET: {
              target: "occasion",
              actions: "reset"
            },
            TO_PERSON: "person",
            TO_OCCASION: "occasion",
            TO_FLOWER: "flower"
          }
        },
        final: {
          type: "final"
        }
      }
    },
    {
      actions: {
        person: (context, event) => {
          filter.person = event.person;
          filteredLink = filterLink();
        },
        occasion: (context, event) => {
          console.log(event);
          filter.occasion = event.occasion;
          filteredLink = filterLink();
        },
        flower: (context, event) => {
          filter.flower = event.flower;
          filteredLink = filterLink();
        },
        reset: () => {
          filter.occasion = { text: "", path: "" };
          filter.flower = { text: "", path: "" };
          filter.person = { text: "", path: "" };
          filteredLink = "";
          personList = personList.map(item => {
            item.checked = false;
            return item;
          });
          flowerList = flowerList.map(item => {
            item.checked = false;
            return item;
          });
          occasionList = occasionList.map(item => {
            item.checked = false;
            return item;
          });
        },
        closePersonDropdown: () => {
          closePersonDropdown();
        },
        closeOccasionDropdown: () => {
          closeOccasionDropdown();
        },
        closeFlowerDropdown: () => {
          closeFlowerDropdown();
        }
      },
      guards: {
        ifPerson: () => {
          return !filter.person.text;
        },
        ifOccasion: () => {
          return !filter.occasion.text;
        },
        ifFlower: () => {
          return !filter.flower.text;
        },
        ifEnd: () => {
          if (currentState === "occasion") {
            return (
              filter.flower.text && filter.person.text
            );
          } else if (currentState === "person") {
            return (
              filter.occasion.text &&
              filter.flower.text
            );
          } else {
            return (
              filter.occasion.text &&
              filter.person.text &&
              filter.flower.text
            );
          }
        }
      }
    }
  );

  function openPersonDropdown() {
    personDropdownVisible = true;
  }
  function closePersonDropdown() {
    personDropdownVisible = false;
  }
  function togglePersonDropdown() {
    if (personDropdownVisible) {
      closePersonDropdown();
    } else {
      openPersonDropdown();
    }
  }
  function openOccasionDropdown() {
    occasionDropdownVisible = true;
  }
  function closeOccasionDropdown() {
    occasionDropdownVisible = false;
  }
  function toggleOccasionDropdown() {
    if (occasionDropdownVisible) {
      closeOccasionDropdown();
    } else {
      openOccasionDropdown();
    }
  }
  function openFlowerDropdown() {
    flowerDropdownVisible = true;
  }
  function closeFlowerDropdown() {
    flowerDropdownVisible = false;
  }
  function toggleFlowerDropdown() {
    if (flowerDropdownVisible) {
      closeFlowerDropdown();
    } else {
      openFlowerDropdown();
    }
  }

  let currentState = heroInputMachine.initialState.value;
  let heroInputService;

  onMount(async () => {
    heroInputService = interpret(heroInputMachine).start();
    heroInputService.subscribe(state => {
      if (state.changed) {
        currentState = state.value;
        // console.log("currentState", currentState);
        switch (currentState) {
          case "occasion":
            window.requestAnimationFrame(() => openOccasionDropdown());
            break;
          case "person":
            window.requestAnimationFrame(() => openPersonDropdown());
            break;
          case "flower":
            window.requestAnimationFrame(() => openFlowerDropdown());
            break;
          // case "dropdown":
          //   window.requestAnimationFrame(() => openFinalDropdown());
          //   break;
          default:
            console.log("default");
        }
      }
    });
  });

  function selectPerson(e) {
    heroInputService.send("COMPLETE", {
      person: e.detail.data.find(item => item.checked)
    });
  }
  function selectOccasion(e) {
    heroInputService.send("COMPLETE", {
      occasion: e.detail.data.find(item => item.checked)
    });
  }
  function selectFlower(e) {
    heroInputService.send("COMPLETE", {
      flower: e.detail.data.find(item => item.checked)
    });
  }
  function finish() {
    heroInputService.send("COMPLETE");
  }
  function gotoPerson() {
    if (currentState !== "person") heroInputService.send("TO_PERSON");
  }
  function gotoOccasion() {
    if (currentState !== "occasion") heroInputService.send("TO_OCCASION");
  }
  function gotoFlower() {
    if (currentState !== "flower") heroInputService.send("TO_FLOWER");
  }
  function clearAllInputs() {
    heroInputService.send("RESET");
  }
</script>

<style lang="postcss">
  .hero-input-container {
    width: 100%;
  }
  .text {
    @apply text-gray-700 text-base leading-relaxed truncate mr-8;
  }
  @media (min-width: 1420px) {
    .text {
      @apply text-lg;
    }
  }
</style>

<div class="hero-input-container relative h-56 flex items-center">
  <div
    bind:this={heroInputContainer}
    style="min-width: 70%"
    class="bg-white flex items-center relative h-full rounded-l justify-between">
    <div class="flex items-center w-full bg-white py-8 h-full rounded-l">

      {#if currentState === 'occasion'}
        <HeroInputIconButtonWrapper
          id="hero-input-occasion-icon-text"
          name={HERO_INPUT_STATES.OCCASION}
          {currentState}
          {filter}
          on:click={gotoOccasion} />
      {:else if currentState === 'person'}
        <HeroInputIconButtonWrapper
          name={HERO_INPUT_STATES.OCCASION}
          id="hero-input-occasion-icon-text"
          {currentState}
          {filter}
          on:click={gotoOccasion} />
        <HeroInputIconButtonWrapper
          id="hero-input-person-icon-text"
          name={HERO_INPUT_STATES.PERSON}
          {currentState}
          {filter}
          on:click={gotoPerson} />
      {:else if currentState === 'flower'}
        <HeroInputIconButtonWrapper
          name={HERO_INPUT_STATES.OCCASION}
          id="hero-input-occasion-icon-text"
          {currentState}
          {filter}
          on:click={gotoOccasion} />
        <HeroInputIconButtonWrapper
          id="hero-input-person-icon-text"
          name={HERO_INPUT_STATES.PERSON}
          {currentState}
          {filter}
          on:click={gotoPerson} />
        <HeroInputIconButtonWrapper
          id="hero-input-flower-icon-text"
          name={HERO_INPUT_STATES.FLOWER}
          {currentState}
          {filter}
          on:click={gotoFlower} />
      {:else if currentState === 'end'}
        <HeroInputIconButtonWrapper
          name={HERO_INPUT_STATES.OCCASION}
          id="hero-input-occasion-icon-text"
          {currentState}
          {filter}
          on:click={gotoOccasion} />
        <HeroInputIconButtonWrapper
          id="hero-input-person-icon-text"
          name={HERO_INPUT_STATES.PERSON}
          {currentState}
          {filter}
          on:click={gotoPerson} />
        <HeroInputIconButtonWrapper
          id="hero-input-flower-icon-text"
          name={HERO_INPUT_STATES.FLOWER}
          {currentState}
          {filter}
          on:click={gotoFlower} />
      {/if}

      {#if currentState === 'occasion'}
        <button
          id="hero-input-occasion-button"
          bind:this={occasionDropdownButton}
          on:click={toggleOccasionDropdown}
          class="pr-8 py-4 flex items-center h-full block">
          <span class="text">
            {filter.occasion.text ? '' : 'Выберите повод'}
          </span>
          <svg
            class="pt-4"
            bind:this={occasionDropdownIcon}
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 32 32"
            xml:space="preserve">
            <polyline
              fill="none"
              stroke="#666666"
              stroke-width="2"
              stroke-miterlimit="10"
              points="26.883,10.56 15.999,21.44 5.117,10.56 " />
          </svg>
        </button>

        {#if occasionDropdownVisible}
          <CustomDropdown
            bind:dropdownVisible={occasionDropdownVisible}
            relativeElement={occasionDropdownIcon}
            buttonRef={occasionDropdownButton}
            css="width:320px; max-height:400px;"
            position="CENTER">
            <ItemList
              buttonRef={occasionDropdownButton}
              id="hero-input-occasion-list"
              css="max-height: 336px;"
              on:click={selectOccasion}
              listData={occasionList} />
          </CustomDropdown>
        {/if}
      {:else if currentState === 'person'}
        <button
          bind:this={personDropdownButton}
          on:click={togglePersonDropdown}
          class="px-8 py-8 flex items-center h-full block">
          <span class="text">{filter.person.text ? '' : 'Выберите кому'}</span>
          <svg
            class="pt-4"
            bind:this={personDropdownIcon}
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 32 32"
            xml:space="preserve">
            <polyline
              fill="none"
              stroke="#666666"
              stroke-width="2"
              stroke-miterlimit="10"
              points="26.883,10.56 15.999,21.44 5.117,10.56 " />
          </svg>
        </button>

        {#if personDropdownVisible}
          <CustomDropdown
            bind:dropdownVisible={personDropdownVisible}
            relativeElement={personDropdownIcon}
            buttonRef={personDropdownButton}
            css="width:320px; max-height:400px;"
            position="CENTER">
            <ItemList
              id="hero-input-person-list"
              buttonRef={personDropdownButton}
              css="max-height: 336px;"
              on:click={selectPerson}
              listData={personList} />
          </CustomDropdown>
        {/if}
      {:else if currentState === 'flower'}
        <button
          id="hero-input-flower-button"
          bind:this={flowerDropdownButton}
          on:click={toggleFlowerDropdown}
          class="px-8 py-4 flex items-center h-full block">
          <span class="text">
            {filter.flower.text ? '' : 'Выберите тип цветов'}
          </span>
          <svg
            class="pt-1"
            bind:this={flowerDropdownIcon}
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 32 32"
            xml:space="preserve">
            <polyline
              fill="none"
              stroke="#666666"
              stroke-width="2"
              stroke-miterlimit="10"
              points="26.883,10.56 15.999,21.44 5.117,10.56 " />
          </svg>
        </button>

        {#if flowerDropdownVisible}
          <CustomDropdown
            bind:dropdownVisible={flowerDropdownVisible}
            relativeElement={flowerDropdownIcon}
            buttonRef={flowerDropdownButton}
            position="CENTER"
            css="width: 320px; max-height: 400px;">
            <ItemList
              id="hero-input-flower-list"
              buttonRef={flowerDropdownButton}
              css="max-height: 336px;"
              on:click={selectFlower}
              listData={flowerList} />
          </CustomDropdown>
        {/if}
      {/if}

    </div>

    <div class="py-8 flex items-center h-full">
      {#if currentState === 'occasion'}
        <HeroInputIconButtonWrapper
          name={HERO_INPUT_STATES.PERSON}
          id="hero-input-person-icon-gray"
          {currentState}
          {filter}
          on:click={gotoPerson}
          right={true} />
        <HeroInputIconButtonWrapper
          id="hero-input-flower-icon-gray"
          name={HERO_INPUT_STATES.FLOWER}
          {currentState}
          {filter}
          on:click={gotoFlower}
          right={true} />
      {:else if currentState === 'person'}
        <HeroInputIconButtonWrapper
          id="hero-input-flower-icon-gray"
          name={HERO_INPUT_STATES.FLOWER}
          {currentState}
          {filter}
          on:click={gotoFlower}
          right={true} />
      {:else if currentState === 'end' || currentState === 'flower'}
        <button
          bind:this={finalDropdownButton}
          on:click={clearAllInputs}
          class="bg-white w-5 h-5 h-full mx-16">
          <img style="width: 18px;height:18px;" src="close.svg" alt="close" />
        </button>
      {/if}
    </div>

  </div>
  <a
    href={filteredLink.href}
    class="inline-block font-bold flex items-center justify-center leading-none
    h-full bg-accent text-main px-24 rounded-r">
    Подобрать букет
  </a>
</div>
