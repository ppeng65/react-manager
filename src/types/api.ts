// 接口类型定义

export interface RequestResult<T = any> {
    code: number
    data: T
    msg: string
}

export interface ResultData<T = any> {
    list: T[]
    page: {
        pageNum: number
        pageSize: number
        total: number | 0
    }
}

export interface PageParams {
    pageNum?: number | undefined
    pageSize?: number | undefined
}

export namespace Login {
    export interface params {
        userName: string
        userPwd: string
    }
}

export namespace User {
    export interface UserInfo {
        _id: string
        userId: number
        userName: string
        userEmail: string
        deptId: string
        state: number
        role: number
        roleList: string
        deptName: string
        userImg: string
        job: string
        mobile: string
        createId: number
    }

    export interface Params extends PageParams {
        userId?: number
        userName?: string
        state?: number
    }

    export interface CreateParams {
        userName: string
        userEmail: string
        mobile?: number
        deptId: string
        job?: string
        state?: number
        roleList: string[]
        userImg: string
    }

    export interface EditParams extends CreateParams, DeleteParams {}

    export interface DeleteParams {
        userIds: number[]
    }
}

export namespace Dashboard {
    export interface ReportData {
        driverCount: number
        totalMoney: number
        orderCount: number
        cityNum: number
    }

    export interface LineData {
        label: string[]
        order: number[]
        money: number[]
    }

    export interface PieData {
        value: number
        name: string
    }

    export interface RadarData {
        indicator: { name: string; max: number }[]
        data: { name: string; value: number[] }[]
    }
}

export namespace Dept {
    export interface Params {
        deptName?: string
    }

    export interface DeptItem {
        _id: string
        deptName: string
        parentId: string
        userName: string
        createTime: string
        updateTime: string
        children: DeptItem[]
    }

    export interface CreateParams {
        parentId?: string
        deptName: string
        userName: string
    }

    export interface EditParams extends CreateParams, DeleteParams {}

    export interface DeleteParams {
        _id: string
    }
}

export namespace Menu {
    export interface Params {
        menuName: string
        menuState: number
    }

    export interface MenuItem extends CreateParams {
        _id: string
        createTime: string
        buttons?: MenuItem[]
        children?: MenuItem[]
    }

    export interface CreateParams {
        menuName: string
        icon?: string
        menuType: number // 1: 菜单 2: 按钮 3: 页面
        menuState: number // 1: 正常 2: 停用
        menuCode?: string
        parentId?: string
        path: string
        component: string
        orderBy: number
    }

    export interface EditParams extends CreateParams, DeleteParams {}

    export interface DeleteParams {
        _id: string
    }
}

export namespace Role {
    export interface Params extends PageParams {
        roleName?: string
    }

    export interface RoleItem extends CreateParams {
        _id: string
        createTime: string
        updateTime: string
        createId: number
        permissionList: {
            checkedKeys: string[]
        }
    }

    export interface CreateParams {
        roleName: string
        remark?: string
    }

    export interface EditParams extends CreateParams, DeleteParams {}

    export interface DeleteParams {
        _id: string
    }

    export interface CreatePermission {
        _id: string
        permissionList: {
            checkedKeys: string[]
            halfCheckedKeys: string[]
        }
    }
}

export namespace Order {
    export enum IState {
        doing = 1,
        done = 2,
        timeout = 3,
        cancel = 4
    }

    export interface Params extends PageParams {
        orderId?: string
        userName?: string
        state?: IState
    }

    export interface CreateParams {
        cityName: string
        userName: string
        mobile: number
        startAddress: string
        endAddress: string
        orderAmount: number
        userPayAmount: number
        driverAmount: number
        // 1: 微信 2: 支付宝
        payType: number
        driverName: string
        vehicleName: string
        // 1: 进行中 2: 已完成 3: 超时 4: 取消
        state: IState
        useTime: string
        endTime: string
    }

    export interface OrderItem extends CreateParams {
        _id: string
        orderId: string
        route: Array<{ lng: string; lat: string }>
        createTime: string
        remark: string
    }

    export interface DictItem {
        id: string
        name: string
    }

    export interface OrderRoute {
        orderId: string
        route: { lng: string; lat: string }[]
    }
}

export namespace Driver {
    export enum IState {
        auth = 0, // 待认证
        normal = 1, // 正常
        temp = 2, // 暂时拉黑
        always = 3, // 永久拉黑
        stop = 4 // 停止推送
    }

    export interface Params extends PageParams {
        driverName?: string
        accountStatus?: IState
    }

    export interface DriverItem {
        driverName: string
        driverId: number
        driverPhone: string
        cityName: string
        grade: boolean
        driverLevel: number
        accountStatus: IState
        carNo: string
        vehicleBrand: string
        vehicleName: string
        onlineTime: number
        driverAmount: number
        rating: number
        driverScore: number
        pushOrderCount: number
        orderCompleteCount: number
        createTime: number
    }
}
