
Vue.component("tile-slide", {
    data : ()=> {
        return {
            count : 0,
            slides : [],
        }
    },

    methods: {
        getSlideCount : function () {
            let vm = this;
            $.ajax({
                method: "GET",
                url: "/api/slideCount"
              })
            .done(function(data) {
                  vm.count = data.count
                  vm.genSlides()
            });
        },

        genSlides : function () {
            let vm = this;
            for (let i=1; i<=vm.count; i++) {
                vm.slides.push("/slides/" + i + ".jpg");
            };
        }

    },

    mounted : function() {
        let vm = this;
        vm.getSlideCount();
    },

    template : 
    `
    <div class="container-main-list">
        <li class="list-group-item" v-for="item in slides">
            <img :src="item" width="100" height="100">
        </li>
    </div>
    `
})

/*
<li class="list-group-item">{{count}}</li>
<li class="list-group-item">Dapibus ac facilisis in</li>
<li class="list-group-item">Morbi leo risus</li>
<li class="list-group-item">Porta ac consectetur ac</li>
*/