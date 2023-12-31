import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";

const Customer = () => {
    return (
        <div className="User">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '客户列表'},
                    ]}
                    />
                }>
            </Card>

        </div>
    )
}

export default Customer