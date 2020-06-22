function ElementBuilder(name) {
    this.element = document.createElement(name);

    this.text = function(text) {
        this.element.textContent = text;
        return this;
    };
    this.type = function(type) {
        this.element.type = type;
        return this;
    };
    this.placeholder = function(text) {
        this.element.placeholder = text;
        return this;
    };
    this.innerHTML = function(htmlval) {
        this.element.innerHTML = htmlval
        return this;
    }
    this.className = function(name) {
        this.element.className = name;
        return this;
    }

    this.value = function(value) {
        this.element.value = value;
        return this;
    }
    this.appendTo = function(parent) {
        if (parent instanceof ElementBuilder) {
            parent.build().appendChild(this.element);
            return this;
        } else {
            parent.appendChild(this.element);
            return this;
        }
    };

    this.onEvent = function(event, fn) {
        this.element.addEventListener(event, fn)
        return this;
    }
    this.build = function() {
        return this.element;
    };
}
const builder = {
    create: function(name) {
        return new ElementBuilder(name);
    },
};
fetch('https://my-json-server.typicode.com/bemaxima/fake-api/movies')
    .then(response => response.json())
    .then(film => {


        //search
        let search = document.getElementById('search');

        search.addEventListener('input', () => {
            let filteredFilm = film.filter((item) => {
                return item.name.toLowerCase().includes(search.value.toLowerCase());
            });
            paint(filteredFilm);
        })

        //sort up
        let sortUp = document.getElementById('sortUp');
        sortUp.addEventListener('click', () => {
            film = film.sort((a, b) => {

                return a.rate - b.rate;
            });
            paint(film);
        })

        //sort down
        let sortDown = document.getElementById('sortDown')
        sortDown.addEventListener('click', () => {
            film = film.sort((a, b) => {

                return b.rate - a.rate;
            });
            paint(film);
        })
        paint(film);
    })



function paint(film) {
    let list = document.getElementById('list');
    list.innerHTML = "";
    film.forEach((item) => {
        let li = builder
            .create("li")
            .className('col-md-4')
            .appendTo(list)
            .build();

        // title film
        const header = builder.create('h4')
            .text(item.name)
            .className('header')
            .appendTo(li)
            .build();

        // rate
        const rate = builder.create('div')
            .text(`RATE : ${item.rate}`)
            .className('rate')
            .appendTo(li)
            .build()

        // abstract
        const desc = builder.create('div')
            .text(`${item.description.substr(0, 50)} ...`)
            .appendTo(li)
            .build()

        // button show details
        const more = builder.create('div')
            .text('show details')
            .className('details')
            .appendTo(li)
            .onEvent('click', () => {


                // box details
                const box = builder.create('div')
                    .className('box')
                    .appendTo(li)
                    .text(item.description)
                    .build()


                // close span
                const closebtn = builder.create('span')
                    .text('X')
                    .className('close')
                    .appendTo(box)
                    .onEvent('click', () => {
                        box.style.display = 'none'
                        more.style.display = 'block'
                        desc.style.display = 'block'
                    })
                    .build()

                more.style.display = 'none';
                desc.style.display = 'none'
            })
            .build();
    });
}