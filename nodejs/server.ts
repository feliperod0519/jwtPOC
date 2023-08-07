import * as express from "express";
const app = express();

interface Person {
    id: number,
    email: string
}

app.get('/', (req, res) => res.send('root thing'));

const people: Person[]=[{id:1,email:'minou@cat-tv.ca'},
                        {id:2,email:'manchitas@fox.ca'}];

function getPeople():Person[]{
    return people;
}

function getPerson(id:number):Person{
    return people.find(x=>x.id===id) as Person;
}

function getPersonByEmail(email:string):Person{
    return people.find(e=>e.email===email) as Person;
}

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
                        
const server = app.listen(8000, "localhost", () => {

   console.log(`Listening on localhost:8000`);
});