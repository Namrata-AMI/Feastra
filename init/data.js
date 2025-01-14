const sampleMenu = [
  // Appetizers
  {
    name: "Spring Rolls",
    category: "Appetizers",
    price: 150,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5K4hQhb5NRHsSp2S5QLa8ohlMvxZFmlrkzA&s",
  },
  {
    name: "Chicken Wings",
    category: "Appetizers",
    price: 250,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMy6QPwJ6NKwGgH80Yh9nborpDyFDohf55_Q&s",
  },
  {
    name: "Caesar Salad",
    category: "Appetizers",
    price: 180,
    availabiltiy: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7koaOylbVe2shUGqSmlbGWZsHfolTxFjhA&s",
  },
  {
    name: "Garlic Bread",
    category: "Appetizers",
    price: 120,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3N0Yq7z-ZBBumwhqUdr_gTw6SVAJxc64oxA&s",
  },
  {
    name: "Stuffed Mushrooms",
    category: "Appetizers",
    price: 220,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV-aCoa6UTQTiwYFanGMowV1SJ7XLe8BxzFw&s",
  },

  // Main Course
  {
    name: "Grilled Chicken",
    category: "Main Course",
    price: 450,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZVo5eHob97k0XVbJnKGN2c2ktoHMmsuLgg&s",
  },
  {
    name: "Veg Biryani",
    category: "Main Course",
    price: 300,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeBlIywcv4RMaVlvzAk-ygkpjyiX0juwM6Q&s",
  },
  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 350,
    availabiltiy: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej-dPSZmCQr0FqCDqI1OSwvwUxKQuTHTh_Q&s",
  },
  {
    name: "Lamb Rogan Josh",
    category: "Main Course",
    price: 550,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3beBkvYTloWz6mhttkw3UYORn_-EpskUCzw&s",
  },
  {
    name: "Butter Naan",
    category: "Main Course",
    price: 50,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLv-Dclr8ZMc36DOJD9cNgQ_6wotA3rXX-3A&s",
  },

  // Desserts
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 120,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJwmSZeZ_ZFa4YuKicYispg_pIz7HCOcy5PA&s",
  },
  {
    name: "Ice Cream Sundae",
    category: "Desserts",
    price: 200,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmk8O_VMc4Ab-vcC0JbpeOEjfMo9DB29a5A&s",
  },
  {
    name: "Gulab Jamun",
    category: "Desserts",
    price: 100,
    availabiltiy: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpridNzzU09HIIGpVPQ9XhWqay-q7NrMj1yg&s",
  },
  {
    name: "Brownie with Ice Cream",
    category: "Desserts",
    price: 220,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvG0CZHchlu4oszq0L-ixrp4n1Vec7vUt3lw&s",
  },
  {
    name: "Rasgulla",
    category: "Desserts",
    price: 90,
    availabiltiy: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04RieNfeef22NReYv76gtn1Teiejiz4jtFg&s",
  },
];



const sampleOrder = [
  {
    "userId": "678374534dbd327a84aa1a3b",
    "items": [
      {
        "menuItem": "6783cb71e2c63ca0dfc91a1c",
        "quantity": 2
      },
      {
        "menuItem": "6783cb71e2c63ca0dfc91a18",
        "quantity": 1
      },
      {
        "menuItem": "6783cb71e2c63ca0dfc91a16",
        "quantity": 3
      }
    ],
    "totalAmount": 890, // Calculated based on the sum of (menuItem price * quantity)
    "status": "Pending",
    "createdAt": "2025-01-13T10:00:00.000Z",
    "updatedAt": "2025-01-13T10:00:00.000Z"
  } ,

  {
    "userId": "678374a845c2f264e841cced",
    "items": [
      {
        "menuItem": "6783cb71e2c63ca0dfc91a22",
        "quantity": 1
      },
      {
        "menuItem": "6783cb71e2c63ca0dfc91a24",
        "quantity": 4
      },
      {
        "menuItem": "6783cb71e2c63ca0dfc91a28",
        "quantity": 2
      }
    ],
    "totalAmount": 1120, // Calculated based on the sum of (menuItem price * quantity)
    "status": "Pending",
    "createdAt": "2025-01-13T11:00:00.000Z",
    "updatedAt": "2025-01-13T11:00:00.000Z"
  },  

]

module.exports = {sampleOrder,sampleMenu};