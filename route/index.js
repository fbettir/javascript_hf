var stepRoundMW = require('./middleware/stepRoundMW');
var renderMW = require('./middleware/renderMW');

var delTurtleMW = require('../middleware/Turtle/delTurtleMW');
var getTurtlesMW = require('../middleware/Turtle/getTurtlesMW');
var getTurtleMW = require('../middleware/Turtle/getTurtleMW');
var saveTurtleMW = require('../middleware/Turtle/saveTurtleMW');
var takecareofturtleMW = require('../middleware/Turtle/takeCareOfTurtleMW');

var delIslandMW = require('../middleware/Island/delIslandMW');
var getIslandsMW = require('../middleware/Island/getMapMW');
var getIslandMW = require('../middleware/Island/getIslandMW');
var saveIslandMW = require('../middleware/Island/saveIslandMW');

var TurtleModel = require('./model/turtle');
var IslandModel = require('./model/island');


module.exports = function (app){
    var objectRepository = {
        IslandModel: IslandModel,
        TurtleModel: TurtleModel
    };



    app.get(
        '/island',
        getMapMW(objectRepository),
        renderMW(objRepo, 'index')
    );


    app.get(
        '/island/del/:islandid',
        saveIslandMW(objectRepository),
        renderMW(objectRepository)
    );

    app.use(
        '/island/new',
        getIslandMW(objectRepository),
        delIslandMW(objectRepository, 'new_island.html')
    );


    app.get(
        '/island/edit/:islandid',
        getIslandMW(objectRepository),
        saveIslandMW(objectRepository),
        renderMW(objectRepository,'island_modify.htm')
    );


    app.get(
        '/turtle/:islandid',
        getIslandMW(objectRepository),
        getTurtlesMW(objectRepository),
        renderMW(objectRepositorym, 'island.html')
    );

    app.get(
        '/turtle/:islandid/:turtleid/del',
        getTurtleMW(objectRepository),
        delTurtleMW(objectRepository)
    );

    app.use(
        '/turtle/take_care/:islandid/:turtleid',
        getIslandMW(objectRepository),
        getTurtleMW(objectRepository),
        takecareofturtleMW(objectRepository),
        renderMW(objectRepository, 'take_care_of_turtle.html')
    );

    app.use(
        '/turtle/modify/:islandid/:turtleid',
        getIslandMW(objectRepository),
        getTurtleMW(objectRepository),
        saveTurtleMW(objectRepository),
        renderMW(objectRepository, 'turtle_modify.html')
    );

    app.use(
        '/turtle/new/:islandid ',
        saveTurtleMW(objectRepository),
        renderMW(objectRepository, 'index.html')
    );


    app.use(
        '/',
        getIslandsMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

}