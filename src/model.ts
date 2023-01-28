import Model from './Model';
interface $$model_name$$DB {
    $$model_db_interface$$
}

class $$model_name$$ extends Model {
    $$model_props$$
    tableName = '$$table_name$$';
    static getTableName(): string {
        return '$$table_name$$';
    }
    constructor({ $$model_name_lower$$DB, $$model_name_lower$$Form }: { $$model_name_lower$$DB?: $$model_name$$DB, $$model_name_lower$$Form?: any }) {
        super();
        if (productForm) {
            $$init_model_props_from_form$$
        } else {
            if (!$$model_name_lower$$DB) throw new Error('$$table_name$$DB is null');
            $$init_model_props_from_db$$
        }
    }
    toDB(): { [key: string]: any } {
        // TODO: implement
        return $$serialize$$;
    }
    toForm(): any {
        // TODO: implement
        return $$serialize$$;
    }
}
