



// Template para a página  ------------------
function geraPag(todo, done, d) {
    let pagHTML = `
    <html>
        <head>
            <title>Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        `
    pagHTML += geraForm(d);
    pagHTML += geraPorFazer(todo);
    pagHTML += geraFeito(done);


    pagHTML += `
        <div class="w3-container w3-teal">
            <address>Gerado por taskServer::DAW2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
    return pagHTML
}
exports.geraPag = geraPag


// Template para o formulário de aluno ------------------
function geraForm(d) {
    var data_hoje=d.split("T")[0]

    return `

            <div class="w3-container w3-teal">
                <h2>Registo de tarefa</h2>
            </div>

            <form class="w3-container" action="/form" method="POST">

                <label class="w3-text-teal"><b>Begindate</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="begindate_hour" value="`+data_hoje+`" >

                <label class="w3-text-teal"><b>Begindate</b></label>
                <input class="w3-input w3-border w3-light-grey" type="time" name="begindate_time"  value="00:00" >

                <label class="w3-text-teal"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="deadline_hour" value="`+data_hoje+`" >

                <label class="w3-text-teal"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="time" name="deadline_time"  value="23:59">



                <label class="w3-text-teal"><b>Quem</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who">

                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descrip">

                <label for="tipol" class="w3-text-teal"><b>Tipo</b></label>

                <select name="type" id="tipol">
                  <option value="compras">Compras</option>
                  <option value="tpc">TPC</option>
                  <option value="viagem">Viagem</option>
                  <option value="outro">Outro</option>
                </select> <br>

          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
`
}

function geraPorFazer(todo) {
    let pagHTML = `
        <div class="w3-container w3-teal">
            <h2>Tarefas por fazer</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Tarefa adicionada </th>
                <th>Data inicio</th>
                <th>Deadline</th>
                <th>Quem</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Opção</th>
            </tr>
            `

    todo.forEach(task => {
        pagHTML += `
             <tr>
                <td>${task.donein}</td>
                <td>${task.begindate_hour}T${task.begindate_time}</td>
                <td>${task.deadline_hour}T${task.deadline_time}</td>
                <td>${task.who}</td>
                <td>${task.descrip}</td>
                <td>${task.type}</td>
                <td> <a href="/${task.id}/do"> Feito</a></td>
               
             </tr>
             `
    });

    pagHTML += `

        </table>
`
    return pagHTML
}

function geraFeito(done) {
    let pagHTML = `
        <div class="w3-container w3-teal">
            <h2>Tarefas feitas</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Tarefa feita em</th>
                <th>Data inicio</th>
                <th>Deadline</th>
                <th>Quem</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Opção</th>
            </tr>
            `

    done.forEach(task => {
        pagHTML += `
             <tr>
                <td>${task.donein}</td>
                <td>${task.begindate_hour}T${task.begindate_time}</td>
                <td>${task.deadline_hour}T${task.deadline_time}</td>
                <td>${task.who}</td>
                <td>${task.descrip}</td>
                <td>${task.type}</td>
                <td> <a href="/${task.id}/delete"> Eliminar</a></td>
               
             </tr>
             `
    });

    pagHTML += `

        </table>
`
    return pagHTML
}
