(function () {

    function createTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerText = title
        return appTitle
    };

    function createForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let btnWrapper = document.createElement('div');
        let btn = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        btnWrapper.classList.add('input-group-append');
        btn.classList.add('btn', 'btn-primary', 'disabled');
        btn.innerText = 'Добавить дело';

        btnWrapper.append(btn);
        form.append(input, btnWrapper)

        return {
            form,
            input,
            btn
        };
    };

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list
    };

    function createItem(name, done) {
        let item = document.createElement('li');

        let btnGroup = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.innerText = name;
        if (done) {
            item.classList.add('list-group-item-success')
        }

        btnGroup.classList.add('btn-group', 'btn-group-sm');
        doneBtn.classList.add('btn', 'btn-success');
        doneBtn.innerText = 'Готово';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.innerText = 'Удалить'

        btnGroup.append(doneBtn, deleteBtn)
        item.append(btnGroup)

        return {
            item,
            doneBtn,
            deleteBtn,
            name
        }
    }

    function createTodo(container, title = 'Список дел', businessMassive, key) {
        let todoTitle = createTitle(title);
        let form = createForm();
        let list = createTodoList()

        container.append(todoTitle, form.form, list)

        if (businessMassive) {

            businessMassive.map((el) => {
                let item = createItem(el.name, el.done)

                item.doneBtn.addEventListener('click', () => {
                    item.item.classList.toggle('list-group-item-success')
                    index = businessMassive.findIndex(el => {
                        return el.name === item.name
                    })

                    if (businessMassive[index].done) {
                        businessMassive[index].done = false;
                    } else {
                        businessMassive[index].done = true
                    }

                    setStorage(key, businessMassive)
                })

                item.deleteBtn.addEventListener('click', () => {
                    if (confirm('Вы уверены?')) {
                        index = businessMassive.findIndex(el => {
                            return el.name === item.name
                        })
                        businessMassive.splice(index, 1)
                        setStorage(key, businessMassive)
                        item.item.remove()
                    }
                })

                list.append(item.item)
            })
        }

        let setStorage = (key, data) => {
            localStorage.setItem(key, JSON.stringify(data))
        }

        form.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.input.value) {
                return
            }

            let item = createItem(form.input.value)

            item.deleteBtn.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    index = businessMassive.findIndex(el => {
                        return el.name === item.name
                    })
                    businessMassive.splice(index, 1)
                    setStorage(key, businessMassive)
                    item.item.remove()
                }

            })

            item.doneBtn.addEventListener('click', function () {
                item.item.classList.toggle('list-group-item-success')
                index = businessMassive.findIndex(el => {
                    return el.name === item.name
                })

                if (businessMassive[index].done) {
                    businessMassive[index].done = false;
                } else {
                    businessMassive[index].done = true
                }

                setStorage(key, businessMassive)
            })

            businessMassive.push({ name: form.input.value, done: false })
            setStorage(key, businessMassive)

            list.append(item.item)
            form.input.value = ''
            form.btn.classList.add('disabled')
        });

        form.input.addEventListener('input', () => {
            form.btn.classList.add('disabled')
            if (form.input.value) {
                form.btn.classList.remove('disabled')
            }

        })


    }

    window.createTodo = createTodo
})()