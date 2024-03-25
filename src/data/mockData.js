import { tokens } from "../theme";

export const mockDataUsers = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "manager",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "staff",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "vendor",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "manager",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "vendor",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "staff",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "vendor",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "vendor",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "manager",
  },
];

export const mockDataApplications = [
  {
    id: 1,
    name: "Vendor 1",
    contactinfo: "(665)121-5454",
    email: "vendor1@gmail.com",
  },
  {
    id: 2,
    name: "Vendor 2",
    contactinfo: "(665)121-5454",
    email: "vendor2@gmail.com",
  },
  {
    id: 3,
    name: "Vendor 3",
    contactinfo: "(665)121-5454",
    email: "vendor3@gmail.com",
  },
  {
    id: 4,
    name: "Vendor 4",
    contactinfo: "(665)121-5454",
    email: "vendor4@gmail.com",
  },
  {
    id: 5,
    name: "Vendor 5",
    contactinfo: "(665)121-5454",
    email: "vendor5@gmail.com",
  },
];

export const mockDataOrders = [
  {
    id: 1,
    vendorid: "Vendor 1",
    quantity: "20",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  {
    id: 2,
    vendorid: "Vendor 2",
    quantity: "50",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  {
    id: 3,
    vendorid: "Vendor 3",
    quantity: "10",
    status: "approved",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  {
    id: 4,
    vendorid: "Vendor 4",
    quantity: "78",
    status: "approved",
    orderdate: "03/12/2022",
    totalamount: "50.30",
  },
  {
    id: 5,
    vendorid: "Vendor 3",
    quantity: "5",
    status: "approved",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  {
    id: 6,
    vendorid: "Vendor 6",
    quantity: "200",
    status: "approved",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  {
    id: 7,
    vendorid: "Vendor 1",
    quantity: "70",
    status: "approved",
    orderdate: "03/12/2022",
    totalamount: "21.24",
  },
  
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "vendor2",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "21j3h5g",
    user: "vendor3",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "s8a9few",
    user: "vendor4",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "gg9er8d",
    user: "vendor5",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "r89eg87",
    user: "vendor6",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "s8a9few",
    user: "vendor7",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "01e4dsa",
    user: "vendor8",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "21j3h5g",
    user: "vendor9",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "01e4dsa",
    user: "vendor10",
    date: "2024-09-01",
    cost: "43.95",
  },
  {
    txId: "01e4dsa",
    user: "vendor11",
    date: "2024-09-01",
    cost: "43.95",
  },
];

export const mockDataProducts = [
  {
    id: 1,
    name: "Crackers",
    price: 35,
    size: 40,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 2,
    name: "Crackers",
    price: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 3,
    name: "Crackers",
    price: 35,
    size: 50,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 4,
    name: "Crackers",
    price: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 5,
    name: "Crackers",
    price: 35,
    size: 10,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 6,
    name: "Crackers",
    price: 11,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 7,
    name: "Crackers",
    price: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
];

export const mockDataIngredients = [
  {
    id: 1,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 2,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 3,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 4,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 5,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
  {
    id: 6,
    name: "Flour",
    quantity: 35,
    size: 35,
    unit: 35,
    expirydate: "2024/10/10",
  },
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "vendor1",
    label: "Vendor 1",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "vendor2",
    label: "Vendor 2",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "vendor3",
    label: "Vendor 3",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "vendor4",
    label: "Vendor 4",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "vendor5",
    label: "Vendor 5",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Curry Crackers",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "January",
        y: 101,
      },
      {
        x: "Febuary",
        y: 75,
      },
      {
        x: "March",
        y: 36,
      },
      {
        x: "April",
        y: 216,
      },
      {
        x: "May",
        y: 35,
      },
      {
        x: "June",
        y: 236,
      },
      {
        x: "July",
        y: 88,
      },
      {
        x: "August",
        y: 232,
      },
      {
        x: "September",
        y: 281,
      },
      {
        x: "October",
        y: 1,
      },
      {
        x: "November",
        y: 35,
      },
      {
        x: "December",
        y: 14,
      },
    ],
  },
  {
    id: "Vegan Biscuits",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "January",
        y: 212,
      },
      {
        x: "Febuary",
        y: 190,
      },
      {
        x: "March",
        y: 270,
      },
      {
        x: "April",
        y: 9,
      },
      {
        x: "May",
        y: 75,
      },
      {
        x: "June",
        y: 175,
      },
      {
        x: "July",
        y: 33,
      },
      {
        x: "August",
        y: 189,
      },
      {
        x: "September",
        y: 97,
      },
      {
        x: "October",
        y: 87,
      },
      {
        x: "November",
        y: 299,
      },
      {
        x: "December",
        y: 251,
      },
    ],
  }
];
