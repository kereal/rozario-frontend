<script>
    import CustomDropdown from "./CustomDropdown.svelte";
    import HelpThankyouMessage from "./HelpThankyouMessage.svelte";
    import HelpWhyOtherForm from "./HelpWhyOtherForm.svelte";
    import HelpWhyList from "./HelpWhyList.svelte";
    export let searching = false;
    export let searchTerm = '';
    export let openedQuestion;

    export let qa = {};
    export let questionOpened = function(qa) {};
    export let questionClosed = function() {};
    let question = qa.question;
    let answer = qa.answer;
    let answerVisible;
    let choseYes = false;
    let choseNo = false;
    let showChoseYes = false;
    let showChoseNo = false;
    let sentNo = false;
    let choseOther = false;
    let questionYesButton;
    let questionNoButton;
    let questionHTML;

    $: questionHTML = searching ? question.replace(searchTerm, '<strong>' + searchTerm + '</strong>') : question;
    function sentNoResponse() {
        sentNo = true;
        choseOther = false;
        showChoseNo = false;
    }
    function selectedOtherNo() {
        choseOther = true;
        showChoseNo = false;
    }
    function toggleAnswer() {
        if (!isOpened) {
            questionOpened(qa);
        } else {
            questionClosed();
        }
    }
    function toggleNo() {
        choseYes = false;
        showChoseYes = false;
        choseNo = !choseNo;
        showChoseNo = choseNo;
    }
    function toggleYes() {
        choseNo = false;
        showChoseNo = false;
        choseYes = !choseYes;
        showChoseYes = choseYes;
    }
    $: isOpened = openedQuestion == qa;
</script>
<style>
    .toggler {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        background: none;
        padding: 17px 0 16px;
        cursor: pointer;
        border: none;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: padding .5s;
    }
    @media screen and (max-width: 1300px) {
        .toggler {
            font-size: 15px;
            line-height: 135%;
        }
    }
    .toggler:hover {
        color: var(--color-info);
    }
    .toggler:active {
        color: var(--color-info);
        font-weight: 600;
    }
    .toggler:hover .plus path {
        fill: var(--color-info);
    }
    .question-wrapper {
        border-bottom: 1px solid var(--gray-300);
    }
    .minus {
        display: none;
    }
    .question-wrapper.opened {
        border-bottom: 1px solid var(--gray-600);
        padding-bottom: 18px;
    }
    .question-wrapper.opened .toggler {
        padding-top: 23px;
        padding-bottom: 19px;
    }
    .question-wrapper.opened .plus {
        display: none;
    }
    .question-wrapper.opened .minus {
        display: block;
    }
    .question-wrapper.opened .question {
        color: var(--color-info);
        font-weight: 600;
    }
    .question-wrapper .question :global(strong) {
        position: relative;
        color: var(--color-info);
        font-weight: normal;
        padding: 0 0 3px;
    }
    .question :global(strong)::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        background: var(--color-info);
        opacity: 0.15;
    }
    .answer-wrapper {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--gray-600);
        margin-top: -4px;
        padding-bottom: 23px;
        max-width: 806px;
    }
    .have-found-answer span {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;
        color: var(--color-main);
        margin-right: 11px;
    }

    .have-found-answer button {
        border: 1px solid var(--gray-1100);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 5px 8px 4px 8px;
        color: var(--color-main);
        font-size: 14px;
        font-weight: 600;
    }
    @media screen and (max-width: 1300px) {
        .question-wrapper.opened .toggler {
            padding-top: 19px;
            padding-bottom: 17px;
        }
        .answer-wrapper {
            font-size: 15px;
            max-width: 702px;
            padding-bottom: 19px;
        }
        .have-found-answer button,
        .have-found-answer span {
            font-size: 14px;
        }
        .have-found-answer button {
            padding: 5px 8px 7px 8px;
        }
    }
    @media screen and (max-width: 1000px) {
        .answer-wrapper {
            max-width: 504px;
        }
    }
    .have-found-answer button.no {
        margin-left: 7px;
        padding-right: 6px;
    }
    .have-found-answer.chose-yes button.yes {
        border: 1px solid var(--color-info);
        color: var(--color-info);
    }
    .have-found-answer button.yes:hover {
        border: 1px solid var(--color-info);
        color: var(--color-info);
    }
    .have-found-answer.chose-yes button.yes path,
    .have-found-answer button.yes:hover path {
        fill: var(--color-info);
    }
    .have-found-answer button.no:hover {
        border: 1px solid var(--color-main);
        color: var(--color-main);
    }
    .have-found-answer button.no:hover path {
        fill: var(--color-main);
    }
    .have-found-answer.chose-no button.yes,
    .have-found-answer.chose-yes button.no {
        border: 1px solid var(--gray-1100);
        color: var(--gray-600);
    }
    .have-found-answer.chose-no button.yes path,
    .have-found-answer.chose-yes button.no path {
        fill: var(--gray-600);
    }
    .have-found-answer.chose-no button.no {
        border: 1px solid var(--color-main);
    }
    .have-found-answer button.yes:active,
    .have-found-answer button.no:active {
        border: 1px solid var(--gray-1100);
        color: var(--color-main);
    }
    .have-found-answer button.yes:active path,
    .have-found-answer button.no:active path {
        fill: var(--color-main);
    }
    .have-found-answer button svg {
        display: inline-block;
        vertical-align: top;
        margin-top: 1px;
        margin-right: 2px;
    }
    .have-found-answer button.no svg {
        margin-top: 2px;
    }
    .question-icon {
        margin-left: 1em;
    }
</style>
<div class="question-wrapper" class:opened="{isOpened}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <button class="toggler" on:click="{toggleAnswer}"><span class="question" itemprop="name">{@html questionHTML}</span><span class="question-icon">
        <svg class="plus" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00329 0C6.64878 2.0496e-08 6.3645 0.284144 6.3645 0.63849L6.3645 6.36151L0.638791 6.36151C0.284279 6.36151 2.05057e-08 6.64565 0 7C-2.05056e-08 7.35435 0.284279 7.63849 0.638791 7.63849H6.3645V13.3615C6.3645 13.7159 6.64877 14 7.00329 14C7.1772 14 7.34108 13.9298 7.45479 13.8161C7.5685 13.7025 7.64208 13.542 7.63873 13.3649L7.63873 7.64183L13.3644 7.64183C13.5384 7.64183 13.7022 7.57163 13.8159 7.45797C13.933 7.34097 14.0032 7.18386 13.9999 7.00668C13.9999 6.65234 13.7156 6.36819 13.3611 6.36819L7.64208 6.36151L7.64208 0.638491C7.64208 0.284145 7.3578 -2.0496e-08 7.00329 0Z" fill="#330033"/>
        </svg>
        <svg class="minus" width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.638791 0.359673C0.284279 0.359673 2.05056e-08 0.643818 0 0.998164C-2.05056e-08 1.35251 0.284279 1.63666 0.638791 1.63666C8.40828 1.63666 5.18166 1.64 13.3644 1.64C13.5384 1.64 13.7022 1.5698 13.8159 1.45614C13.933 1.33914 14.0032 1.18202 13.9999 1.00485C13.9999 0.650503 13.7156 0.366359 13.3611 0.366359C5.54885 0.357226 8.87358 0.359673 0.638791 0.359673Z" fill="#E71F75"/>
        </svg>
    </span></button>
    {#if isOpened}
        <div class="answer-wrapper" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text">{answer}</div>
        </div>
        <div class="have-found-answer" class:chose-no="{choseNo}" class:chose-yes="{choseYes}">
            <span>Вы нашли нужную информацию?</span>
            <button
                    bind:this={questionYesButton} class="yes" on:click="{toggleYes}">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4898 12.2371C16.8482 11.7666 17.0201 11.2622 16.9981 10.7428C16.9762 10.1706 16.7275 9.72271 16.5227 9.44793C16.7604 8.83814 16.8519 7.87829 16.0583 7.133C15.4768 6.5872 14.4894 6.34253 13.1216 6.41029C12.1598 6.45546 11.3553 6.6399 11.3223 6.64743H11.3187C11.1358 6.6813 10.942 6.72271 10.7445 6.76788C10.7299 6.52698 10.7701 5.92848 11.2017 4.58093C11.7136 2.97742 11.6844 1.75031 11.1066 0.929736C10.4995 0.0677541 9.53037 0 9.24511 0C8.97083 0 8.71849 0.116688 8.5393 0.331242C8.13336 0.816813 8.1809 1.71267 8.2321 2.12673C7.74936 3.45922 6.39624 6.72647 5.25157 7.63363C5.22963 7.64868 5.21135 7.6675 5.19306 7.68632C4.85661 8.05144 4.62987 8.44668 4.47627 8.79297C4.2605 8.67252 4.01548 8.60477 3.75217 8.60477H1.52135C0.680218 8.60477 0 9.30866 0 10.1706V16.2873C0 17.1531 0.683875 17.8532 1.52135 17.8532H3.75217C4.07765 17.8532 4.38119 17.7478 4.62987 17.5671L5.48929 17.6725C5.62094 17.6913 7.96148 17.9962 10.3642 17.9473C10.7994 17.9812 11.209 18 11.5893 18C12.2439 18 12.8144 17.9473 13.2899 17.8419C14.4089 17.5972 15.1732 17.1079 15.5609 16.389C15.8571 15.8394 15.8571 15.2936 15.8096 14.9473C16.5373 14.2698 16.6653 13.5207 16.6397 12.9937C16.6251 12.6888 16.5593 12.4291 16.4898 12.2371ZM1.52135 16.8369C1.22512 16.8369 0.987413 16.5885 0.987413 16.2873V10.1669C0.987413 9.86198 1.22878 9.61731 1.52135 9.61731H3.75217C4.04839 9.61731 4.2861 9.86575 4.2861 10.1669V16.2836C4.2861 16.5885 4.04474 16.8331 3.75217 16.8331H1.52135V16.8369ZM15.5536 11.7967C15.4 11.9624 15.3707 12.2146 15.4878 12.4103C15.4878 12.4141 15.6377 12.6775 15.656 13.0389C15.6816 13.532 15.4512 13.9686 14.9685 14.3413C14.7966 14.4768 14.7271 14.7102 14.8002 14.921C14.8002 14.9247 14.9575 15.4216 14.7015 15.8921C14.4565 16.3438 13.9116 16.6675 13.0851 16.8482C12.4231 16.995 11.5235 17.0213 10.419 16.931C10.4044 16.931 10.3861 16.931 10.3678 16.931C8.01633 16.9837 5.63923 16.6675 5.61363 16.6637H5.60997L5.2406 16.6186C5.26255 16.5132 5.27352 16.4003 5.27352 16.2873V10.1669C5.27352 10.005 5.24792 9.84693 5.20403 9.70013C5.26986 9.44793 5.45271 8.88708 5.88425 8.40903C7.52628 7.06901 9.13174 2.54831 9.20123 2.35257C9.23048 2.27353 9.2378 2.18695 9.22317 2.10038C9.161 1.6788 9.18294 1.16311 9.27071 1.00878C9.46454 1.01255 9.9875 1.06901 10.302 1.51694C10.675 2.04768 10.6604 2.99624 10.2581 4.25345C9.64373 6.16938 9.59254 7.17817 10.0789 7.62233C10.3203 7.84442 10.6421 7.85571 10.8762 7.76913C11.0993 7.71644 11.3114 7.67127 11.5125 7.63739C11.5271 7.63363 11.5454 7.62986 11.56 7.6261C12.6828 7.3739 14.6942 7.21957 15.3927 7.87453C15.9851 8.43162 15.5646 9.16938 15.517 9.24843C15.3817 9.45922 15.4219 9.734 15.6048 9.90339C15.6084 9.90715 15.9924 10.2798 16.0107 10.7804C16.0254 11.1154 15.8718 11.458 15.5536 11.7967Z" fill="#330033"/>
                </svg>
                Да</button>
            <button
                    bind:this={questionNoButton} class="no" on:click="{toggleNo}">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4898 5.76286C16.8482 6.23338 17.0201 6.73777 16.9981 7.25722C16.9762 7.82936 16.7275 8.27729 16.5227 8.55207C16.7604 9.16186 16.8519 10.1217 16.0583 10.867C15.4768 11.4128 14.4894 11.6575 13.1216 11.5897C12.1598 11.5445 11.3553 11.3601 11.3223 11.3526H11.3187C11.1358 11.3187 10.942 11.2773 10.7445 11.2321C10.7299 11.473 10.7701 12.0715 11.2017 13.4191C11.7136 15.0226 11.6844 16.2497 11.1066 17.0703C10.4995 17.9322 9.53037 18 9.24511 18C8.97083 18 8.71849 17.8833 8.5393 17.6688C8.13336 17.1832 8.1809 16.2873 8.2321 15.8733C7.74936 14.5408 6.39624 11.2735 5.25157 10.3664C5.22963 10.3513 5.21135 10.3325 5.19306 10.3137C4.85661 9.94856 4.62987 9.55332 4.47627 9.20703C4.2605 9.32748 4.01548 9.39523 3.75217 9.39523H1.52135C0.680218 9.39523 0 8.69134 0 7.82936V1.71267C0 0.846926 0.683875 0.146801 1.52135 0.146801H3.75217C4.07765 0.146801 4.38119 0.252195 4.62987 0.432873L5.48929 0.327478C5.62094 0.308659 7.96148 0.00376511 10.3642 0.0526981C10.7994 0.0188217 11.209 0 11.5893 0C12.2439 0 12.8144 0.0526981 13.2899 0.158094C14.4089 0.402761 15.1732 0.892096 15.5609 1.61104C15.8571 2.1606 15.8571 2.7064 15.8096 3.0527C16.5373 3.73024 16.6653 4.4793 16.6397 5.00627C16.6251 5.31117 16.5593 5.57089 16.4898 5.76286ZM1.52135 1.16311C1.22512 1.16311 0.987413 1.41154 0.987413 1.71267V7.83312C0.987413 8.13802 1.22878 8.38269 1.52135 8.38269H3.75217C4.04839 8.38269 4.2861 8.13425 4.2861 7.83312V1.71644C4.2861 1.41154 4.04474 1.16688 3.75217 1.16688H1.52135V1.16311ZM15.5536 6.20326C15.4 6.03764 15.3707 5.78545 15.4878 5.58971C15.4878 5.58595 15.6377 5.32246 15.656 4.96111C15.6816 4.46801 15.4512 4.03137 14.9685 3.65872C14.7966 3.52321 14.7271 3.28984 14.8002 3.07905C14.8002 3.07528 14.9575 2.57842 14.7015 2.1079C14.4565 1.65621 13.9116 1.3325 13.0851 1.15182C12.4231 1.00502 11.5235 0.978672 10.419 1.06901C10.4044 1.06901 10.3861 1.06901 10.3678 1.06901C8.01633 1.01631 5.63923 1.3325 5.61363 1.33626H5.60997L5.2406 1.38143C5.26255 1.48683 5.27352 1.59975 5.27352 1.71267V7.83312C5.27352 7.99498 5.24792 8.15307 5.20403 8.29987C5.26986 8.55207 5.45271 9.11292 5.88425 9.59097C7.52628 10.931 9.13174 15.4517 9.20123 15.6474C9.23048 15.7265 9.2378 15.813 9.22317 15.8996C9.161 16.3212 9.18294 16.8369 9.27071 16.9912C9.46454 16.9875 9.9875 16.931 10.302 16.4831C10.675 15.9523 10.6604 15.0038 10.2581 13.7465C9.64373 11.8306 9.59254 10.8218 10.0789 10.3777C10.3203 10.1556 10.6421 10.1443 10.8762 10.2309C11.0993 10.2836 11.3114 10.3287 11.5125 10.3626C11.5271 10.3664 11.5454 10.3701 11.56 10.3739C12.6828 10.6261 14.6942 10.7804 15.3927 10.1255C15.9851 9.56838 15.5646 8.83062 15.517 8.75157C15.3817 8.54078 15.4219 8.266 15.6048 8.09661C15.6084 8.09285 15.9924 7.7202 16.0107 7.21957C16.0254 6.88457 15.8718 6.54203 15.5536 6.20326Z" fill="#330033"/>
                </svg>
                Нет</button>
        </div>
    {/if}
    {#if isOpened}
        {#if showChoseYes}
            <CustomDropdown
                    relativeElement={questionYesButton}
                    buttonRef={questionYesButton}
                    bind:dropdownVisible={showChoseYes}
                    css="width: 424px;"
                    position="LEFT">
                <HelpThankyouMessage></HelpThankyouMessage>
            </CustomDropdown>
        {/if}
        {#if showChoseNo}
            <CustomDropdown
                    relativeElement={questionNoButton}
                    buttonRef={questionNoButton}
                    bind:dropdownVisible={showChoseNo}
                    css="width: 424px;"
                    position="LEFT">
                <HelpWhyList {selectedOtherNo} {sentNoResponse}></HelpWhyList>
            </CustomDropdown>
        {/if}
        {#if choseOther}
            <CustomDropdown
                    relativeElement={questionNoButton}
                    buttonRef={questionNoButton}
                    bind:dropdownVisible={choseOther}
                    css="width: 424px;"
                    position="LEFT">
                <HelpWhyOtherForm {sentNoResponse}></HelpWhyOtherForm>
            </CustomDropdown>
        {/if}
        {#if sentNo}
            <CustomDropdown
                    relativeElement={questionNoButton}
                    buttonRef={questionNoButton}
                    bind:dropdownVisible={sentNo}
                    css="width: 424px;"
                    position="LEFT">
                <HelpThankyouMessage></HelpThankyouMessage>
            </CustomDropdown>
        {/if}
    {/if}
</div>
