import {Breadcrumb, Card, } from "antd";
import {Link} from "react-router-dom";

const UpdateUser = () => {
    return (
        <div className="User">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/user'}>用户管理</Link>},
                        {title: '更新用户'},
                    ]}
                    />
                }>
            </Card>

        </div>
    )
}

export default UpdateUser