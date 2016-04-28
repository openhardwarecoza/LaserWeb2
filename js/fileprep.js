var Xtofix;
var Ytofix;
var oldxscale = 0;
var oldyscale = 0;

function filePrepInit() {

  $('#stepinfup').on('click', function() {
    var oldValue = parseFloat($('#inflateVal').val());
    var newVal = oldValue + 0.1;
    var newVal = newVal.toFixed(1)
    $("#inflateVal").val(newVal);
    onInflateChange();
  });

  $('#stepinfdn').on('click', function() {
    var oldValue = parseFloat($('#inflateVal').val());
    var newVal = oldValue - 0.1;
    var newVal = newVal.toFixed(1)
    $("#inflateVal").val(newVal);
    onInflateChange();
  });

  $('#stepscaleup').on('click', function() {
    var oldValue = $("#scaleFactor").val();
    var newVal = parseFloat(oldValue) + 1;
    var newVal = newVal.toFixed(0)
    $("#scaleFactor").val(newVal);
    scaleChange();
  });

  $('#stepscaledn').on('click', function() {
    var oldValue = $("#scaleFactor").val();
    var newVal = parseFloat(oldValue) - 1;
    var newVal = newVal.toFixed(0)
    $("#scaleFactor").val(newVal);
    scaleChange();
  });

  $('#panleft').on('click', function() {
    var oldValue = controls.target.x
    var newVal = oldValue + 10;
    controls.target.x = newVal
    controls.update();
  });

  $('#panright').on('click', function() {
    var oldValue = controls.target.x
    var newVal = oldValue - 10;
    controls.target.x = newVal
    controls.update();
  });

  $('#panup').on('click', function() {
    var oldValue = controls.target.y
    var newVal = oldValue - 10;
    controls.target.y = newVal
    controls.update();
  });

  $('#pandown').on('click', function() {
    var oldValue = controls.target.y
    var newVal = oldValue + 10;
    controls.target.y = newVal
    controls.update();
  });


    useOffset = $('#useOffset').val()
    if (useOffset.indexOf('Disable') == 0) {
        $('#inflateFeature').hide();
    }

function scaleChange() {
  if (typeof(object) != 'undefined') {
      scene.remove(object);
  }
  var hScale = ($("#scaleFactor").val() / 100);
  console.log('Scaling to ', hScale);
  fileParentGroup.scale.x = hScale;
  fileParentGroup.scale.y = hScale;
  fileParentGroup.updateMatrix();
  fileParentGroup.updateMatrixWorld();
  putFileObjectAtZero();
  currentWorld();
}


    $("#scaleFactor").change(function() {
      scaleChange();
    });

    $("#xpos").change(function() {
        if (typeof(object) != 'undefined') {
            scene.remove(object);
        }
        var hPosX = $(this).val();
        console.log('Moving X from ', fileObject.position.x, ' to ', (hPosX - (laserxmax / 2)));
        fileParentGroup.position.x = (hPosX - (laserxmax / 2));
        currentWorld();
    });

    $("#ypos").change(function() {
        if (typeof(object) != 'undefined') {
            scene.remove(object);
        }
        var hPosY = $(this).val();
        console.log('Moving X from ', fileObject.position.y, ' to ', (hPosY - (laserymax / 2)));
        fileParentGroup.position.y = (hPosY - (laserymax / 2));
        currentWorld();
    });

    $('#removeInflateGrp').on('click', function() {
        scene.remove(inflateGrp);
        inflateGrp = null;
    });

}

function resetView() {
    if (typeof(object) != 'undefined') {
        viewExtents(object);
    } else if (typeof(rastermesh) != 'undefined') {
        viewExtents(rastermesh);
    } else if (typeof(inflateGrp) != 'undefined') {
        viewExtents(inflateGrp);
    } else if (typeof(fileParentGroup) != 'undefined') {
        viewExtents(fileParentGroup);
    } else {
        viewExtents(helper);
    };
}


//' Sets the input boxes to the current real-world sizes.  But why, well maybe we arent only going to scale/position via the input boxes?
// in which case we want to update the textboxes to match what we did from some other function'
function currentWorld() {
    if (fileParentGroup) {
        if ($("#linkAspect").hasClass("fa-link")) {
            if (oldyscale != fileParentGroup.scale.y) {
                fileParentGroup.scale.x = fileParentGroup.scale.y;
            };
            if (oldxscale != fileParentGroup.scale.x) {
                fileParentGroup.scale.y = fileParentGroup.scale.x;
            };
        }

        $('#xpos').val(parseInt(fileParentGroup.position.x) + (laserxmax / 2));
        $('#ypos').val(parseInt(fileParentGroup.position.y) + (laserymax / 2));
        $('#scaleFactor').val((fileParentGroup.scale.x) * 100);
        fileParentGroup.position.z = 0.001;

        oldscalex = fileParentGroup.scale.x;
        oldyscale = fileParentGroup.scale.y;
    }

}

function putFileObjectAtZero() {
    // var hex  = 0xff0000;
    // var bbox = new THREE.BoundingBoxHelper( fileParentGroup, hex );
    // bbox.update();
    // scene.add( bbox );
    if (fileParentGroup) {
        imagePosition = $('#imagePosition').val()
        var bbox2 = new THREE.Box3().setFromObject(fileParentGroup);
        console.log('bbox for putFileObjectAtZero: Min X: ', (bbox2.min.x + (laserxmax / 2)), '  Max X:', (bbox2.max.x + (laserxmax / 2)), 'Min Y: ', (bbox2.min.y + (laserymax / 2)), '  Max Y:', (bbox2.max.y + (laserymax / 2)));
        Xtofix = -(bbox2.min.x + (laserxmax / 2));
        console.log('ImagePosition', imagePosition)
        if (imagePosition == "TopLeft") {
            Ytofix = (laserymax / 2) - bbox2.max.y;
        } else {
            Ytofix = -(bbox2.min.y + (laserymax / 2));
        }
        console.log('X Offset', Xtofix)
        console.log('Y Offset', Ytofix)
        fileParentGroup.translateX(Xtofix);
        fileParentGroup.translateY(Ytofix);
        currentWorld();
    }

}

function putInflateGrpAtZero() {
    if (yflip == true) {
        inflateGrp.position.x = fileParentGroup.position.x
        inflateGrp.position.y = fileParentGroup.position.y
    } else {
        inflateGrp.position.x = fileParentGroup.position.x
        inflateGrp.position.y = fileParentGroup.position.y
    };
    currentWorld();

}
