import React, {useState} from "react";
import {TFunction, withTranslation} from "next-i18next";
import axios from "axios";
import {Col, Form, Input, Row, Space, Tag, Typography} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import Image from "next/image";

import {Button, Card, Option, Select} from '@components'
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

const Home: React.FC<{ t: TFunction }> = ({t}) => {
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        setLoading(true);
        setData(null);
        axios.get('/api/sentence', {
            params: values
        }).then(res => {
            setLoading(false);
            setData(res.data)
            console.log(res);
        }).catch(error => {
            setLoading(false);
            setData({});
        })
    };
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({});
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const ttt = 'Online offensive sentence checker. To check the text please type or paste it into the field below and click Check text.'
    const title = () => (
        <div style={{whiteSpace: 'normal'}}>
            <Row wrap={false} gutter={16}>
                <Col flex="none">
                    <Space align="center" direction={"horizontal"}>
                        <Image src="/icons/homepage-icon.png" alt="xxx" width="130px" height="100px"/>
                    </Space>
                </Col>
                <Col flex="auto">
                    <Typography>
                        <Title>Sentence Checker</Title>
                        <Paragraph>
                            {ttt}
                        </Paragraph>
                    </Typography>
                </Col>
            </Row>
        </div>
    )
    return (
        <Row justify="center" align="middle" style={{backgroundColor : 'rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Col span={12}>
                <Card title={title()}
                      hoverable
                      actions={[
                          (<Space align="start" direction={"horizontal"}>
                              <Button type="primary" htmlType="submit" loading={loading} onClick={() => form.submit()}>
                                  Submit
                              </Button>
                          </Space>),
                          (<Space align="start" direction={"horizontal"}>
                              {(data?.result === 'OFF' ? <Tag style={{marginTop:'5px'}}  icon={<CloseCircleOutlined/>} color="error">
                                  offensive
                              </Tag> : data?.result === 'NOT' ? <Tag style={{marginTop:'5px'}} icon={<CheckCircleOutlined/>} color="success">
                                  non-offensive
                              </Tag> : null)}
                          </Space>)
                      ]}
                >
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{embedding: 'bert'}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item name="sentence" rules={[{required: true}]}>
                            <Input.TextArea placeholder={'Please input your sentence!'}/>
                        </Form.Item>
                        <Form.Item name="embedding" rules={[{required: true}]}>
                            <Select
                                defaultValue={"bert"}
                                placeholder="Select an embedding"
                            >
                                <Option value="bert">bert</Option>
                                <Option value="glove">glove</Option>
                                <Option value="word2vec">word2vec</Option>
                            </Select>
                        </Form.Item>
                        {/*{data && (<Form.Item {...tailLayout}>*/}

                        {/*</Form.Item>)}*/}
                    </Form>
                </Card>
            </Col>
        </Row>

    )
}

export default withTranslation(['home', 'common'])(Home)
