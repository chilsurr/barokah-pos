
import { Layout } from "antd";
const {Header,Content,Sider,Footer} = Layout


function MainLayout() {
    return(
        <>
            <Layout>
                <Header>
                    <div>BAROKAH</div>
                </Header>
                <Layout>
                    <Content></Content>
                    <Sider></Sider>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout