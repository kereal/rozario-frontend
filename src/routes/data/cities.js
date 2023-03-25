const cities = [
  {
    name: "Мурманск",
    subdomain: "murmansk",
    locativus: "в Мурманске",
    region: 'Мурманская обл.',
    delivery_methods: {
      free: true,
      interval: true,
      exact: true
    },
    shop: {
      seotype: "Florist",
      name: "Розарио.Цветы",
      address: {
        street: "ул. Ростинская, д. 9А",
        openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
        coordinates: [69.023322, 33.072232]
      },
      phone: "8 800 250-64-70",
      owner: "Блинова Светлана Анатольевна",
      reviews_image: 'contacts_murmansk',
      smiles_image: 'smiles/smiles_murmansk',
      about_image: 'about/header',
      delivery_image: 'delivery_murmansk'
    },
    reviews: [
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1---.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Спасибо что нашли время оставить отзыв о нашем магазине! Дарите с удовольствием и возвращайтесь к нам вновь!'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'Спасибо большое, за доставленный маме букет! Букет яркий, сочный! Очень понравился! Переживала сначала,что заменили цветы( предварительно согласовали), но оказалось всё очень здорово!!! ( фото букета скинули, за что большое спасибо!)  Спасибо большое, за доставленный маме букет! Букет яркий, сочный! Очень понравился! Переживала сначала,что заменили цветы( предварительно согласовали), но оказалось всё очень здорово!!! ( фото букета скинули, за что большое спасибо!) ',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская 2',
          photoUrl: 'reviews/photo1---.png',
        },
        message: 'Спасибо большое, за доставленный маме букет! Букет яркий, сочный! Очень понравился! Переживала сначала,что заменили цветы( предварительно согласовали), но оказалось всё очень здорово!!! ( фото букета скинули, за что большое спасибо!) ',
          ratings: []
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская 3',
          photoUrl: 'reviews/photo2.png',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 1
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 2
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Спасибо за ваш отзыв! Мы рады, что вы остались довольны нашей работой.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        companyResponse: {
          text: 'Спасибо что нашли время оставить отзыв о нашем магазине! Дарите с удовольствием и возвращайтесь к нам вновь!'
        },
        ratings: []
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Спасибо за отзыв! Ваши оценки помогают нам становиться лучше и радовать вас.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Добрый день! Приносим извинения за доставленные неудобства! У нас произошел технический сбой, нашей команде очень жаль, что мы не смогли принять и выполнить Ваш заказ, что бы порадовать Ваших близких!'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Спасибо за отзыв! Ваши оценки помогают нам становиться лучше и радовать вас.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Спасибо что нашли время оставить отзыв о нашем магазине!Дарите с удовольствием и возвращайтесь к нам вновь!'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        companyResponse: {
          text: 'Спасибо за ваш отзыв! Мы рады, что вы остались довольны нашей работой.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Спасибо за ваш отзыв! Мы рады, что вы остались довольны нашей работой.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Добрый день! Приносим извинения за доставленные неудобства! У нас произошел технический сбой, нашей команде очень жаль, что мы не смогли принять и выполнить Ваш заказ, что бы порадовать Ваших близких!'
        },
        ratings: []
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Добрый день! Приносим извинения за доставленные неудобства! У нас произошел технический сбой, нашей команде очень жаль, что мы не смогли принять и выполнить Ваш заказ, что бы порадовать Ваших близких!'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Спасибо за отзыв! Ваши оценки помогают нам становиться лучше и радовать вас.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Спасибо за отзыв! Ваши оценки помогают нам становиться лучше и радовать вас.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        },
        companyResponse: {
          text: 'Спасибо за отзыв! Ваши оценки помогают нам становиться лучше и радовать вас.'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская 4',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: 'reviews/photo3.png',
        },
        message: 'Спасибо за оперативную доставку цветов, в течение трех часов. Заказ оформила удаленно с Ханты-Мансийского округа. Бесконечно благодарны за слаженную работу. Процветания и финансовой стабильности!!',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'Огромное спасибо за оперативность и внимание к клиентам! Позвонили для уточнения заказа, доставили в указанное время и связались с получателем (супруга уже вышла с работы) и вручили букет! оценка 10 из 10!',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          }
        ]
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'Спасибо вам большое за вашу работу! Операторы вежливые, пунктуальные, почти каждое движение букета отслеживали! Свекровь в полном воссторге! Еще раз спасибо',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'Хочу поблагодарить компанию за прекрасную возможность поздравить дорогих и близких людей, если между нами сотни километров! Заказала Мамуле букет ко дню рождения, флористы молодцы! Букет превзошел мои ожидания! Правда , пришлось заменить в композиции Хочу поблагодарить компанию за прекрасную возможность поздравить дорогих и близких людей, если между нами сотни километров! Заказала Мамуле букет ко дню рождения, флористы молодцы! Букет превзошел мои ожидания! Правда , пришлось заменить в композиции',
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        },
          ratings: []
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          },
          {
            title: 'Обслуживание',
            rate: 3
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'good',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'bad',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'Быстрая доставка. Цветы свежие, великолепные. Благодарю! Сервис на уровне! Очень здорово, что вот так помогаете на расстоянии 1000 км порадовать близких!',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          },
          {
            title: 'Работа курьера',
            rate: 4
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet1.png',
          link: 'link to the bouquet'
        }
      },
      {
        orderId: '12345678',
        date: '29.08.2020',
        emotion: 'meh',
        client: {
          name: 'Евгения Константинопольская',
          photoUrl: '',
        },
        message: 'happy happy message',
        ratings: [
          {
            title: 'Свежесть цветов',
            rate: 5
          }
        ],
        bouquet: {
          photoUrl: 'reviews/bouquet2.png',
          link: 'link to the bouquet'
        }
      }
    ],
    smiles: [
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile1.png',
        recipientPhotoBig: 'smiles/smile1big.png',
        bouquets: [{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Шикарный букет разноцветных роз',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        }],
      },
      {
        
        date: '30.08.2020',
        recipientPhoto: 'smiles/smile2.png',
        recipientPhotoBig: 'smiles/smile2.png',
        bouquets: [{
          photoUrl: 'smiles/bouquets/bouquet1--.png',
            productLink: '/product/card',
          link: 'link to the bouquet',
          title: 'Самый лучший день',
          sizes: {
            title: 'Средний размер',
            height: '50 см',
            width: '50 см'
          },
          price: '3 456 Р',
          discountPrice: '3 456 Р',
          rate: 3
        },{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Шикарный букет красных роз',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        },{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Коробочка счастья Набор №1',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        }],
      },
      {
        
        date: '31.08.2020',
        recipientPhoto: 'smiles/smile3.png',
        recipientPhotoBig: 'smiles/smile3.png',
        bouquets: [{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Ясный день',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        }],
      },
      {
        
        date: '01.09.2020',
        recipientPhoto: 'smiles/smile4.png',
          recipientPhotoBig: 'smiles/smile4.png',
        bouquets: [{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Гармония души',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        }],
      },
      {
        
        date: '02.09.2020',
        recipientPhoto: 'smiles/smile5.png',
          recipientPhotoBig: 'smiles/smile5.png',
        bouquets: [{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Лучики тепла',
            sizes: {
                title: 'Средний размер',
                height: '50 см',
                width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
        }],
      },
      {
        
        date: '03.09.2020',
        recipientPhoto: 'smiles/smile6--.png',
          recipientPhotoBig: 'smiles/smile6--.png',
          bouquets: [{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Лимонный десерт',
            sizes: {
              title: 'Средний размер',
              height: '50 см',
              width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
          },{
            photoUrl: 'smiles/bouquets/bouquet1.png',
            productLink: '/product/card',
            link: 'link to the bouquet',
            title: 'Шикарный букет красных роз',
            sizes: {
              title: 'Средний размер',
              height: '50 см',
              width: '50 см'
            },
            price: '3 456 Р',
            discountPrice: '3 456 Р',
            rate: 3
          }],
      },
      {
        
        date: '04.09.2020',
        recipientPhoto: 'smiles/smile7.png',
          recipientPhotoBig: 'smiles/smile7.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Цветущий сад',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile8.png',
          recipientPhotoBig: 'smiles/smile8.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Липовый цвет',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile9.png',
          recipientPhotoBig: 'smiles/smile9.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Настроение души',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile1.png',
          recipientPhotoBig: 'smiles/smile1.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile2.png',
          recipientPhotoBig: 'smiles/smile2.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile3.png',
          recipientPhotoBig: 'smiles/smile3.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile4.png',
          recipientPhotoBig: 'smiles/smile4.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile5.png',
          recipientPhotoBig: 'smiles/smile5.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile6.png',
          recipientPhotoBig: 'smiles/smile6.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile7.png',
          recipientPhotoBig: 'smiles/smile7.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile8.png',
          recipientPhotoBig: 'smiles/smile8.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile9.png',
          recipientPhotoBig: 'smiles/smile9.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile1.png',
          recipientPhotoBig: 'smiles/smile1.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile2.png',
          recipientPhotoBig: 'smiles/smile2.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile3.png',
          recipientPhotoBig: 'smiles/smile3.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile4.png',
          recipientPhotoBig: 'smiles/smile4.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile5.png',
          recipientPhotoBig: 'smiles/smile5.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile6.png',
          recipientPhotoBig: 'smiles/smile6.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile7.png',
          recipientPhotoBig: 'smiles/smile7.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
      {
        
        date: '29.08.2020',
        recipientPhoto: 'smiles/smile8.png',
          recipientPhotoBig: 'smiles/smile8.png',
          bouquets: [{
              photoUrl: 'smiles/bouquets/bouquet1.png',
              productLink: '/product/card',
              link: 'link to the bouquet',
              title: 'Шикарный букет разноцветных роз',
              sizes: {
                  title: 'Средний размер',
                  height: '50 см',
                  width: '50 см'
              },
              price: '3 456 Р',
              discountPrice: '3 456 Р',
              rate: 3
          }],
      },
    ]
  },
  {
    name: "Москва",
    subdomain: "moscow",
    locativus: "в Москве",
    shop: {
      seotype: "Florist",
      name: "Московские цветы",
      address: {
        street: "пр. Ленина, д. 19",
        openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
      },
      phone: "+7 921 900 80 40",
      owner: "Иванов Иван Иванович",
        reviews_image: 'contacts_murmansk',
    },
  },
  {
    name: "Санкт-Петербург",
    subdomain: "saint-petersburg",
    locativus: "в Санкт-Петербурге",
    shop: {
      seotype: "Florist",
      name: "Питерские лилии",
      address: {
        street: "пр. Сталина, д. 19",
        openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
      },
      phone: "+7 921 900 80 40",
      owner: "Петров Петр Петрович",
        reviews_image: 'contacts_murmansk',
    },
  },
  {
    name: "Воронеж",
    subdomain: "voronezh",
    locativus: "в Воронеже",
    shop: {
      seotype: "Florist",
      name: "Воронежский флорист",
      address: {
        street: "пр. Пушкина, д. 19",
        openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
      },
      phone: "+7 922 900 80 40",
      owner: "Петров Петр Петрович",
        reviews_image: 'contacts_murmansk',
    },
  },
  {
    name: "Казань",
    subdomain: "kazan",
    locativus: "в Казани",
    shop: {
      seotype: "Florist",
      name: "Казанские цветы",
      address: {
        street: "пр. Пушкина, д. 19",
        openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
      },
      phone: "+7 922 900 80 40",
      owner: "Петров Петр Петрович",
        reviews_image: 'contacts_murmansk',
    },
  },
];

export default cities;
