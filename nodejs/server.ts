import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

interface Person {
    id: number,
    email: string,
    bio: string,
    jwt?: string
}

interface Token{
    email: string,
    password: string
}

app.get('/', (req, res) => res.send('root thing'));

const people: Person[]=[{id:1,email:'minou@cat-tv.ca',bio:'soy un gato'},
                        {id:2,email:'manchitas@fox.ca',bio:'soy un zorrito'}];

const tokens: Token[]=[{email:'minou@cat-tv.ca',password:'hello'},
                        {email:'manchitas@fox.ca',password:'hello'}]

function getPeople():Person[]{
    return people;
}

function getPerson(id:number):Person{
    return people.find(x=>x.id===id) as Person;
}

function getPersonByEmail(email:string):Person{
    return people.find(e=>e.email===email) as Person;
}

function validate(email:string,password:string):boolean{
    var t:Token[] = tokens.filter(t=>t.email===email && t.password==password);
    if (t===undefined || t===null)
        return false;
    else if (t.length>0)
        return true;
    return false;
}

const RSA_PRIVATE_KEY = fs.readFileSync('./server.key');

app.get('/api/people', (req, res) => {
                                        res.json(getPeople());
                                      });

app.get('/api/people/:id', (req, res) => {
                                            res.json(getPerson(+req.params.id));
                                         });

app.get('/api/people/email/:email', (req, res) => {
                                            console.log(req.params.email);
                                            res.json(getPersonByEmail(req.params.email));
                                         });
                                    
app.post('/api/authenticate',(req,res)=>{
    var token= req.body;
    console.log('Logging user email: ' + token.email);
    let authentication:boolean = validate(token.email,token.password);
    if (authentication){
        let p = getPersonByEmail(token.email);
        const jwtBearer = jwt.sign({id:p.id,email:p.email},RSA_PRIVATE_KEY,
                    {
                        algorithm: 'RS256',
                        expiresIn: 30,
                        subject: p.email
                    });
        p.jwt = jwtBearer;
        res.json(p);
    }
    else
        res.status(403).json({});
});
                        
const server = app.listen(8000, "localhost", () => {

   console.log(`Listening on localhost:8000`);
});