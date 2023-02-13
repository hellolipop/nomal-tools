// import Vue from "vue";
// import VueRouter from "vue-router";

// Vue.use(VueRouter);

// // 防止重复跳转
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

// const routes = [
//   {
//     path: "/",
//     redirect: "/home",
//   },
//   {
//     path: "/login",
//     name: '登陆',
//     component: () => import("../views/login.vue")
//   },
//   {
//     path: '/error',
//     name: '错误',
//     component: () => import('../views/errorPage.vue')
//   }

// ];

// const router = new VueRouter({
//   mode: "hash",
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;

// // 修复动态添加错误
// router.$addRoutes = (params) => {
//   router.matcher = new VueRouter({
//     routes,
//   }).matcher;
//   router.matcher.addRoutes(params);
// };
// //meta: { roles: [{ key: "home", value: "read" }]} 元数据验证权限信息格式
// export const asyncRouterMap = [{
//   path: "/index",
//   name: "首页",
//   component: () => import("../views/Index.vue"),
//   children: [
//     {
//       path: "/home",
//       name: "主页",
//       icon: 'nav_home',
//       component: () => import("../views/Home/Home.vue"),
//       meta: {
//         roles: [
//           {
//             key: "homepage",
//             value: "read"
//           }
//         ],
//         group: '/home'
//       }
//     },

//     {
//       path: "/public-housing-management",
//       name: "公房管理",
//       icon: 'public-housing-management',
//       component: () => import("../views/PublicHousingManagement/index.vue"),
//       children: [
//         {
//           path: "/public-housing-management/detail",
//           name: "租房详情",
//           component: () => import("../views/PublicHousingManagement/RentalDetails/RentalDetails.vue"),
//           children: [
//             {
//               path: "/public-housing-management/detail/choose-room",
//               name: "选择房屋",
//               component: () => import("../views/PublicHousingManagement/RentalDetails/ChooseRoom.vue"),
//               children: [
//                 {
//                   path: "/public-housing-management/detail/choose-room/room-detail",
//                   name: "选择房屋详情",
//                   component: () => import("../views/PublicHousingManagement/RentalDetails/RoomDetail.vue"),
//                   meta: {
//                     roles: [
//                       {
//                         key: "public_owned_house_management_menu",
//                         value: "read"
//                       }
//                     ],
//                     group: '/public-housing-management'
//                   }
//                 }
//               ],
//               meta: {
//                 roles: [
//                   {
//                     key: "public_owned_house_management_menu",
//                     value: "read"
//                   }
//                 ],
//                 group: '/public-housing-management'
//               }
//             },
//             {
//               path: "/public-housing-management/detail/fixed-assets",
//               name: "固定资产核对",
//               component: () => import("../views/PublicHousingManagement/RentalDetails/FixedAssets.vue"),
//               meta: {
//                 group: '/public-housing-management'
//               }
//             },
//             {
//               path: "/public-housing-management/status-query/room-detail",
//               name: "公房状态查询-房屋详情",
//               component: () => import("../views/PublicHousingManagement/statusQueryComponents/QueryManagement.vue"),
//               meta: {
//                 group: '/public-housing-management'
//               }
//             },
//             {
//               path: "/public-housing-management/price-detail",
//               name: "公房价格管理详情",
//               component: () => import("../views/PublicHousingManagement/Price/ChangePrice.vue"),
//               meta: {
//                 group: '/public-housing-management'
//               }
//             },
//           ],
//           meta: {
//             roles: [
//               {
//                 key: "public_owned_house_management_menu",
//                 value: "read"
//               }
//             ],
//             group: '/public-housing-management'
//           }
//         }
//       ],
//       meta: {
//         roles: [
//           {
//             key: "public_owned_house_management_menu",
//             value: "read"
//           }
//         ],
//         group: '/public-housing-management'
//       }
//     },
//     {
//       path: "/public-rental-housing-management",
//       name: "公租房管理",
//       icon: 'rental-housing',
//       component: () => import("../views/PublicRentalHousingManagement/index.vue"),
//       children: [
//         {
//           path: "/public-rental-housing-management/detail",
//           name: "公租房-租房详情",
//           component: () => import("../views/PublicHousingManagement/RentalDetails/RentalDetails.vue"),
//           children: [
//             {
//               path: "/public-rental-housing-management/detail/choose-room",
//               name: "公租房-选择房屋",
//               component: () => import("../views/PublicHousingManagement/RentalDetails/ChooseRoom.vue"),
//               children: [
//                 {
//                   path: "/public-rental-housing-management/detail/choose-room/room-detail",
//                   name: "公租房-选择房屋详情",
//                   component: () => import("../views/PublicHousingManagement/RentalDetails/RoomDetail.vue"),
//                 }
//               ],
//               meta: {

//                 group: '/public-rental-housing-management'
//               }
//             },
//             {
//               path: "/public-rental-housing-management/detail/fixed-assets",
//               name: "公租房-固定资产核对",
//               component: () => import("../views/PublicHousingManagement/RentalDetails/FixedAssets.vue"),
//               meta: {
//                 group: '/public-rental-housing-management'
//               }
//             },
//             {
//               path: "/public-rental-housing-management/status-query/room-detail",
//               name: "公租房状态查询-房屋详情",
//               component: () => import("../views/PublicHousingManagement/statusQueryComponents/QueryManagement.vue"),
//               meta: {
//                 group: '/public-rental-housing-management'
//               }
//             },
//             {
//               path: "/public-rental-housing-management/price-detail",
//               name: "公租房价格管理详情",
//               component: () => import("../views/PublicHousingManagement/Price/ChangePrice.vue"),
//               meta: {
//                 group: '/public-rental-housing-management'
//               }
//             },
//           ],
//           meta: {
//             roles: [
//               {
//                 key: 'public_rental_house_management_menu',
//                 value: 'read'
//               }
//             ],
//             group: '/public-rental-housing-management'
//           }
//         }
//       ],
//       meta: {
//         roles: [
//           {
//             key: "public_rental_house_management_menu",
//             value: "read"
//           }
//         ],
//         group: '/public-rental-housing-management'
//       }
//     },
//     {
//       path: "/industrial-register",
//       name: "产业产籍",
//       icon: 'rental-housing',
//       component: () => import("../views/IndustrialRegister/IndustrialRegister.vue"),
//       children: [
//         {
//           path: "/industrial-register/detail",
//           name: "房屋编辑",
//           component: () => import("../views/IndustrialRegister/PublicManagement/DetailManagement/DetailManagement.vue"),
//           meta: {
//             group: '/industrial-register'
//           }
//         },
//         {
//           path: "/industrial-register/room-detail",
//           name: "房屋详情",
//           component: () => import("../views/PublicHousingManagement/statusQueryComponents/QueryManagement.vue"),
//           meta: {
//             group: '/industrial-register'
//           }
//         },
//         {
//           path: "/industrial-register/assets-config",
//           name: "固定资产配置",
//           component: () => import("../views/IndustrialRegister/AssetManagement/components/AssetsConfig.vue"),
//           meta: {
//             group: '/industrial-register'
//           }
//         }
//       ],
//       meta: {
//         roles: [
//           {
//             key: "apartment_management",
//             value: "read"
//           }
//         ],
//         group: '/industrial-register'
//       }
//     },
//     {
//       path: "/management-by-rent",
//       name: "租赁管理",
//       icon: 'rental-housing',
//       component: () => import("../views/ManagementByRent/ManagementByRent.vue"),
//       meta: {
//         roles: [
//           {
//             key: "rent_order_management",
//             value: "read"
//           }
//         ],
//         group: '/management-by-rent'
//       }
//     },

//     {
//       path: "/bookkeeping-charge",
//       name: "记账收费",
//       icon: 'bookkeeping-charge',
//       component: () => import("../views/BookkeepingCharge/index.vue"),
//       children: [
//         {
//           path: "/bookkeeping-charge/price-detail",
//           name: "价格管理详情",
//           component: () => import("../views/PublicHousingManagement/Price/ChangePrice.vue"),
//           meta: {
//             group: '/bookkeeping-charge'
//           }
//         },
//       ],
//       meta: {
//         roles: [
//           {
//             key: "bill_management",
//             value: "read"
//           }
//         ],
//         group: '/bookkeeping-charge'
//       }
//     },
//     {
//       path: "/maintenance-management",
//       name: "维修管理",
//       icon: 'maintenance-management',
//       component: () => import("../views/MaintenanceManagement/index.vue"),
//       meta: {
//         roles: [
//           {
//             key: "maintenance_management",
//             value: "read"
//           }
//         ],
//         group: '/maintenance-management'
//       }
//     },
//     {
//       path: "/statistical-data",
//       name: "统计数据",
//       icon: 'statistical-data',
//       component: () => import("../views/StatisticalData/index.vue"),
//       meta: {
//         roles: [
//           {
//             key: "statistic_data_management",
//             value: "read"
//           }
//         ],
//         group: '/statistical-data'
//       }
//     },
//     {
//       path: "/user-management",
//       name: "用户管理",
//       icon: 'residence-management',
//       component: () => import("../views/UserManagement/Index.vue"),
//       meta: {
//         roles: [
//           {
//             key: "user_management",
//             value: "read"
//           }
//         ],
//         group: '/user-management'
//       }
//     },
//     {
//       path: "/my-department",
//       name: "部门租赁查询",
//       icon: 'residence-management',
//       component: () => import("../views/MyDepartement/index.vue"),
//       meta: {
//         roles: [
//           {
//             key: "my_department_order_management",
//             value: "read"
//           }
//         ],
//         group: '/my-department'
//       }
//     },
//     {
//       path: "/system-management",
//       name: "系统设置",
//       icon: 'residence-management',
//       component: () => import("../views/RegisteredResidenceManagement/index.vue"),
//       meta: {
//         roles: [
//           {
//             key: "system_setting_management",
//             value: "read"
//           }
//         ],
//         group: '/system-management'
//       }
//     },
//     {
//       path: "/OM",
//       name: "操作手册",
//       icon: 'residence-management',
//       component: () => import("../views/AdminOM.vue"),
//       meta: {
//         group: '/OM'
//       }
//     },
//   ]
// },];