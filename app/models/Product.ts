import Model from './Model';
interface ProductDB {
    id: number;
	name: string;
	price: number;
	barcode: string;
	product_group_id: number;
}

class Product extends Model {
    id?: number;
	name: string;
	price: number;
	barcode: string;
	product_group_id: number;
    tableName = 'products';
    static getTableName(): string {
        return 'products';
    }
    constructor({ productDB, productForm }: { productDB?: ProductDB, productForm?: any }) {
        super();
        if (productForm) {
            this.name = productForm.name;
			this.price = productForm.price;
			this.barcode = productForm.barcode;
			this.product_group_id = productForm.product_group_id;
        } else {
            if (!productDB) throw new Error('productsDB is null');
            this.id = productDB.id;
			this.name = productDB.name;
			this.price = productDB.price;
			this.barcode = productDB.barcode;
			this.product_group_id = productDB.product_group_id;
        }
    }
    toDB(): { [key: string]: any } {
        // TODO: implement
        return { id: this.id,  name: this.name,  price: this.price,  barcode: this.barcode,  product_group_id: this.product_group_id};
    }
    toForm(): any {
        // TODO: implement
        return { id: this.id,  name: this.name,  price: this.price,  barcode: this.barcode,  product_group_id: this.product_group_id};
    }
}
