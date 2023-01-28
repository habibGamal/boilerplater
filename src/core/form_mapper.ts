import fs from 'fs';
type Field = { name: string, label: string, type: string, required?: boolean, hasAddButton?: boolean, min?: number };
type Forms = { [key: string]: { fields: Field[] } };
class FormMapper {
    private createFormItem(field: Field) {
        let formItem = 
        `
            <Form.Item
                name="${field.name}"
                label="${field.label}"
                rules={[
                    $$rules$$
                ]}
            >
                $$field_type$$
            </Form.Item>`
        switch (field.type) {
            case 'text':
                formItem = formItem.replace('$$field_type$$', `<Input />`);
                break;
            case 'number':
                if (field.min !== undefined) {
                    formItem = formItem.replace('$$field_type$$', `<InputNumber min={${field.min}} />`);
                } else {
                    formItem = formItem.replace('$$field_type$$', `<InputNumber />`);
                }
                break;
            case 'select':
                formItem = formItem.replace('$$field_type$$',
                    `<Select>
                        <Select.Option value="1">Option 1</Select.Option>
                        <Select.Option value="2">Option 2</Select.Option>
                        <Select.Option value="3">Option 3</Select.Option>
                    </Select>`);
                break;
            default:
                break;
        }
        if (field.required) {
            formItem = formItem.replace('$$rules$$', `{ required: true, message: 'هذا الحقل مطلوب'`);
        } else {
            formItem = formItem.replace('$$rules$$', '');
        }
        return formItem;
    }
    createFormItems(fields: Field[]) {
        let formItems = '';
        fields.forEach(field => {
            formItems += this.createFormItem(field) + '\n';
        });
        return formItems;
    }
}


const formMapper = () => new FormMapper();

export function formBuilder(form: {
    fields: Field[];
}) {
    const form_items = formMapper().createFormItems(form.fields);
    return { form_items }
}


export function generateForms(currentBoilerplate: {
    table_name: string,
    model_name: string,
    forms: Forms

}) {
    fs.readFile('src/form.tsx', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        // loop over forms
        for (const formName in currentBoilerplate.forms) {
            const currentForm = currentBoilerplate.forms[formName];
            const form = formBuilder(currentForm);

            let fileContent = data.replace(/\$\$form_name\$\$/g, formName);
            fileContent = fileContent.replace(/\$\$form_items\$\$/g, form.form_items);
            // write the new file content to the file
            fs.writeFile(`app/forms/${formName}.tsx`, fileContent, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    });
}