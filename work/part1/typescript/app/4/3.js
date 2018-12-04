if (true) {
    var obj_1 = {
        name: 'Tom',
        address: 'Seoul'
    };
    var keys = Object.keys(obj_1); // 프로퍼티 키들에 대한 배열 획득
    console.log(keys); // [ 'name', 'address' ]
    for (var i = 0; i < keys.length; i++) {
        console.log(obj_1[keys[i]]);
    }
}
if (true) {
    var obj_2 = {
        name: 'Tom',
        address: 'Seoul'
    };
    var keys = Object.keys(obj_2);
    for (var i = 0; i < keys.length; i++) {
        // Index로 객체의 프로퍼티에 접근
        console.log(obj_2[keys[i]]);
    }
}
