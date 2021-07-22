<script>
  import {onMount, setContext} from "svelte";
  import CustomCheckbox from "./CustomCheckbox.svelte";
  import TextArea from "./TextArea.svelte";
  import Button from "./Button.svelte";
  import HelpButton from "./HelpButton.svelte";
  import OutlineRadio from "./OutlineRadio.svelte";
  import PostCardModal from "./PostCardModal.svelte";
  import AutoWidthButtons from "./AutoWidthButtons.svelte";
  let postCardModalVisible = false;

  function togglepostCardModalVisible() {
    postCardModalVisible = !postCardModalVisible;
  }
  const postCardList = [
    { text: "День рождения", name: "birthday", postcardtext: "С днём рождения, счастья, здоровья!" },
    { text: "Юбилей", name: "anniversary", postcardtext: "text" },
    { text: "Свадьба", name: "wedding", postcardtext: "text" },
    { text: "Новый год", name: "new_year", postcardtext: "text" },
    { text: "Рождение ребёнка", name: "baby_birth", postcardtext: "text" },
    { text: "14 февраля", name: "14feb", postcardtext: "text" },
    { text: "23 февраля", name: "23feb", postcardtext: "text" },
    { text: "8 марта", name: "8mar", postcardtext: "text" },
    { text: "9 мая", name: "8may", postcardtext: "text" },
    { text: "Выпускной", name: "graduation", postcardtext: "text" },
    { text: "1 сентября", name: "1sep", postcardtext: "text" },
    { text: "День учителя", name: "teacher_day", postcardtext: "text" },
    { text: "Люблю", name: "i_love_you", postcardtext: "text" },
    { text: "Прости", name: "sorry", postcardtext: "text" },
    { text: "Выздоравливай", name: "recover", postcardtext: "text" },
    { text: "Другое", name: "other", postcardtext: "text" }
  ];
  let congratulations = {
    'Без открытки':'',
    'Юбилей': {
      text: 'Текст для "Юбилей"',
      UserText: 'Текст для "Юбилей"',
      intermediate: 'Текст для "Юбилей"',
      storage: [],
      count: 0
    },
    'День рождения': {
      text: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
              ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
              'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
              'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
      UserText: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
              ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
              'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
              'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
      intermediate: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
              ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
              'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
              'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
      storage: [],
      count: 0
    },

    'Поздравление': {
      text: 'Текст для "Поздравление"',
      UserText: 'Текст для "Поздравление"',
      intermediate: 'Текст "Поздравление"',
      storage: [],
      count: 0
    },
    'Сказать люблю': {
      text: 'Текст для "Сказать люблю"',
      UserText: 'Текст для "Сказать люблю"',
      intermediate: 'Текст для "Сказать люблю"',
      storage: [],
      count: 0
    },
    'Извинение': {
      text: 'Текст для "Извинение"',
      UserText: 'Текст для "Извинение"',
      intermediate: 'Текст для "Извинение"',
      storage: [],
      count: 0
    },
    '8 марта' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    '9 мая' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    'Выпускной' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    '1 сентября' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    'День учителя' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    'Люблю' :{
     text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    'Прости' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },
    'Выздоравливай' :{
            text: '',
      UserText: '',
      intermediate: '',
      storage: [],
      count: 0
    },

  }
  export let selectedCongratulation = 'Поздравление'

  const holidays = [
    {
      name: 'Юбилей', id: 'anniversary'
    },
    {
      name: 'Поздравление', id: 'Congratulation'
    },
    {
      name: 'День рождения', id: 'bd'
    },
    {
      name: 'Сказать люблю', id: 'lovetosay'
    }
    ,
    {
      name: 'Извинение', id: 'Apology'
    },
    {name:'8 марта', id:'8mar'},
    {name:'9 мая', id:'8may'},
    {name:'Выпускной', id:'graduation'},
    {name:'1 сентября', id:'1sep'},
    {name:'День учителя', id:'teacher_day'},
    {name:'Люблю', id:'i_love_you'},
    {name:'Прости', id:'sorry'},
    {name:'Выздоравливай', id:'recover'},
  ]

  let addPostCard = false;
  let takePhoto = false;
let once = false
  $: if(selectedCongratulation) {
    if(!once) {
      once = true
    } else {
      togglepostCardModalVisible()
    }
  }
</script>

<style lang="postcss">
  .checkboxes :global(.info-button) {
    @apply w-16 h-16 border rounded-full bg-transparent border-infolight flex items-center justify-center;
  }
  .checkboxes :global(.info-button:hover) {
    @apply bg-infolight border-infolight;
  }
  .checkboxes :global(.info-button:hover svg) {
    @apply text-white;
  }
  .checkboxes {
    max-width: 1060px;
  }
  .margin {
    margin-left: 28px;
  }
  .form-misc-card :global(.textarea-height) {
    height: 56px;
  }
  .form-misc-card :global(.textarea-area) {
    height: 56px;
    width: 440px;
  }
  .textarea-wrapper {
    width: 440px;
  }
  .holidaysButton {
    width: 100%;
  }
  .product__postCartBlock {
    padding: 16px;
    padding-right: 36px;
    margin-top: 12px;
    max-width: 411px;
    transition: all 0.2s ease;
    border-radius: 4px;
  }

  .product__postCartBlock p{
    font-size: 14px;
    line-height: 120%;
    color: var(--gray-600);
  }
  .product__postCartBlock svg{
    display: none;
  }
  .product__postCartBlock:hover {
    cursor:pointer;
    background-color: #fff;
  }
  .product__postCartBlock:hover svg{
    display:block;
    position: absolute;
    right: 8px;
    bottom:12px;
  }
</style>

<div class="bg-cardbg rounded form-misc-card">
  <h2 class="text-main font-semibold pb-24 text-xl leading-tight">
    Дополнительно
  </h2>
  <div class="checkboxes ">
    <div class="flex items-center mb-16">
      <div class="mr-12">
        <CustomCheckbox
          bind:check={addPostCard}
          labelClass="text-one-five leading-mid text-main"
          className="inline-block leading-mid"
          label="Добавить открытку бесплатно"
          id="editmodal-interval-time"
          value="range" />
      </div>
    </div>
    {#if addPostCard}
      <div class="margin mb-30 ">
        <div class="text-sm text-gray-600 leading-mid mb-16">
          Вы можете использовать готовое поздравление или написать своё
        </div>
        <div class="mt-16 holidaysButton">
          <AutoWidthButtons value="День рождения" bind:group={selectedCongratulation} selectedText="Еще" list={holidays} buttonElement=""/>
          <div class="product__postCartBlock relative mb-24" on:click={togglepostCardModalVisible}>
            <p class="break-words">{congratulations[selectedCongratulation].UserText}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
            </svg>
          </div>
          <Button status="active-secondary" size="lg">Добавить ещё одну открытку</Button>
        </div>
      </div>
    {/if}
  </div>
  <div class="checkboxes mb-24 flex items-center">
    <div class="mr-12">
      <CustomCheckbox
        bind:check={takePhoto}
        labelClass="text-one-five leading-mid text-main"
        className="leading-mid"
        id="editmodal-no-time"
        label="Сделать фото в момент вручения"
        value="notime" />
    </div>
    <div class="pt-2 h-full">
      <HelpButton
        css="width: 300px;"
        position="CENTER"
        text="Мы бесплатно сделаем фото получателя с букетом и отправим вам на
        почту." />
    </div>
  </div>
  <div class="textarea-wrapper">
    <label class="inline-block text-ssm leading-tight text-gray-600">
      Комментарий к заказу
    </label>
    <TextArea className="textarea-height" />
  </div>
</div>

{#if postCardModalVisible}
  <PostCardModal bind:value={congratulations[selectedCongratulation].intermediate} bind:texts={congratulations[selectedCongratulation]}   on:close={togglepostCardModalVisible} focused/>
{/if}