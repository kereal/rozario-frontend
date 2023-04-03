export const activeOrders = [
  {
    photo: "/recommendation.png",
    order: {
      date: {
        value: "2020-03-21T00:00",
        time: {
          // exact: "16:00"
          range: {
            from: "16:00",
            to: "18:00"
          }
        },
        notime: "Уточнить у получателя",
        status: "range"
      },
      recipient: "",
      clientName: "Иван Иванов",
      recipientPhone: "+7 999 888-77-66",
      clientPhone: "+7 000 222-23-23",
      destination: {
        value: "г. Мурманск, ул. Промышленная, 19",
        noAddress: "",
        selfPickup: "Мурманск, промышленная 19",
        status: "address"
      },
      postcard: "С Днём Рождения!",
      comment: "Осторожно злые собаки",
      number: "190910-06703",
      paymentType: "Оплата наличными",
      totalPrice: 14500,
      list: [
        {
          name: "Букет нарциссы и тюльпаны",
          quantity: 1,
          price: 1590
        },
        {
          name: "Шикарный букет Разноцветных Роз",
          quantity: 2,
          price: 10590
        }
      ]
    },
    testimonials: [
      "1st slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "2nd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "3rd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день."
    ]
  }
]

export const orderStories = [
  {
    order: {
      date: {
        formattedDate: "чт, 21 марта",
        formattedTime: "с 16:00 до 18:00",
        value: "2020-03-21T00:00",
        time: {
          // exact: "16:00"
          range: {
            from: "16:00",
            to: "18:00"
          }
        }
      },
      recipient: "Получу сам(а)",
      destination: "г. Мурманск, ул. Промышленная, 19",
      postcard: "С Днём Рождения!",
      comment: "Осторожно злые собаки",
      number: "190910-06703",
      paymentType: "Оплата наличными",
      totalPrice: 14500,
      list: [
        {
          name: "Букет нарциссы и тюльпаны",
          quantity: 1,
          price: 1590
        },
        {
          name: "Шикарный букет Разноцветных Роз",
          quantity: 2,
          price: 10590
        }
      ]
    },
    testimonials: [
      "1st slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "2nd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "3rd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день."
    ]
  }
]

// main address can apply to a single card at once
export const deliveryAddresses = [
  {
    id: 1,
    title: "Cartochka1",
    recipient: {
      name: "Константинопольский Константин Константинович",
      address: {
        index: "427790",
        country: "Россия",
        state: "Мурманская область",
        city: "г. Мурманск",
        street: "пр. Ленина",
        house: "19",
        apartment: "24"
      },
      phone: "+7 999 270-12-88"
    },
    isMain: false
  },
  {
    id: 2,
    title: "Cartochka2",
    recipient: {
      name: "Константинопольский Константин Константинович",
      address: {
        index: "427790",
        country: "Россия",
        state: "Мурманская область",
        city: "г. Мурманск",
        street: "пр. Ленина",
        house: "19",
        apartment: "24"
      },
      phone: "+7 999 270-12-88"
    },
    isMain: false
  }
]

export const currentOrderList = [
  {
    flower: {
      id: 1,
      title: "Настоящая Любовь",
      description:
        "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
      src: "recommendation.png",
      price: "2000",
      size: {
        name: "средний",
        width: {
          num: "22",
          measureUnit: "см"
        },
        height: {
          num: "12",
          measureUnit: "см"
        }
      },
      newItem: true,
      dealsale: true,
      active: true,
      quantity: 1
    }
  },
  {
    flower: {
      id: 2,
      title: "Шикарный букет красных роз роз",
      description:
        "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
      src: "recommendation.png",
      price: "2000",
      size: {
        name: "средний",
        width: {
          num: "22",
          measureUnit: "см"
        },
        height: {
          num: "12",
          measureUnit: "см"
        }
      },
      hitItem: true,
      dealcoupon: true,
      active: true,
      quantity: 2
    }
  },
  {
    flower: {
      id: 3,
      title: "Шикарный букет красных роз роз",
      description:
        "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
      src: "recommendation.png",
      price: "2000",
      size: {
        name: "средний",
        width: {
          num: "22",
          measureUnit: "см"
        },
        height: {
          num: "12",
          measureUnit: "см"
        }
      },
      hitItem: true,
      dealcoupon: true,
      active: true,
      quantity: 2
    }
  }
]
