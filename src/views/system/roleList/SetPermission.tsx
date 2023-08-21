import { Form, Modal, Tree } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'

import { Menu, Role } from '@/types/api'
import { IAction, IModalProps } from '@/types/modal'

import api from '@/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IModalProps<Role.RoleItem>) => {
    const [visible, setVisible] = useState(false)
    const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])
    const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
    const [permission, setPermission] = useState<Role.CreatePermission>()

    useEffect(() => {
        getMenuList()
    }, [])

    const getMenuList = async () => {
        const data = await api.getMenuList()
        setMenuList(data)
    }

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = (_type: IAction, data?: Role.RoleItem) => {
        setVisible(true)
        setRoleInfo(data)
        setCheckedKeys(data?.permissionList.checkedKeys || [])
    }

    const onCheck = (checkedSelectKeys: any, item: any) => {
        setCheckedKeys(checkedSelectKeys)

        const checkedKeys: string[] = []
        const parentkeys: string[] = []

        item.checkedNodes.forEach((node: Menu.MenuItem) => {
            if (node.menuType === 2) {
                checkedKeys.push(node._id)
            } else {
                parentkeys.push(node._id)
            }
        })

        setPermission({
            _id: roleInfo?._id || '',
            permissionList: {
                checkedKeys,
                halfCheckedKeys: parentkeys.concat(item.halfCheckedKeys)
            }
        })
    }

    const onHandleOk = async () => {
        if (permission) {
            console.log(permission)
            await api.updatePermission(permission)
            message.success('设置成功')
            onHandleCancel()
            props.update()
        }
    }

    const onHandleCancel = () => {
        setVisible(false)
        setPermission(undefined)
    }

    return (
        <Modal open={visible} title='设置权限' width={800} onOk={onHandleOk} onCancel={onHandleCancel}>
            <Form layout='horizontal' labelCol={{ span: 4 }} labelAlign='right'>
                <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
                <Form.Item label='权限'>
                    <Tree
                        checkable
                        defaultExpandAll
                        fieldNames={{
                            title: 'menuName',
                            key: '_id',
                            children: 'children'
                        }}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        treeData={menuList}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
