event-backend-nodejs/
│
├── config/
│     ├── db.js
│     └── config.js
│   
├── controllers/
│     ├── authController.js
│     ├── userController.js
│     └── productController.js
│   
├── models/
│     ├── User.js
│     ├── Product.js
│     └── Order.js
│   
├── routes/
│     ├── authRoutes.js
│     ├── userRoutes.js
│     └── productRoutes.js
│   
├── services/
│     ├── authService.js
│     ├── userService.js
│     └── productService.js
│   
├── middlewares/
│     ├── authMiddleware.js
│     ├── errorMiddleware.js
│     └── validationMiddleware.js
│   
├── validators/
│     ├── authValidator.js
│     └── productValidator.js
│  
├── utils/
│     ├── logger.js
│     ├── generateToken.js
│     └── responseHandler.js
│   
├── uploads/
│     └── images/
│   
├── public/
│     ├── css/
│     ├── js/
│     └── images/
│   
├── app.js
│   
|── server.js
│
├── tests/ 
│     ├── unit/
│     └── integration/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md