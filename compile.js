//this is for simple optertion
function lexer(input) {
    console.log("this is lexer");
    const tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        if (/\s/.test(char)) {
            cursor++;
            continue;
        }

        if (/[a-zA-Z]/.test(char)) {
            let word = '';
            while (/[a-zA-Z0-9]/.test(char)) {
                word += char;
                char = input[++cursor];
            }
            if (word === 'ye' || word === 'bol') {
                tokens.push({ type: 'keyword', value: word });
            }
            else {
                tokens.push({ type: 'identifer', value: word });
            }

            continue;
        }

        if(/[0-9]/.test(char)){
            let num = '';
            while(/[0-9]/.test(char)){
                num += char;
                char = input[++cursor];
            }
            tokens.push({type: 'number',value : parseInt(num)});
            continue;
        }

        if(/[\+\-\*\/\=]/.test(char)){
            tokens.push({type: 'operator', value : char});
            cursor++;
            continue;
        }


    }
    console.log(tokens);

    return tokens;

}


function parser(tokens){
    const ast = {
        type: "Program",
        body : []
    };
    while(tokens.length > 0){
        let tokens = tokens.shift();

        if (tokens.type === 'keyword' && tokens.value  === 'ye')  {
            let declaration = {
                type: "Declaration",
                name:tokens.shift().value  ,
                value : null
            };
        }

        //cheak for assmi
        if(tokens[0].type === 'opertor' && tokens[0].value === '='){
            tokens.shift();

            let expression = '';
            while(tokens.length>0 && tokens[0].type !== 'keyword'){
                expression += tokens.shift().value
            }
            declaration.value = expression.trim();
        }
        ast.body.push(declaration);
        
    }
    if(tokens.type === 'keyword' && tokens.value === 'bol'){
        ast.body.push({
            type: 'Print',
            expression: token.shift().value 
        });
    }
    return ast;
}

function codeGen(node){
    switch (node.type) {
        case 'Program': return node.body.map(codeGen).join('\n');
        case 'Declaration': return `const &{node.name} = &{node.value};`
        case 'Print': return `console.log${node.expression}`
    }
}

function compliter(input) {
    // console.log("this is compiler");
    const tokens = lexer(input);
    const ast = perser(tokens);
    const executableCode = codeGen(ast);
    return executableCode;
    // console.log(tokens);
}

function runner(input){
    eval(input)
}



const code = `
ye x = 10;
ye y = 20;

ye sum = x +y;

bol sum;
`;


const exu =  compliter(code);
runner(exu);