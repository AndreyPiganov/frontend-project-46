import YAML from 'js-yaml';
const parse = (data, format) =>{
    switch(format){
        case 'json':
            return JSON.parse(data);
        case 'yml':
            YAML.load(data);
        case 'yaml':
            YAML.load(data);
            default: 
            throw new Error(`Invalid format ${format}`);
    }
};
export default parse;