<template>
    <div>
        <div id="app">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="#">تعاریف پایه</a>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/flow" class="nav-link">تولید فرایند</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/entity" class="nav-link">ساختار منوها</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/algorithm" class="nav-link">تولید الگوریتم</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">ترمینولوژی</a>
                            <div class="dropdown-menu">
                                <router-link to="/term/term" class="dropdown-item">ترم ها</router-link>
                                <router-link to="/term/class" class="dropdown-item">تعاریف کلاس</router-link>
                                <router-link to="/entity" class="dropdown-item">تعاریف entity</router-link>
                            </div>
                        </li>
                        <li class="nav-item">

                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="تایپ کنید ..." aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">جستجو</button>
                    </form>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    * {
        font-family: "B Koodak",serif;
    }
    *:lang(en) 	{
        font-family: arial,serif;
    }
    .btn-add {
        margin: 15px;
        display: block;
        border: 1px solid #8691ff;
        text-align: center;
        color: #8691ff;
        opacity: .5;
        cursor: pointer;
        font-size: 25px;
        background-color: rgba(134, 145, 255, 0.21);
    }

    .btn-add:hover {
        opacity: 1;
    }
    .vue-popover{
        position: static!important;
    }
</style>
