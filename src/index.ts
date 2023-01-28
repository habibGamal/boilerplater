import fs from 'fs';
import product from './boilerplates/product';
import  { generateSchema } from './core/schema_mapper';
import { generateModel } from './core/model_mapper';
import { generateForms } from './core/form_mapper';
const currentBoilerplate = product;
// read schema.sql file
generateSchema(currentBoilerplate);
generateModel(currentBoilerplate);
generateForms(currentBoilerplate);