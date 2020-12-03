function showImage(name,type){





    if (type == 'image/png' || type == 'image/jpeg')
        var ficheiro= '<img src="/fileStore/'+ name + '" width="80%" />'

    else 
        var ficheiro = '<p>' + name + ', ' + type + '</p>'


    var fileObject = $(`
    <div class="w3-row w3-margin-bottom">
            <div class="w3-col s6">
                ${ficheiro}
            </div>   


            <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Mimetype: ${type}</p>
            </div>
    </div>

    `)



    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>')
    $("#display").empty()
    $("#display").append(fileObject,download)
    $("#display").modal()   
}





function addUpload(){


    var up = $( '<input class="w3-input w3-border w3-light-grey" type="file" name="myFile">    ')
    $("#filediv").append(up)
}

