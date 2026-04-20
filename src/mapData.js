const map = [
    // ROW 1
    [
        { id: "1-1", x: 1, y: 1, locationHeader: "You are inside a brimstone mine",    image: "./assets/img/11.gif", color: "rgb(235,211,64)", ableMoves: [0,1,0,0], condition: 0 },
        { id: "2-1", x: 2, y: 1, locationHeader: "You are at the entrance to the mine", image: "./assets/img/12.gif", color: "rgb(89,93,87)", ableMoves: [0,1,0,1], condition: 0 },
        { id: "3-1", x: 3, y: 1, locationHeader: "A hill", image: "./assets/img/13.gif", color: "rgb(117,237,243)", ableMoves: [0,1,1,1], condition: 0 },
        { id: "4-1", x: 4, y: 1, locationHeader: "Some bushes", image: "./assets/img/14.gif", color: "rgb(202,230,51)",  ableMoves: [0,1,0,1], condition: 0 },
        { id: "5-1", x: 5, y: 1, locationHeader: "An old deserted hut", image: "./assets/img/15.gif", color: "rgb(220,204,61)",  ableMoves: [0,1,0,1], condition: 0 },
        { id: "6-1", x: 6, y: 1, locationHeader: "The edge of a forest", image: "./assets/img/16.gif", color: "rgb(167,245,63)",  ableMoves: [0,1,0,1], condition: 0 },
        { id: "7-1", x: 7, y: 1, locationHeader: "A dark forest", image: "./assets/img/17.gif", color: "rgb(140,253,99)", ableMoves: [0,0,1,1], condition: 0 },
    ],
    // ROW 2
    [
        { id: "1-2", x: 1, y: 2, locationHeader: "A man nearby making tar", image: "./assets/img/21.gif", color: "rgb(255,190,99)",  ableMoves: [0,1,1,0], condition: 0 },
        { id: "2-2", x: 2, y: 2, locationHeader: "A timber yard", image: "./assets/img/22.gif", color: "rgb(255,190,99)",  ableMoves: [0,1,1,1], condition: 0 },
        { id: "3-2", x: 3, y: 2, locationHeader: "You are by a roadside shrine", image: "./assets/img/23.gif", color: "rgb(167,245,63)",  ableMoves: [1,1,1,1], condition: 0 },
        { id: "4-2", x: 4, y: 2, locationHeader: "You are by a small chapel", image: "./assets/img/24.gif", color: "rgb(212,229,36)",  ableMoves: [0,1,0,1], condition: 0 },
        { id: "5-2", x: 5, y: 2, locationHeader: "You are on a road leading to a wood",  image: "./assets/img/25.gif", color: "rgb(167,245,63)",  ableMoves: [0,1,1,1], condition: 0 },
        { id: "6-2", x: 6, y: 2, locationHeader: "You are in a forest", image: "./assets/img/26.gif", color: "rgb(167,245,63)",  ableMoves: [0,1,0,1], condition: 0 },
        { id: "7-2", x: 7, y: 2, locationHeader: "You are in a deep forest", image: "./assets/img/27.gif", color: "rgb(140,253,99)",  ableMoves: [1,0,0,1], condition: 0 },
    ],
    // ROW 3
    [
        { id: "1-3", x: 1, y: 3, locationHeader: "You are by the Vistula River", image: "./assets/img/31.gif", color: "rgb(122,232,252)", ableMoves: [1,1,0,0], condition: 0 },
        { id: "2-3", x: 2, y: 3, locationHeader: "You are by the Vistula River", image: "./assets/img/32.gif", color: "rgb(140,214,255)", ableMoves: [1,0,0,1], condition: 0 },
        { id: "3-3", x: 3, y: 3, locationHeader: "You are on a bridge over river", image: "./assets/img/33.gif", color: "rgb(108,181,242)", ableMoves: [1,0,1,0], condition: 0 },
        { id: "4-3", x: 4, y: 3, locationHeader: "You are by the old tavern", image: "./assets/img/34.gif", color: "rgb(255,189,117)", ableMoves: [0,1,0,0], condition: 0 },
        { id: "5-3", x: 5, y: 3, locationHeader: "You are at the town's end", image: "./assets/img/35.gif", color: "rgb(255,190,99)",  ableMoves: [1,0,1,1], condition: 0 },
        { id: "6-3", x: 6, y: 3, locationHeader: "You are in a butcher's shop", image: "./assets/img/36.gif", color: "rgb(255,188,102)", ableMoves: [0,0,1,0], condition: 0 },
        { id: "7-3", x: 7, y: 3, locationHeader: "You are in a cooper's house", image: "./assets/img/37.gif", color: "rgb(255,188,102)", ableMoves: [0,0,1,0], condition: 0 },
    ],
    // ROW 4
    [
        { id: "1-4", x: 1, y: 4, locationHeader: "You are in the Wawel Castle", image: "./assets/img/41.gif", color: "rgb(255,176,141)", ableMoves: [0,1,0,0], condition: 1 },
        { id: "2-4", x: 2, y: 4, locationHeader: "You are inside a dragon's cave", image: "./assets/img/42.gif", color: "rgb(198,205,193)", ableMoves: [0,1,0,1], condition: 0 },
        { id: "3-4", x: 3, y: 4, locationHeader: "A perfect place to set a trap", image: "./assets/img/43.gif", color: "rgb(255,176,141)", ableMoves: [1,0,0,1], condition: 0 },
        { id: "4-4", x: 4, y: 4, locationHeader: "You are by the water mill", image: "./assets/img/44.gif", color: "rgb(255,190,99)", ableMoves: [0,1,0,0], condition: 0 },
        { id: "5-4", x: 5, y: 4, locationHeader: "You are at a main crossroad", image: "./assets/img/45.gif", color: "rgb(255,190,99)", ableMoves: [1,1,1,1], condition: 0 },
        { id: "6-4", x: 6, y: 4, locationHeader: "You are on a town street", image: "./assets/img/46.gif", color: "rgb(255,190,99)", ableMoves: [1,1,0,1], condition: 0 },
        { id: "7-4", x: 7, y: 4, locationHeader: "You are in a frontyard of your house", image: "./assets/img/47.gif", color: "rgb(255,190,99)", ableMoves: [1,0,1,1], condition: 0 },
    ],
    // ROW 5
    [
        { id: "1-5", x: 1, y: 5, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "2-5", x: 2, y: 5, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "3-5", x: 3, y: 5, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "4-5", x: 4, y: 5, locationHeader: "You are by a swift stream", image: "./assets/img/54.gif", color: "rgb(108,181,242)", ableMoves: [0,1,0,0], condition: 0 },
        { id: "5-5", x: 5, y: 5, locationHeader: "You are on a street leading forest", image: "./assets/img/55.gif", color: "rgb(255,190,99)",  ableMoves: [1,0,1,1], condition: 0 },
        { id: "6-5", x: 6, y: 5, locationHeader: "You are in a woodcutter's backyard", image: "./assets/img/56.gif", color: "rgb(255,190,99)",  ableMoves: [0,0,1,0], condition: 0 },
        { id: "7-5", x: 7, y: 5, locationHeader: "You are in a shoemaker's house", image: "./assets/img/57.gif", color: "rgb(254,194,97)",  ableMoves: [1,0,0,0], condition: 0 },
    ],
    // ROW 6
    [
        { id: "1-6", x: 1, y: 6, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "2-6", x: 2, y: 6, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "3-6", x: 3, y: 6, locationHeader: "", image: "", color: "transparent", ableMoves: [0,0,0,0], condition: 0 },
        { id: "4-6", x: 4, y: 6, locationHeader: "You are in a bleak funeral house", image: "./assets/img/64.gif", color: "rgb(254,194,97)", ableMoves: [0,1,0,0], condition: 0 },
        { id: "5-6", x: 5, y: 6, locationHeader: "You are on a path leading to the wood", image: "./assets/img/65.gif", color: "rgb(167,245,63)", ableMoves: [1,1,0,1], condition: 0 },
        { id: "6-6", x: 6, y: 6, locationHeader: "You are at the edge of a forest", image: "./assets/img/66.gif", color: "rgb(167,245,63)", ableMoves: [1,1,0,1], condition: 0 },
        { id: "7-6", x: 7, y: 6, locationHeader: "You are in a deep forest", image: "./assets/img/67.gif", color: "rgb(140,253,99)", ableMoves: [0,0,0,1], condition: 0 },
    ],
];

export { map };