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
            name="$$form_name$$"
            onFinish={onFinish}
            initialValues={model.toForm()}
            className='p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 '
            layout="vertical"
            scrollToFirstError
        >
            $$form_items$$

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