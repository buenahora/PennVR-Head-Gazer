var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var controls;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(10, 10, 10);

var light2 = new THREE.DirectionalLight(0xffffff, 0.2);
light2.position.set(-10, 5, -10);

var light3 = new THREE.AmbientLight( 0x404040 );

scene.add(light1);
scene.add(light2);
scene.add(light3);

var light3 = new THREE.AmbientLight( 0x404040 );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial({ color: 0x55ff55 });
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

controls = new THREE.OrbitControls( camera, renderer.domElement );


var render = function () {
	requestAnimationFrame( render );


	renderer.render(scene, camera);
};

render();

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
});				