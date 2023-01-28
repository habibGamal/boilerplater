import fs from 'fs';
export class SchemaMapper {
    statment: string = '';
    id() {
        this.statment += ' UNSIGNED INT AUTO_INCREMENT NOT NULL %%PRIMARY_KEY%%';
        return this;
    }
    string(varcharLength = 255) {
        this.statment += ` VARCHAR(${varcharLength}) NOT NULL`;
        return this;
    }
    text() {
        this.statment += ' TEXT NOT NULL';
        return this;
    }
    int() {
        this.statment += ' INT NOT NULL';
        return this;
    }
    bigInt() {
        this.statment += ' BIGINT NOT NULL';
        return this;
    }
    unique() {
        this.statment += ' UNIQUE';
        return this;
    }
    forign({ reference, on, onDelete }: { reference: string, on: string, onDelete: string }) {
        this.statment += `FOREIGN KEY (${reference}) REFERENCES ${on}(id) ON DELETE ${onDelete}`;
        return this;
    }
    autoIncrement() {
        this.statment += ' AUTO_INCREMENT';
        return this;
    }
    default(value: any) {
        this.statment += ` DEFAULT ${value}`;
        return this;
    }
    nullable() {
        this.statment.includes('NOT NULL') && (this.statment = this.statment.replace('NOT NULL', 'NULL'));
        return this;
    }    
}

export function schemaBuilder(schema: { [key: string]: SchemaMapper | SchemaMapper[] }) {
    let statment = '';
    let primaryKey = ''
    for (const key in schema) {
        if (Array.isArray(schema[key])) {
            const mappers = schema[key] as SchemaMapper[];
            // for forign keys
            statment += `${mappers.map((item) => item.statment).join(',')},\n\t`;
        } else {
            const mapper = schema[key] as SchemaMapper;
            statment += `${key}${mapper.statment},\n\t`;
            // if primary key is set then remove %%PRIMARY_KEY%% and 
            // save the primary key to add it later
            if (mapper.statment.includes('%%PRIMARY_KEY%%')) {
                primaryKey = key;
            }
            statment = statment.replace('%%PRIMARY_KEY%%', '');
        }
    }
    if (primaryKey) {
        // add primary key before 'FOREIGN KEY' statment
        statment = statment.replace('FOREIGN KEY', `PRIMARY KEY (${primaryKey}),\n\tFOREIGN KEY`);
    }
    statment = statment.replace(/,\s*$/, "");
    return statment;
}
export function generateSchema(currentBoilerplate: {
    table_name: string,
    schema: {
        [key: string]: SchemaMapper | SchemaMapper[];
    }
}) {
    fs.readFile('src/schema.sql', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        // replace the file content with the table name and schema
        let fileContent = data.replace('$$schema$$', schemaBuilder(currentBoilerplate.schema));
        fileContent = fileContent.replace('$$table_name$$', currentBoilerplate.table_name);
        // write the new file content to the file
        fs.writeFile(`app/schema/${currentBoilerplate.table_name}.sql`, fileContent, (err) => {
            if (err) {
                console.log(err);
            }
        })
    });
}
const Schema = () => new SchemaMapper();
export default Schema;