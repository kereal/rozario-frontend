class Subject {
  constructor(state) {
    this.state = state;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyObservers(this.state);
  }
  registerObserver(observer) {
    this.observers.push(observer);
  }
  unregisterObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notifyObservers(data) {
    this.observers.forEach((observer) => observer.notify(data));
  }
}
class Observer {
  constructor(subject) {
    subject.registerObserver(this);
    this.subscribers = [];
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
  notify(data) {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}

let dealsCategories = [
  { text: "Лето", id: 1, path: "/catalog/bouqets" },
  { text: "Букеты", id: 2, path: "/catalog/bouqets" },
  { text: "Розы", id: 3, path: "/catalog/bouqets" },
  { text: "Цветы", id: 4, path: "catalog/bouqets" },
  { text: "Композиции из цветов", id: 5, path: "/catalog/bouqets" },
  { text: "Важные события", id: 6, path: "/catalog/bouqets" },
  { text: "На праздник", id: 7, path: "/catalog/bouqets" },
  { text: "Для близких", id: 8, path: "/catalog/bouqets" },
  { text: "Корзины с фруктами и цветами", id: 9, path: "/catalog/bouqets" },
  { text: "Подарки", id: 10, path: "/catalog/bouqets" },
  { text: "Акции", id: 11, path: "/catalog/bouqets" },
];
let moreCategories = [];

const categories = new Subject(dealsCategories);
const more = new Subject(moreCategories);
const categoriesObserver = new Observer(categories);
const moreObserver = new Observer(more);

function calculateLettersLength(categories) {
  if (categories.length > 0) {
    return categories
      .map((item) => item.text.split("").length * 11)
      .reduce((acc, length) => acc + length);
  }
  return 0;
}

const currWindowScreenWidth = 1210;
let navLength = dealsCategories.length;
const dimensions = -160 - 160 - 90 - 8 * navLength;

function reduceNavListInitial() {
  if (dealsCategories.length < 1) {
    return;
  }
  let lettersLength = calculateLettersLength(dealsCategories);

  while (currWindowScreenWidth + dimensions < lettersLength) {
    const last = dealsCategories.pop();
    moreCategories.push(last);
    if (dealsCategories.length > 0) {
      lettersLength = calculateLettersLength(dealsCategories);
    }
  }
  more.setState(moreCategories);
  categories.setState(dealsCategories);
}

describe("catalog navbar reduceNavList tests", () => {
  beforeAll(() => {
    dealsCategories = [
      { text: "Лето", id: 1, path: "/catalog/bouqets" },
      { text: "Букеты", id: 2, path: "/catalog/bouqets" },
      { text: "Розы", id: 3, path: "/catalog/bouqets" },
      { text: "Цветы", id: 4, path: "catalog/bouqets" },
      { text: "Композиции из цветов", id: 5, path: "/catalog/bouqets" },
      { text: "Важные события", id: 6, path: "/catalog/bouqets" },
      { text: "На праздник", id: 7, path: "/catalog/bouqets" },
      { text: "Для близких", id: 8, path: "/catalog/bouqets" },
      { text: "Корзины с фруктами и цветами", id: 9, path: "/catalog/bouqets" },
      { text: "Подарки", id: 10, path: "/catalog/bouqets" },
      { text: "Акции", id: 11, path: "/catalog/bouqets" },
    ];
    moreCategories = [];
  });
  it("should change remove items from the categories and add items to the moreCategories", () => {
    reduceNavListInitial();
    categoriesObserver.subscribe((data) => {
      expect(data).toStrictEqual([
        { text: "Лето", id: 1, path: "/catalog/bouqets" },
        { text: "Букеты", id: 2, path: "/catalog/bouqets" },
        { text: "Розы", id: 3, path: "/catalog/bouqets" },
        { text: "Цветы", id: 4, path: "catalog/bouqets" },
        { text: "Композиции из цветов", id: 5, path: "/catalog/bouqets" },
        { text: "Важные события", id: 6, path: "/catalog/bouqets" },
        { text: "На праздник", id: 7, path: "/catalog/bouqets" },
      ]);
    });
    moreObserver.subscribe((data) => {
      expect(data).toStrictEqual([
        { text: "Акции", id: 11, path: "/catalog/bouqets" },
        { text: "Подарки", id: 10, path: "/catalog/bouqets" },
        {
          text: "Корзины с фруктами и цветами",
          id: 9,
          path: "/catalog/bouqets",
        },
        { text: "Для близких", id: 8, path: "/catalog/bouqets" },
      ]);
    });
  });
});

describe("catalog navbar calculateLettersLength", () => {
  beforeAll(() => {
    dealsCategories = [
      { text: "Лето", id: 1, path: "/catalog/bouqets" },
      { text: "Букеты", id: 2, path: "/catalog/bouqets" },
      { text: "Розы", id: 3, path: "/catalog/bouqets" },
      { text: "Цветы", id: 4, path: "catalog/bouqets" },
      { text: "Композиции из цветов", id: 5, path: "/catalog/bouqets" },
      { text: "Важные события", id: 6, path: "/catalog/bouqets" },
      { text: "На праздник", id: 7, path: "/catalog/bouqets" },
      { text: "Для близких", id: 8, path: "/catalog/bouqets" },
      { text: "Корзины с фруктами и цветами", id: 9, path: "/catalog/bouqets" },
      { text: "Подарки", id: 10, path: "/catalog/bouqets" },
      { text: "Акции", id: 11, path: "/catalog/bouqets" },
    ];
    moreCategories = [];
  });
  it("should return right value", () => {
    expect(calculateLettersLength(dealsCategories)).toBe(1265);
  });
  it("should not equal wrong value", () => {
    expect(calculateLettersLength(dealsCategories)).not.toBe(1365);
  });
  it("should return 0 if empty array", () => {
    expect(calculateLettersLength([])).toBe(0);
  });
});
