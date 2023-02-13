import _ from 'lodash';
import parse from './parsers.js';
import { getFormat,readFile } from './utils.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') =>{
    const file1 = readFile(filePath1);
    const file2 = readFile(filePath2);

    const obj1 = parse(file1,getFormat(filePath1));
    const obj2 = parse(file2,getFormat(filePath2));

    const keys = _.sortBy(_.union(Object.keys(obj1),( Object.keys(obj2))));
    
    const result = keys.reduce((acc,key) =>{
        if(_.has(obj1,key) && !_.has(obj2,key)){
            acc += `- ${key}: ${obj1[key]}\n`
        }
        else if(_.has(obj2,key) && !_.has(obj1,key)){
            acc += `+ ${key}: ${obj2[key]}\n`
        }
        else if(obj1[key] === obj2[key]){
            acc += `  ${key}: ${obj1[key]}\n`;
        }
        else{
            acc += `- ${key}: ${obj1[key]}\n`;
            acc += `+ ${key}: ${obj2[key]}\n`;
        }
        return acc;
    },'');
    return `{\n${result}}`;
};
export default genDiff;