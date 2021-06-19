const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';




class Field {
    constructor(field){
        this.field = field;
        this.indexPosX = 0 ;
        this.indexPosY = 0;
    }

    print(){
        //put * where index is 
        this.field[this.indexPosY][this.indexPosX] = pathCharacter;
    
        //print the field
        for (let i=0; i<this.field.length; i++){
            console.log(this.field[i].join(" "));
        }       
    }


    move(letter){
        switch(letter){
            case "d":
                    this.indexPosY += 1;
                break;

            case "r": 
                    this.indexPosX += 1;
                break;

            case "u":
                    this.indexPosY -= 1;
                break;

            case "l": 
                    this.indexPosX -= 1;
                break;
            default:
                //nothing
        }
    }


    static generateField(x,y,percentageOfHoles){

        let fieldArr = [];

        let reqNumOfHoles = percentageOfHoles * (x*y);
        let numOfHoles = 0;


        //generate empty field array
        for (let i=0; i<y; i++){
            fieldArr[i] = [];
            for (let j=0; j<x; j++){
                    fieldArr[i][j] = fieldCharacter;
            }
        }

        //generate reqNumOfHoles different numbers betwen 0 and x/y and place them at these indices in the fieldArr
        for (let h=0; h<reqNumOfHoles; h++){

                let numX = Math.floor(Math.random()*x);
                let numY = Math.floor(Math.random()*y)
                
                fieldArr[numY][numX] = hole; 

                numOfHoles++;
            
        }

        //put hat in random place: 
        let hatNumX = Math.floor(Math.random()*x);
        let hatNumY = Math.floor(Math.random()*y);

        fieldArr[hatNumX][hatNumY] = hat;

        //return fieldArr
        return fieldArr;
    }

}


function testField(x, y, field){

    //move outside of the field
    if (y > field.length-1 || y < 0 || x > field[0].length-1 || x < 0){
        console.log('You moved outside the field');
        return false;
    }
    //move on a hole
    else if (field[y][x] === hole){
        console.log('You stepped on a hole');
        return false;
    }
    //move on hat
    else if (field[y][x] === hat){
        console.log('Congratulations, you got your head!');
        return false;
    }
    else {
       return true;
    }
}



//generate random field array
const fieldArr= Field.generateField(10,10,0.2); 
//console.log(fieldArr)

//create field:
const newField = new Field(fieldArr);


console.clear();
//loop to play:
while(testField(newField.indexPosX, newField.indexPosY, newField.field) === true){
    
    newField.print();
    const letter = prompt('Which direction? (d - down, u - up, r - right, l - left)  ');
    newField.move(letter);
    console.clear();

} 











