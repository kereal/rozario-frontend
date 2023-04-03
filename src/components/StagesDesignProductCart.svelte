<h2 class="section__name">Этапы оформления букета</h2>
<div class="afterOrder__stages flex">
  <div class="afterOrder__stage">
    <div class="afterOrder__stage_icon">
      <img src="/flower1.png" alt="flower1" />
    </div>
    <div class="flex ">
      <h3 class="afterOrder__stage_text">Выберите цветок</h3>
      <svg
        class="afterOrder__stage_arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="20px"
        height="10px"
      >
        <path
          d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"
        />
      </svg>
    </div>
  </div>
  <div class="afterOrder__stage">
    <div class="afterOrder__stage_icon">
      <img src="/flower2.png" alt="flower2" />
    </div>
    <div class="flex ">
      <h3 class="afterOrder__stage_text">Выберите высоту цветов</h3>
      <svg
        class="afterOrder__stage_arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="20px"
        height="10px"
      >
        <path
          d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"
        />
      </svg>
    </div>
  </div>
  <div class="afterOrder__stage">
    <div class="afterOrder__stage_icon">
      <img src="/flower3.png" alt="flower3" />
    </div>
    <div class="flex ">
      <h3 class="afterOrder__stage_text">Выберите количество</h3>
      <svg
        class="afterOrder__stage_arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="20px"
        height="10px"
      >
        <path
          d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"
        />
      </svg>
    </div>
  </div>
  <div class="afterOrder__stage">
    <div class="afterOrder__stage_icon">
      <picture>
        <img src="/flower4.png" alt="flower4" />
      </picture>
    </div>
    <div class="flex ">
      <h3 class="afterOrder__stage_text">Выберите цвет букета</h3>
      <svg
        class="afterOrder__stage_arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="20px"
        height="10px"
      >
        <path
          d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"
        />
      </svg>
    </div>
  </div>
  <div class="afterOrder__stage">
    <div class="afterOrder__stage_icon">
      <img src="/flower5.png" alt="flower5" />
    </div>
    <div class="flex ">
      <h2 class="afterOrder__stage_text">Выберите упаковку</h2>
      <svg
        class="afterOrder__stage_arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="15px"
        height="10px"
      >
        <path
          d="M12.6 26.3c-.3 0-.6-.1-.8-.3L.3 14.5c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l10.6 10.6L30 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6L13.4 26c-.2.2-.5.3-.8.3z"
        />
      </svg>
    </div>
  </div>
</div>

<style>
  h2 {
    font-size: 22px;
    color: #330033;
    font-weight: bold;
  }
  .afterOrder__stages {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 25px;
  }
  .afterOrder__stage {
    min-height: 147px;
    flex-basis: calc(100% / 5 - 15px);
    background: #ffffff;
    border: 1px solid #e9e9e9;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 13px;
    margin-right: 18px;
    position: relative;
  }
  .afterOrder__stage:last-child {
    margin-right: 0;
  }
  .afterOrder__stage_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 88px;
    background: radial-gradient(
      95.46% 87.62% at 50% 87.62%,
      #ffcccc 0%,
      rgba(239, 210, 210, 0.571429) 42.86%,
      rgba(218, 218, 218, 0) 100%
    );
  }
  .afterOrder__stage_arrow {
    fill: #330033;
    width: 40px;
    height: 20px;
    position: absolute;
    right: 3px;
    bottom: 6px;
  }
  .afterOrder__stage_text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 135%;
    color: var(--color-main);
    padding-left: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-right: 32px;
  }

  @media (max-width: 1250px) {
    .afterOrder__stage {
      flex-basis: calc(100% / 3 - 25px);
    }
    .afterOrder__stage:nth-child(3n) {
      margin-right: 0;
    }
  }
</style>
