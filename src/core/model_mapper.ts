import fs from 'fs';
import { SchemaMapper } from './schema_mapper';
type Schema = { [key: string]: SchemaMapper | SchemaMapper[] };

class ModelMapper {
    private reshapeSchema(skip: string[], callback: (key: string, value: SchemaMapper) => string, removedChars: number, schema: Schema) {
        let buildNewShape = '';
        for (let key in schema) {
            // if key is in skip array, continue
            if (skip.includes(key)) continue;
            if (schema.hasOwnProperty(key)) {
                let value = schema[key];
                if (value instanceof SchemaMapper) {

                    buildNewShape += callback(key, value);
                }
            }
        }
        buildNewShape = buildNewShape.substring(0, buildNewShape.length - removedChars);
        return buildNewShape;
    }

    deriveModelDBInterface(schema: Schema) {
        return this.reshapeSchema(['forign_keys'], (key, value) => `${key}: ${this.deriveType(value)};\n\t`, 2, schema);
    }

    deriveModelProps(schema: Schema) {
        const props = this.deriveModelDBInterface(schema);
        if (props.includes('id')) {
            return props.replace('id: number', 'id?: number');
        }
        return props;
    }

    deriveModelFromForm(modelName: string, schema: Schema) {
        return this.reshapeSchema(['forign_keys', 'id'], (key, value) => `this.${key} = ${modelName.toLowerCase()}Form.${key};\n\t\t\t`, 4, schema);
    }

    deriveModelFromDB(modelName: string, schema: Schema) {
        return this.reshapeSchema(['forign_keys'], (key, value) => `this.${key} = ${modelName.toLowerCase()}DB.${key};\n\t\t\t`, 4, schema);
    }
    serializeModelProps(schema: Schema) {
        let serialize = '{';
        serialize += this.reshapeSchema(['forign_keys'], (key, value) => ` ${key}: this.${key}, `, 2, schema);
        serialize += '}';
        return serialize;
    }
    private deriveType(schemaMapper: SchemaMapper) {
        let statement = schemaMapper.statment;
        
        if (statement.includes('INT')) return 'number';

        if (statement.includes('VARCHAR')) return 'string';

        if (statement.includes('TEXT')) return 'string';

        if (statement.includes('DATE')) return 'Date';

        if (statement.includes('DATETIME')) return 'Date';

        if (statement.includes('TIMESTAMP')) return 'Date';

        if (statement.includes('DECIMAL')) return 'number';

        if (statement.includes('FLOAT')) return 'number';

        if (statement.includes('DOUBLE')) return 'number';

        if (statement.includes('BOOLEAN')) return 'boolean';

        if (statement.includes('JSON')) return 'any';

        throw new Error('Unknown type');
    }
}

const modelMapper = () => new ModelMapper();

export function modelBuilder(boilerplate: {
    table_name: string;
    model_name: string;
    schema: Schema
}) {
    // model_db_interface
    const model_db_interface = modelMapper().deriveModelDBInterface(boilerplate.schema);
    const model_props = modelMapper().deriveModelProps(boilerplate.schema);
    const init_model_props_from_form = modelMapper().deriveModelFromForm(boilerplate.model_name, boilerplate.schema);
    const init_model_props_from_db = modelMapper().deriveModelFromDB(boilerplate.model_name, boilerplate.schema);
    return { model_db_interface, model_props, init_model_props_from_form, init_model_props_from_db }
}
export function generateModel(currentBoilerplate: {
    table_name: string,
    model_name: string,
    schema: {
        [key: string]: SchemaMapper | SchemaMapper[];
    }
}) {
    fs.readFile('src/model.ts', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const model = modelBuilder(currentBoilerplate);
        let fileContent = data.replace(/\$\$model_name\$\$/g, currentBoilerplate.model_name);
        fileContent = fileContent.replace(/\$\$table_name\$\$/g, currentBoilerplate.table_name);
        fileContent = fileContent.replace(/\$\$model_name_lower\$\$/g, currentBoilerplate.model_name.toLowerCase());
        fileContent = fileContent.replace(/\$\$model_db_interface\$\$/g, model.model_db_interface);
        fileContent = fileContent.replace(/\$\$model_props\$\$/g, model.model_props);
        fileContent = fileContent.replace(/\$\$init_model_props_from_form\$\$/g, model.init_model_props_from_form);
        fileContent = fileContent.replace(/\$\$init_model_props_from_db\$\$/g, model.init_model_props_from_db);
        fileContent = fileContent.replace(/\$\$serialize\$\$/g, modelMapper().serializeModelProps(currentBoilerplate.schema));
        // write the new file content to the file
        fs.writeFile(`app/models/${currentBoilerplate.model_name}.ts`, fileContent, (err) => {
            if (err) {
                console.log(err);
            }
        })
    });
}
const Schema = () => new SchemaMapper();
export default Schema;

// implement function replace all in node js
// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript