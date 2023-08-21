import request from '@/utils/request.ts'
import { Dashboard, Login, User, ResultData, Dept, Menu, Role, Order, Driver } from '@/types/api.ts'

export default {
    // 登录
    login(params: Login.params) {
        return request.post<string>('/users/login', params, { showLoading: false })
    },
    // 获取权限列表
    getPermissionList() {
        return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
    },
    // 获取用户信息
    getUserInfo() {
        return request.get<User.UserInfo>('/users/getUserInfo')
    },
    getReportData() {
        return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
    },
    getLineData() {
        return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
    },
    getPieCityData() {
        return request.get<Dashboard.PieData>('/order/dashboard/getPieCityData')
    },
    getPieAgeData() {
        return request.get<Dashboard.PieData>('/order/dashboard/getPieAgeData')
    },
    getRadarData() {
        return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
    },
    // 用户列表
    getSystemUserList(params: User.Params) {
        return request.get<ResultData<User.UserInfo>>('/users/list', params)
    },
    createUser(params: User.CreateParams) {
        return request.post('/users/create', params)
    },
    editUser(params: User.EditParams) {
        return request.post('/users/edit', params)
    },
    deleteUser(params: User.DeleteParams) {
        return request.post('/users/delete', params)
    },
    getAllRole() {
        return request.get<Role.RoleItem[]>('/roles/allList')
    },
    // 部门列表
    getDeptList(params?: Dept.Params) {
        return request.get<Dept.DeptItem[]>('/dept/list', params)
    },
    getAllUserList() {
        return request.get<User.UserInfo[]>('/users/all/list')
    },
    createDept(params: Dept.CreateParams) {
        return request.post('/dept/create', params)
    },
    editDept(params: Dept.EditParams) {
        return request.post('/dept/edit', params)
    },
    deleteDept(params: Dept.DeleteParams) {
        return request.post('/dept/delete', params)
    },
    // 菜单列表
    getMenuList(params?: Menu.Params) {
        return request.get<Menu.MenuItem[]>('/menu/list', params)
    },
    createMenu(params: Menu.CreateParams) {
        return request.post('/menu/create', params)
    },
    editMenu(params: Menu.EditParams) {
        return request.post('/menu/edit', params)
    },
    deleteMenu(params: Menu.DeleteParams) {
        return request.post('/menu/delete', params)
    },
    // 角色列表
    getRoleList(params: Role.Params) {
        return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
    },
    createRole(params: Role.CreateParams) {
        return request.post('/roles/create', params)
    },
    editRole(params: Role.EditParams) {
        return request.post('/roles/edit', params)
    },
    delteRole(params: Role.DeleteParams) {
        return request.post('/roles/delete', params)
    },
    updatePermission(params: Role.CreatePermission) {
        return request.post('/roles/update/permission', params)
    },
    // 订单列表
    getOrderList(params: Order.Params) {
        return request.get<ResultData<Order.OrderItem>>('/order/list', params)
    },
    getCityList() {
        return request.get<Order.DictItem[]>('/order/cityList')
    },
    getVehicleList() {
        return request.get<Order.DictItem[]>('/order/vehicleList')
    },
    createOrder(params: Order.CreateParams) {
        return request.post('/order/create', params)
    },
    deleteOrder(orderId: string) {
        return request.post('/order/delete', { _id: orderId })
    },
    getOrderDetail(orderId: string) {
        return request.get<Order.OrderItem>('/order/detail/' + orderId)
    },
    updateOrderInfo(params: Order.OrderRoute) {
        return request.post('/order/edit', params)
    },
    exportOrder(params: Order.Params) {
        return request.download('/order/orderExport', params)
    },
    orderCluster(id: string) {
        return request.get<Array<{ lng: string; lat: string }>>('/order/cluster/' + id)
    },
    getDriverList(params: Driver.Params) {
        return request.get<ResultData<Driver.DriverItem>>('/order/driver/list', params)
    }
}
