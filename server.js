/* comands in terminal
* node app - start server
* */

const express = require('express');
const pug = require('pug');
const path = require('path');
//connect the modules


const app = express();//express as function, after that we can start server


app.use(express.json());//json - javascript object notation, dynamic data type
app.use(express.urlencoded());//encode the data

app.set('view engine', 'pug');//app works with pug files
app.set('views', path.join(__dirname, 'static', 'views', 'pages'));//location of static files


class Planets
{
    constructor(namep, capacity,mass) {
        this.namep = namep;
        this.capacity = capacity;
        this.mass = mass;
    }
}

class Goods {
    constructor(code, name, weight) {
        this.code = code;
        this.name = name;
        this.weight = weight;
    }
}
class Delivered_Goods extends Goods {
    constructor(code, name, weight,planets_name,station_code) {
      super(code, name, weight);
      this.code = code;
      this.name = name;
      this.weight = weight;
      this.planets_name=planets_name;
      this.station_code=station_code;
    }
}


class Space_stations {
    constructor(number, capacity,need,planets ) {
        this.number = number;
        this.capacity = capacity;
        this.need = need;
        //this.planets = planets;

    }
}





    let planets = [new Planets ('A', 15,1500), new Planets('B',44, 33330003),
    new Planets('C', 31, 10120)];

     let goods = [new Goods(123, 'V', 15), new Goods(987, 'B', 40),
    new Goods(654, 'C', 38),new Goods(64, 'D', 48),new Goods(61, 'E', 3)];


    let delivered_goods = [];


    let space_stations = [new Space_stations(1,  12, 13, 2),
    new Space_stations(2,  12, 15,4),
    new Space_stations(3, 5, 93, 2),
    new Space_stations(4, 9, 1,1)];

//console.log(accountant(storage));

app.get('/', (req, res) => {//render index (home page)
    res.render('index')
});

app.get('/planets', (req, res) => {
    res.render('planets', {planets: planets})
});

app.post('/addPlanets', (req, res) => {
    let info = req.body;

    let check = planets.filter(value => {
        return value.namep === info.namep
    });

    if (check.length === 0) {
        planets.push(new Planets(info.namep, info.capacity, info.mass))
        res.render('planets', {info: 'Планету успішно додано',planets: planets})
    } else {
        res.render('planets', {info: 'Перевiрте код! Планета з таким name уже існує',planets: planets})
    }
});

app.post('/editPlanets', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    planets[index] = new Planets(info.namep, info.capacity, planets[index].mass);
    res.render('planets', {planets: planets})
});

app.post('/deletePlanets', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    planets.splice(index, 1);

    res.render('planets', {planets: planets, info: 'Планету видалено!'})
});

app.post('/findPlanets', (req, res) => {
    let info = req.body;

    let meet = planets.filter(value => {
        return value.namep === info.namep
    });

    if (meet.length === 0) {
        res.render('planets', {planets: planets, find: 'Планету не знайдено!'})
    } else {
        res.render('planets', {planets: planets, find: `Планету ${JSON.stringify(meet[0])} знайдено!`})
    }
});
app.get('/space_stations', (req, res) => {
    res.render('space_stations', {space_stations: space_stations})
});

app.post('/addStation', (req, res) => {
    let info = req.body;

    let check = space_stations.filter(value => {
        return value.number === +info.number
    });

    if (check.length === 0) {
        space_stations.push(new Space_stations(info.number, info.capacity, info.need))
        res.render('space_stations', {info: 'Станцію успішно додано',space_stations:space_stations})
    } else {
        res.render('space_stations', {info: 'Перевiрте код! Станція з таким номером уже існує',space_stations:space_stations})
    }
});

app.post('/editStation', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    space_stations[index] = new Space_stations(info.number, space_stations[index] .capacity, space_stations[index] .need);
    res.render('space_stations', {space_stations: space_stations})
});

app.post('/deleteStation', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    space_stations.splice(index, 1);

    res.render('space_stations', {space_stations: space_stations, info: 'Станцію видалено!'})
});
app.post('/persentStation', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    space_stations.FindPersent(need, capacity);

    res.render('space_stations', {space_stations: space_stations, info: 'станція'+space_stations.name})
});

app.post('/findStation', (req, res) => {
    let info = req.body;

    let meet = space_stations.filter(value => {
        return value.number === +info.number
    });

    if (meet.length === 0) {
        res.render('space_stations', {space_stations: space_stations, find: 'Станцію не знайдено!'})
    } else {
        res.render('space_stations', {space_stations: space_stations, find: `Станцію ${JSON.stringify(meet[0])} знайдено!`})
    }
});


app.get('/goods', (req, res) => {
    res.render('goods', {goods: goods})
});

app.post('/addGoods', (req, res) => {
    let info = req.body;

    let check = goods.filter(value => {
        return value.code === +info.code
    });

    if (check.length === 0) {
        goods.push(new Goods(info.code, info.name, info.weight))
        res.render('goods', {info: 'Товар успішно додано',goods: goods})
    } else {
        res.render('goods', {info: 'Перевiрте код! Товар з таким кодом уже існує',goods: goods})
    }
});

app.post('/editGoods', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    goods[index] = new Goods(goods[index].code, info.name, info.weight);
    res.render('goods', {goods: goods})
});

app.post('/deleteGoods', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    goods.splice(index, 1);

    res.render('goods', {goods: goods, info: 'Товар видалено!'})
});

app.post('/findGoods', (req, res) => {
    let info = req.body;

    let meet = goods.filter(value => {
        return value.code === +info.code
    });

    if (meet.length === 0) {
        res.render('goods', {goods: goods, find: 'Товар не знайдено!'})
    } else {
        res.render('goods', {goods: goods, find: `Товар ${JSON.stringify(meet[0])} знайдено!`})
    }
});

//app.get('/goodsToPlanet', (req, res) => {
   // res.render('goodsToPlanet', {planets: planets})
//});
app.get('/delivered_goods', (req, res) => {
    res.render('delivered_goods', {delivered_goods:delivered_goods})
});

app.post('/addDelivered_goods', (req, res) => {
    let info = req.body;
    let check = goods.filter(value => {
        return value.code === +info.code
    });

    if (check.length !== 0) {
        delivered_goods.push(new Delivered_Goods(info.code, info.name, info.weight, info.planets_name,info.station_code))

        goods.forEach((item, i) => {
          if(item.code===+info.code){
            goods.splice(i,1);
          }
        });
        res.render('delivered_goods', {info: 'Товар успішно доставлено',delivered_goods: delivered_goods})
    } else {
        res.render('delivered_goods', {info: 'Перевiрте код! Товару з такий кодом немає на складі!',delivered_goods: delivered_goods})
    }
});

app.post('/editDelivered_goods', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    delivered_goods[index] = new Delivered_Goods(delivered_goods[index].code,delivered_goods[index].name,delivered_goods[index].weight,
       info.planets_name, info.station_code);
    res.render('delivered_goods', {delivered_goods: delivered_goods})
});

// app.post('/deleteDelivered_goods', (req, res) => {
//     let info = req.body;
//     let index = info.index[0];
//
//     delivered_goods.splice(index, 1);
//
//     res.render('delivered_goods', {delivered_goods: delivered_goods, info: 'Товар видалено!'})
// });
//
// app.post('/findDelivered_goods', (req, res) => {
//     let info = req.body;
//
//     let meet = delivered_goods.filter(value => {
//         return value.name === info.name
//     });
//
//     if (meet.length === 0) {
//         res.render('delivered_goods', {delivered_goods: delivered_goods, find: 'Товар не знайдено!'})
//     } else {
//         res.render('delivered_goods', {delivered_goods: delivered_goods, find: `Товар ${JSON.stringify(meet[0])} знайдено!`})
//     }
// });
//
//


app.get('/allPlanets', (req, res)=>{
    res.render('collection/allPlanets', {data: planets})
});

app.get('/allGoods', (req, res)=>{
    res.render('collection/allGoods', {data: goods})
});

app.get('/allSpace_stations', (req, res)=>{
    res.render('collection/allSpace_stations', {data:space_stations})
});

app.get('/allDelivered_goods', (req, res)=>{
    res.render('collection/allDelivered_goods', {data:delivered_goods})
});

app.listen(3000, () => {//function of server
    console.log(3000)
});
