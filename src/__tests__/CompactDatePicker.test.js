// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, getAllByTextId } from "@testing-library/svelte";

import CompactDatePicker from "../components/CompactDatePicker.svelte";

test("renders current day, two prev and two next days (2020-01-03)", () => {
  const initDate = new Date(2020, 0, 3);
  const today = new Date(2020, 0, 3);

  const results = render(CompactDatePicker, { initDate, today });

  const daysOfWeek = ["Ср", "Чт", "Пт", "Сб", "Вс"];
  const dayNumbers = [1, 2, 3, 4, 5];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders current day, two prev and two next days (2020-03-02)", () => {
  const initDate = new Date(2020, 2, 2);
  const today = new Date(2020, 2, 2);

  const results = render(CompactDatePicker, { initDate, today });

  const daysOfWeek = ["Сб", "Вс", "Пн", "Вт", "Ср"];
  const dayNumbers = [29, 1, 2, 3, 4];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders current day, two prev and two next days (2020-03-03)", () => {
  const initDate = new Date(2020, 2, 3);
  const today = new Date(2020, 2, 3);

  const results = render(CompactDatePicker, { initDate, today });

  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт"];
  const dayNumbers = [1, 2, 3, 4, 5];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders date correctly on month change (2020-03-03 -> 2020-04-03)", async () => {
  const initDate = new Date(2020, 2, 3);
  const today = new Date(2020, 2, 3);

  const results = render(CompactDatePicker, { initDate, today });

  const nextButton = results.getByTestId("next-month-btn");

  await fireEvent.click(nextButton);

  const daysOfWeek = ["Ср", "Чт", "Пт", "Сб", "Вс"];
  const dayNumbers = [1, 2, 3, 4, 5];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders date correctly on month change (2020-02-01 -> 2020-01-01)", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const nextButton = results.getByTestId("next-month-btn");
  await fireEvent.click(nextButton);

  const prevButton = results.getByTestId("prev-month-btn");
  await fireEvent.click(prevButton);

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  const dayNumbers = [30, 31, 1, 2, 3];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders date correctly on day change (2020-01-01 -> 2019-01-05)", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const nextButton = results.getByTestId("next-day-btn");

  await fireEvent.click(nextButton);

  const daysOfWeek = ["Сб", "Вс", "Пн", "Вт", "Ср"];
  const dayNumbers = [4, 5, 6, 7, 8];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders date correctly on day change (2020-06-01 -> 2020-01-01)", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const nextButton = results.getByTestId("next-day-btn");
  await fireEvent.click(nextButton);

  const prevButton = results.getByTestId("prev-day-btn");
  await fireEvent.click(prevButton);

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  const dayNumbers = [30, 31, 1, 2, 3];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("renders picked date correctly (2020-01-01 -> 2020-01-03)", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const thirdDate = results.getByText("3");
  await fireEvent.click(thirdDate);
  expect(thirdDate.classList.contains("bg-infolight")).toBe(true);
});

test("renders picked date correctly (2020-01-01 -> 2020-01-03)", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const thirdDate = results.getByText("3");
  await fireEvent.click(thirdDate);

  const firstDate = results.getByText("1");
  expect(firstDate.classList.contains("bg-infolight")).toBe(false);
});

test("day click does not change datelist", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const thirdDate = results.getByText("3");
  await fireEvent.click(thirdDate);

  const firstDate = results.getByText("1");
  expect(firstDate.classList.contains("bg-infolight")).toBe(false);
  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  const dayNumbers = [30, 31, 1, 2, 3];

  results.getAllByTestId("dayofweek").forEach((day, i) => {
    expect(day.textContent).toEqual(daysOfWeek[i]);
  });
  results.getAllByTestId("daynumber").forEach((day, i) => {
    expect(parseInt(day.textContent)).toEqual(dayNumbers[i]);
  });
});

test("prev days are not clickable and have gray style", async () => {
  const initDate = new Date(2020, 0, 1);
  const today = new Date(2020, 0, 1);

  const results = render(CompactDatePicker, { initDate, today });

  const thirtieth = results.getByText("30");
  expect(thirtieth.classList.contains('text-gray-700')).toBe(true);
  await fireEvent.click(thirtieth);

  const firstDate = results.getByText("1");
  expect(firstDate.classList.contains("bg-infolight")).toBe(true);

});
