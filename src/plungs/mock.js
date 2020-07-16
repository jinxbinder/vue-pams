
const getMenuList = function(){
    let menuList = [];
    let menuObj = {
            
            id:"1",
            path: "/1",
            name: "导航一",
            icon:'el-icon-menu',
            children: [
              {
                id:"3",
                path: "/user/userLists",
                name: "导航1-1",
                icon:'el-icon-menu',
                children: [
                  {
                    id: "5",
                    path: "/1/1/1",
                    name: "导航1-1-1",
                    icon:'el-icon-menu',
                  },
                  {
                    path: "/1/1/2",
                    name: "导航1-1-2",
                    icon:'el-icon-menu',
                  },
                  {
                    path: "/1/1/3",
                    name: "导航1-1-3",
                    icon:'el-icon-menu',
                  }
                ]
              },
              {
                id: "7",
                path: "/1/2",
                name: "导航1-2",
                icon:'el-icon-menu',
              }
            ],
        id:"2",
        path: "/2",
        name: "导航二",
        icon:'el-icon-menu'    
    }
    menuList.push(menuObj)
    return {
        menuList: menuList
    }
    
}
export {
    getMenuList
}
