import Schema from "../core/schema_mapper";

const product = {
    model_name: 'Product',
    table_name: 'products',
    state: 'replace', // 'replace'|'reversion';
    preform: ['all'], // ['all'|'schema','forms','views','modals']
    schema: {
        id: Schema().id(),
        name: Schema().string(),
        price: Schema().int(),
        barcode: Schema().string().unique(),
        product_group_id: Schema().bigInt(),
        forign_keys: [
            Schema().forign({ reference: 'product_group_id', on: 'product_group', onDelete: 'cascade' }),
        ],
    },
    forms:
    {
        create_update: {
            fields: [
                { name: 'name', label: 'Product Name', type: 'text', required: true, },
                { name: 'price', label: 'Product Price', type: 'number', min: 0, required: true, },
                { name: 'barcode', label: 'Product Barcode', type: 'text', required: true, },
                { name: 'product_group_id', label: 'Product Price', type: 'select', required: true, hasAddButton: true },
            ]
        }
    }
    ,
    // views: [
    //     {
    //         name: 'CreateProduct',
    //         title: 'Create Product',
    //         forms: [this.forms.create_update],
    //         tables: {
    //             display_products: {
    //                 providedData: 'all',
    //                 // filters
    //                 // search
    //                 // sortBy
    //                 pagination: {
    //                     pageSize: 10,
    //                 },
    //                 actions: ['delete', 'edit']
    //             }
    //         }
    //     },
    //     {
    //         name: 'ExpiredProducts',
    //         title: 'Expired Products',
    //         tables: {
    //             display_products: {
    //                 providedData: 'all_with_condition',
    //                 // filters
    //                 // search
    //                 // sortBy
    //                 pagination: {
    //                     pageSize: 10,
    //                 },
    //                 actions: ['custom_action', 'custom_action']
    //             }
    //         }
    //     }
    // ],
    modals: [
        {
            name: 'ExpiredProducts',
            title: 'Expired Products',
            tables: {
                display_products: {
                    providedData: 'all_with_condition',
                    // filters
                    // search
                    // sortBy
                    pagination: {
                        pageSize: 20,
                    },
                    actions: ['custom_action', 'custom_action']
                }
            }
        }
    ]
}
export default product;