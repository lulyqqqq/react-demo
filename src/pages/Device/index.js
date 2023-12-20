import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";

const Device = () => {
    return (
        <div className="User">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '设备列表'},
                    ]}
                    />
                }>
            </Card>

        </div>
    )
}

export default Device