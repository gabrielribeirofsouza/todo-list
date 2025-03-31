//SELEÇÃO DE ELEMENTOS e VARIAVEIS

let inputTask = document.getElementById('inputTask');
let btnAdd = document.getElementById('addtask');
let btnDarkMode = document.getElementById('dark-mode')
let btnLigthMode = document.getElementById('ligth-mode')

let containerBottom = document.getElementById('bottom-content')
let containerTask = document.getElementById('tasks');
let btnAllTasks = document.getElementById('allTasks')
let btnTasksLoading = document.getElementById('tasksLoading')
let btnTasksOk = document.getElementById('tasksOk')

let size = document.getElementById('list-size');
size.innerText = 0
let trash = document.getElementById('clear-list')

let footer = document.getElementById('footer')


let list = [];

//EVENTOS
btnLigthMode.classList.add('hide')

btnDarkMode.addEventListener('click', ()=>{
    btnLigthMode.classList.remove('hide')
    btnDarkMode.classList.add('hide')
    
    document.body.style.backgroundColor = '#D3D3D3'
    containerBottom.style.backgroundColor = 'white'
    size.style.color = 'black'
    btnAllTasks.style.color = 'black'
    btnTasksLoading.style.color = 'black'
    btnTasksOk.style.color = 'black'
    footer.style.color = 'black'

    const filhos = document.querySelectorAll("#tasks *");
  
    filhos.forEach(filho => {
        filho.style.color = "black"; 
    })
    
})

btnLigthMode.addEventListener('click', ()=> {
    btnDarkMode.classList.remove('hide')
    btnLigthMode.classList.add('hide')
    
    document.body.style.backgroundColor = '#121826c9'
    containerBottom.style.backgroundColor = '#23253D'
    size.style.color = 'white'
    btnAllTasks.style.color = 'white'
    btnTasksLoading.style.color = 'white'
    btnTasksOk.style.color = 'white'
    footer.style.color = 'white'
    const filhos = document.querySelectorAll("#tasks *");
    
    filhos.forEach(filho => {
        filho.style.color = "white"; 
    })
    
})

btnAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    if(inputTask.value === null || inputTask.value === ''){
        return
    }
    let task = {id: valida(list.length), texto: inputTask.value, state: false, element : null}
    list.push(task)
    addTask(containerTask, task)
    size.innerText = list.length
    inputTask.value = ''
})

trash.addEventListener('click', ()=> clearList())

//FUNÇOES
function addTask(containerTask, task){
    let elLista = document.createElement('li')
    let contentTask = document.createElement('p')
    let divIconList = document.createElement('div')
    let elIconCircle = document.createElement('i')
    let elIconEdit = document.createElement('i')
    let iconEditConfirm = document.createElement('i')
    let elSpan = document.createElement('span')
    contentTask.innerText = task.texto
    task.element = elLista

    if (btnDarkMode.classList.contains('hide')) {
        contentTask.style.color = "black"; 
        divIconList.style.color = "black"
    } else {
        divIconList.style.color = "white"
        contentTask.style.color = "white"; // Dark mode
    }

    containerTask.appendChild(elLista)

    elLista.appendChild(contentTask)
    elLista.appendChild(divIconList)
    elLista.appendChild(iconEditConfirm)
    elSpan.innerText = 'X'
    divIconList.classList.add('icons-task')

    divIconList.appendChild(elIconCircle)
    divIconList.appendChild(elIconEdit)
    divIconList.appendChild(elSpan)

    elIconCircle.classList.add('fa-regular')
    elIconCircle.classList.add('fa-circle')
    elIconCircle.addEventListener('click', ()=>{
        elIconCircle.style.display = 'none'
        elIconEdit.style.display = 'none'
        contentTask.classList.add('finish')
        task.state = true
    })


    elIconEdit.classList.add('fa-solid')
    elIconEdit.classList.add('fa-pencil')
    elIconEdit.addEventListener('click', ()=> editList( elLista, contentTask, iconEditConfirm, divIconList))


    iconEditConfirm.classList.add('fa-solid')
    iconEditConfirm.classList.add('fa-check')
    iconEditConfirm.style.display = 'none'

    

    btnTasksOk.addEventListener('click', ()=>{
        
        let concluidas = []
        for(let c = 0; c < list.length; c++){
            if(list[c].state === true){
                concluidas.push(list[c])
            }
        }
           for (let c = 0; c < list.length; c++) {
        let task = list[c];
        let elLista = task.element;

        if (task.state === false) {
            elLista.style.display = 'none'; 
        } else {
            elLista.style.display = 'flex';  
        }
    }
    size.innerText = concluidas.length
    })


    btnTasksLoading.addEventListener('click', ()=> {
        let naoConcluidas = []
      
        for(let c = 0; c < list.length; c++){
            let task = list[c]
            let li = task.element
            if(task.state === true){
                li.style.display = 'none'
            }else{
                li.style.display = 'flex'
                naoConcluidas.push(task)
            }
        }
        size.innerText = naoConcluidas.length
    })


    btnAllTasks.addEventListener('click', ()=>{
        size.innerText = list.length
        elLista.style.display = 'flex'

    })

    elSpan.addEventListener('click', () => removeTask(task.id, elLista))
}

function removeTask(id, elemento){
list = list.filter(task => task.id !== id)
containerTask.removeChild(elemento)

size.innerText = list.length
}

function editList(li, p, confirmEdit, divIconList){
    if(p.style.display === 'none'){
        return
    }
    p.style.display = 'none'
    let input = document.createElement('input')
    input.placeholder = p.textContent
    input.classList.add('inputEdit')
    li.prepend(input)
    
    divIconList.style.display = 'none'
    confirmEdit.style.display = 'flex'
    confirmEdit.style.cursor = 'pointer'
    
    confirmEdit.addEventListener('click', ()=> {
        if(input.value === '' || input.value === null || input.value === p.innerText || input.value.trim() === ''){
            return
        }
        p.innerText = input.value
        p.style.display = 'flex'
        input.remove()

        divIconList.style.display = 'flex'
        confirmEdit.style.display = 'none'
    })
}



function clearList (){
    containerTask.replaceChildren()
    list = []
    size.innerText = 0
}

function valida(tam){
    return tam + 1
}