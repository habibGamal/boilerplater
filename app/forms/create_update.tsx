import { Space } from 'antd';
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
} from 'antd';
import React, { useState } from 'react';
import ButtonSax from './ButtonSax';


const { Option } = Select;


const formItemLayout = {
    labelCol: {
        md: {
            span: 12
        },
        lg: {
            span: 24
        },
        xl: {
            span: 20
        }
    },
    wrapperCol: {
        md: {
            span: 12
        },
        lg: {
            span: 24
        },
        xl: {
            span: 20
        }
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 3,
        offset: 0,
    },
};

const FormComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onFinish = (values: any) => {
        setLoading(true);
        // TODO: Implement!
        // model initiate and save in database (use Controller in fureture)
        setTimeout(() => {
            setLoading(false);
        }, 1000)
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="create_update"
            onFinish={onFinish}
            initialValues={model.toForm()}
            className='p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 '
            layout="vertical"
            scrollToFirstError
        >
            
            <Form.Item
                name="name"
                label="Product Name"
                rules={[
                    { required: true, message: 'هذا الحقل مطلوب'
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="price"
                label="Product Price"
                rules={[
                    { required: true, message: 'هذا الحقل مطلوب'
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                name="barcode"
                label="Product Barcode"
                rules={[
                    { required: true, message: 'هذا الحقل مطلوب'
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="product_group_id"
                label="Product Price"
                rules={[
                    { required: true, message: 'هذا الحقل مطلوب'
                ]}
            >
                <Select>
                        <Select.Option value="1">Option 1</Select.Option>
                        <Select.Option value="2">Option 2</Select.Option>
                        <Select.Option value="3">Option 3</Select.Option>
                    </Select>
            </Form.Item>


            <Form.Item className='grid place-items-center mt-8'>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={() => {

                    }}>
                        $$submit_text$$
                    </Button>
                    <Button htmlType="button" onClick={() => { }}>
                        افراغ الحقول
                    </Button>
                </Space>
            </Form.Item>

        </Form>
    );
};

export default FormComponent;